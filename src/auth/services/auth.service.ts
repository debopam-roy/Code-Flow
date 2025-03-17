import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import * as otpGenerator from 'otp-generator';

import { JwtService } from '../../util/jwt.service';
import { RedisService } from '../../util/redis.service';
import { MailerService } from '../../util/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { compressImage } from '../../util/file-upload.utils';
import { deleteFileFromS3, uploadFileToS3 } from '../../util/s3.utils';
import { Response, Request } from 'express';

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO, Gender } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { UserDTO } from '../dto/user.dto';
import { ActiveUserDTO } from '../dto/active-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async decryptTokens(req: Request, res: Response): Promise<any> {
    const cookies = req.headers.cookie;

    if (!cookies) {
      throw new UnauthorizedException(
        'Authentication required. Missing cookies.',
      );
    }

    // Parse the cookies
    const parsedCookies = cookie.parse(cookies);

    const accessToken = parsedCookies['access_token'];
    const refreshToken = parsedCookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException(
        'Authentication required. Missing tokens.',
      );
    }

    try {
      const userPayload = await this.jwtService.verifyToken(accessToken);

      return { userPayload, accessToken };
    } catch (err) {
      if (
        err.name === 'TokenExpiredError' ||
        err.name === 'UnauthorizedException'
      ) {
        try {
          const newAccessToken =
            await this.jwtService.generateNewAccessToken(refreshToken);

          const userPayload = await this.jwtService.verifyToken(newAccessToken);

          this.setCookie(res, 'access_token', newAccessToken, 60 * 1000 * 15);
          return { userPayload, accessToken: newAccessToken };
        } catch (refreshErr) {
          throw new UnauthorizedException(
            'Refresh token is invalid or expired.',
          );
        }
      }
      throw new UnauthorizedException('Invalid access token.');
    }
  }

  setCookie(res: Response, key: string, value: string, ttl: number): void {
    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: ttl,
      path: '/',
    });
  }

  async storeActiveUser(activeUserDto: ActiveUserDTO): Promise<void> {
    try {
      const { user_name, user_id, profile_picture } = activeUserDto;

      const userData = JSON.stringify({
        user_name,
        user_id,
        profile_picture,
      });

      await this.redisService.setWithExpiry(
        `active_user:${user_id}`,
        userData,
        3600,
      );
    } catch (error) {
      console.error('Error storing active user details:', error);
      throw new Error('Failed to store active user details in Redis');
    }
  }

  async getUserById(userId: string): Promise<string | null> {
    try {
      const extractedId = parseInt(userId.replace('auth-user_', ''));
      const userDetails = await this.findUserById(extractedId);
      return userDetails.user_name;
    } catch (error) {
      console.error('Error fetching admin by ID:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Something went wrong while fetching user data from Redis.',
        );
      }
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { n_id: id },
      });

      if (!user) {
        return null;
      }
      const response = {
        user_name: user.s_name,
        user_id: `auth-user_${user.n_id}`,
        profile_picture: user.s_profile_picture,
      };
      return response;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new InternalServerErrorException(
        'Something went wrong while fetching user data.',
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { s_email: email },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new InternalServerErrorException(
        'Something went wrong while fetching user data.',
      );
    }
  }

  async deleteUserByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { s_email: email },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      await this.prismaService.user.delete({
        where: { s_email: email },
      });
    } catch (error) {
      console.error('Error deleting user by email:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Something went wrong while deleting the user.',
        );
      }
    }
  }

  async updateUserByEmail(email: string, fields: object) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { s_email: email },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const updatedUser = await this.prismaService.user.update({
        where: { s_email: email },
        data: fields,
      });

      return updatedUser;
    } catch (error) {
      console.error('Error updating user by email:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Something went wrong while updating the user.',
        );
      }
    }
  }

  private async cleanupResources(
    profilePicture: string,
    email: string,
  ): Promise<void> {
    if (profilePicture) await deleteFileFromS3(profilePicture);
    await this.redisService.delete(`*otp:${email}*`);
  }

  // Generates a unique file name for uploaded files
  private createUniqueFileName(originalName: string): string {
    const extension = path.extname(originalName.trim());
    return `profile-picture-${uuidv4()}-${Date.now()}${extension}`;
  }

  // Downloads a default avatar based on the user's name and gender
  private async downloadDefaultAvatar(
    name: string,
    gender: string,
    fileName: string,
  ): Promise<string> {
    const avatarUrl = `https://avatar.iran.liara.run/public/${gender.toLocaleLowerCase() === Gender.MALE ? 'boy' : 'girl'}?username=${name}`;
    const response = await axios.get(avatarUrl, { responseType: 'stream' });

    if (response.status !== 200) {
      throw new InternalServerErrorException(
        `Failed to download default avatar. Status: ${response.status}`,
      );
    }

    const filePath = path.join('uploads', fileName);
    const writer = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      writer.on('finish', () => resolve(filePath));
      writer.on('error', (error) => reject(error));
    });
  }

  // Sends OTP for email verification
  async sendVerificationOtp(email: string, name: string): Promise<void> {
    try {
      const otp = otpGenerator.generate(6, { specialChars: false });
      await this.redisService.setWithExpiry(`otp:${email}`, otp, 300);
      await this.mailerService.sendVerificationEmail(email, name, otp);
    } catch (error) {
      throw new InternalServerErrorException('Failed to send OTP.');
    }
  }

  // Validates and verifies the OTP provided by the user
  async verifyOtp(email: string, otp: string): Promise<string> {
    const storedOtp = await this.redisService.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp)
      throw new BadRequestException('Invalid or expired OTP.');

    const existing_user = await this.findUserByEmail(email);
    if (!existing_user) throw new NotFoundException('User not found.');

    const updated_user = await this.updateUserByEmail(email, {
      b_is_verified: true,
    });

    await this.redisService.delete(`otp:${updated_user.s_email}`);
    await this.mailerService.sendWelcomeEmail(
      updated_user.s_email,
      updated_user.s_name,
    );

    return 'Email successfully verified.';
  }

  // Cleans and formats the given IP address
  formatIpAddress(ipAddress: string): string {
    return ipAddress.includes('::ffff:')
      ? ipAddress.split('::ffff:')[1]
      : ipAddress;
  }

  //upload image to s3
  async uploadImage(
    name: string,
    gender: string,
    profilePicture?: Express.Multer.File,
  ) {
    let filePath;
    try {
      const uniqueFileName = profilePicture
        ? this.createUniqueFileName(profilePicture.originalname)
        : `profile-picture-${uuidv4()}-${Date.now()}.png`;

      if (profilePicture) {
        filePath = path.join('uploads', uniqueFileName);
        fs.writeFileSync(filePath, await compressImage(profilePicture.buffer));
      } else {
        filePath = await this.downloadDefaultAvatar(
          name,
          gender,
          uniqueFileName,
        );
      }

      const s3Url = await uploadFileToS3(
        fs.readFileSync(filePath),
        `profile-images/${uniqueFileName}`,
      );
      if (filePath && fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {});
      }
      return s3Url;
    } catch (error) {
      console.error(error);
    }
  }

  async registerUser(
    createUserDto: CreateUserDTO,
    profile_picture?: Express.Multer.File,
  ): Promise<object> {
    const { name, email, gender, password, phone, dob, country, address } =
      createUserDto;

    try {
      const existingUser = await this.findUserByEmail(email);

      if (existingUser) {
        if (existingUser.b_is_verified) {
          throw new BadRequestException('User email already exists.');
        }

        await this.cleanupResources(existingUser.s_profile_picture, email);

        await this.deleteUserByEmail(email);
      }

      const s3Url = await this.uploadImage(name, gender, profile_picture);

      const hashedPassword = await bcrypt.hash(password, 10);

      const userPayload = {
        s_name: name,
        s_email: email,
        s_gender: gender,
        s_password: hashedPassword,
        b_is_verified: false,
        b_is_active: true,
        s_phone_number: phone,
        s_date_of_birth: dob ? new Date(dob).toISOString() : undefined,
        s_country: country || undefined,
        s_profile_picture: s3Url || undefined,
        s_address: address || undefined,
      };

      const new_user = await this.prismaService.user.create({
        data: userPayload,
      });

      try {
        await this.sendVerificationOtp(new_user.s_email, new_user.s_name);
      } catch (emailError) {
        console.error('Error sending verification email:', emailError);
        throw new InternalServerErrorException(
          'Error sending verification email.',
        );
      }

      return { success: true, message: 'Verification OTP sent to your email' };
    } catch (error) {
      console.error('Error during user registration:', error);
      if (error instanceof Error) {
        throw new BadRequestException(
          error.message || 'Something went wrong during registration.',
        );
      }
      throw new InternalServerErrorException(
        'Something went wrong while registering the user.',
      );
    }
  }

  async loginUser(
    loginUserDto: LoginUserDTO,
    ipAddress: string,
    userAgent: string,
    res: Response,
  ): Promise<object> {
    const { email, password } = loginUserDto;

    if (!email) throw new BadRequestException('Email must be provided.');

    // Check if user exists
    const existing_user = await this.findUserByEmail(email);
    if (!existing_user) throw new BadRequestException('User does not exist.');

    // Check if user is active and verified
    if (!existing_user.b_is_active)
      throw new BadRequestException('User is deactivated.');

    if (!existing_user.b_is_verified)
      throw new BadRequestException('User is not verified.');

    // Check if the user is already logged in
    const isLoggedIn = await this.redisService.get(
      `session:auth-user_${existing_user.n_id}`,
    );
    if (isLoggedIn) throw new BadRequestException('User is already logged in.');

    // Validate password
    const isPasswordValid = await bcrypt.compare(
      password,
      existing_user.s_password,
    );
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials.');

    // Generate JWT tokens
    let tokens;
    try {
      tokens = await this.jwtService.generateRefreshAndAcessTokens({
        user_id: existing_user.n_id,
        name: existing_user.s_name,
        email: existing_user.s_email,
        gender: existing_user.s_gender,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error generating tokens');
    }

    // Store session in Redis
    try {
      await this.redisService.setWithExpiry(
        `session:auth-user_${existing_user.n_id}`,
        JSON.stringify({
          userId: existing_user.n_id,
          isLoggedIn: true,
          lastLogin: new Date(),
          ipAddress,
          userAgent,
          tokens,
        }),
        3600, // 1 hour session expiry
      );
    } catch (error) {
      throw new InternalServerErrorException('Error storing session in Redis');
    }

    // Send login notification email
    try {
      await this.mailerService.sendLoginNotification(
        existing_user.s_email,
        existing_user.s_name,
        ipAddress,
        userAgent,
      );
    } catch (error) {
      console.error('Error sending login notification email:', error);
      // You can either throw an error or continue based on your requirement
    }
    this.setCookie(
      res,
      'refresh_token',
      tokens.refresh_token,
      3600 * 1000 * 24 * 7,
    );
    this.setCookie(res, 'access_token', tokens.access_token, 60 * 1000 * 15);

    // Return user info and tokens
    return {
      tokens,
      user: {
        id: existing_user.n_id,
        name: existing_user.s_name,
        profile_picture: existing_user.s_profile_picture,
      },
    };
  }

  async logoutUser(email: string): Promise<void> {
    const existing_user = await this.findUserByEmail(email);
    if (!existing_user) throw new BadRequestException('User does not exist.');
    await this.redisService.delete(`session:auth-user_${existing_user.n_id}`);
  }

  // Deactivate or activate user
  async toggleUserStatus(email: string, status_req: boolean): Promise<void> {
    const existing_user = await this.findUserByEmail(email);
    if (!existing_user) throw new BadRequestException('User does not exist.');
    if (existing_user.b_is_active) return;
    await this.redisService.delete(`session:auth-user_${existing_user.n_id}`);
    const updated_user = await this.updateUserByEmail(email, {
      b_is_active: status_req,
    });
  }

  // Delete user
  async deleteUser(email: string): Promise<void> {
    const existing_user = await this.findUserByEmail(email);
    if (!existing_user) throw new BadRequestException('User does not exist.');
    await this.redisService.delete(`session:auth-user_${existing_user.n_id}`);
    await this.cleanupResources(
      existing_user.s_profile_picture,
      existing_user.s_email,
    );
    await this.deleteUserByEmail(email);
  }

  // Generic user updates
  async updateUser(
    updatePayload: UserDTO,
    profile_picture?: Express.Multer.File,
  ): Promise<object> {
    const existing_user = await this.findUserByEmail(updatePayload.email);

    // Check if the user exists
    if (!existing_user) {
      throw new BadRequestException('User not found.');
    }

    // Handle profile picture upload if provided
    if (profile_picture) {
      // Clean up old profile picture before uploading a new one
      await this.cleanupResources(
        existing_user.s_profile_picture,
        existing_user.s_email,
      );

      // Upload new profile picture and update the user's profile_picture field
      existing_user.s_profile_picture = await this.uploadImage(
        existing_user.s_name,
        existing_user.s_gender,
        profile_picture,
      );
    }

    // Update name if provided
    if (updatePayload.name) {
      existing_user.s_name = updatePayload.name;
    }

    // Update country if provided
    if (updatePayload.country) {
      existing_user.s_country = updatePayload.country;
    }

    // Update password if provided (ensure it is hashed)
    if (updatePayload.password) {
      const hashedPassword = await bcrypt.hash(updatePayload.password, 10);
      existing_user.s_password = hashedPassword;
    }

    // Update phone number if provided
    if (updatePayload.phone_number) {
      existing_user.s_phone_number = updatePayload.phone_number;
    }

    // Update address if provided
    if (updatePayload.address) {
      existing_user.s_address = updatePayload.address;
    }

    // Update date of birth if provided
    if (updatePayload.date_of_birth) {
      existing_user.s_date_of_birth = updatePayload.date_of_birth;
    }

    // Save the updated user data to the database using updateUserByEmail
    const updatedUser = await this.updateUserByEmail(existing_user.s_email, {
      s_name: existing_user.s_name,
      s_profile_picture: existing_user.s_profile_picture,
      s_country: existing_user.s_country,
      s_password: existing_user.s_password,
      s_phone_number: existing_user.s_phone_number,
      s_address: existing_user.s_address,
      s_date_of_birth: existing_user.s_date_of_birth,
    });

    // If the update fails, throw an error
    if (!updatedUser) {
      throw new BadRequestException('User update failed.');
    }

    // Return the updated user data
    return updatedUser;
  }
}
