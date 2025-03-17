import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Headers,
  UploadedFile,
  UseInterceptors,
  Ip,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../util/file-upload.utils';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { UserDTO } from '../dto/user.dto';
import { AuthGuard } from '../guard/auth.guard';
import { Response } from 'express';
import { ActiveUserDTO } from '../dto/active-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profile_picture', multerOptions))
  async registerUser(
    @Body() createUserDto: CreateUserDTO,
    @UploadedFile() profile_picture?: Express.Multer.File,
  ) {
    try {
      const result = await this.authService.registerUser(
        createUserDto,
        profile_picture,
      );
      return { message: 'User registered successfully', data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async loginUser(
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
    @Body() loginUserDto: LoginUserDTO,
    @Res() response: Response,
  ) {
    try {
      const cleanedIpAddress = this.authService.formatIpAddress(ipAddress);
      const user_payload = await this.authService.loginUser(
        loginUserDto,
        cleanedIpAddress,
        userAgent,
        response,
      );
      // The response is not getting updated. The cookies are not getting stored and I cant see the cookies in the frontend network tab. Can you please confirm and print here the Response.cookies
      response
        .status(HttpStatus.OK)
        .json({ message: 'Login successful', data: user_payload });
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('send_otp')
  async sendOtp(@Body() sendOtpUserDto: UserDTO) {
    try {
      await this.authService.sendVerificationOtp(
        sendOtpUserDto.email,
        sendOtpUserDto.name,
      );
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to send OTP',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('verify_otp')
  async verifyOtp(@Body() verifyUserDto: UserDTO) {
    try {
      const result = await this.authService.verifyOtp(
        verifyUserDto.email,
        verifyUserDto.otp,
      );
      return { message: 'OTP verified successfully', data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'OTP verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get_user')
  @UseGuards(AuthGuard)
  async fetchUser(@Body() updateUserDto: UserDTO) {
    try {
      const existing_user = await this.authService.findUserByEmail(
        updateUserDto.email,
      );
      if (!existing_user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userResponse = {
        profile_picture: existing_user.s_profile_picture,
        name: existing_user.s_name,
        email: existing_user.s_email,
        gender: existing_user.s_gender,
        country: existing_user.s_country,
      };
      return { message: 'User fetched successfully', data: userResponse };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get_host')
  @UseGuards(AuthGuard)
  async getHost(@Req() req: Request, @Res() res: Response) {
    try {
      const { userPayload } = await this.authService.decryptTokens(req, res);

      const existing_user = await this.authService.findUserByEmail(
        userPayload.email,
      );
      if (!existing_user) {
        throw new HttpException('Host not found', HttpStatus.NOT_FOUND);
      }

      const userResponse = {
        user_id: `auth-user_${existing_user.n_id}`,
        user_name: existing_user.s_name,
        profile_picture: existing_user.s_profile_picture,
      };

      res.status(200).json({ success: true, data: userResponse });
    } catch (error) {
      const statusCode =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.BAD_REQUEST;
      throw new HttpException(
        error.message || 'Failed to fetch host',
        statusCode,
      );
    }
  }

  @Post('store_active_user')
  async storeActiveUser(@Body() activeUserDto: ActiveUserDTO): Promise<any> {
    try {
      await this.authService.storeActiveUser(activeUserDto);
      return {
        success: true,
        message: 'User active details stored successfully.',
      };
    } catch (error) {
      const statusCode =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.BAD_REQUEST;
      throw new HttpException(
        error.message || 'Failed to store active user details',
        statusCode,
      );
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logoutUser(@Body('email') email: string) {
    try {
      await this.authService.logoutUser(email);
      return { message: 'User successfully logged out' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Logout failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('deactivate_user')
  @UseGuards(AuthGuard)
  async deactivateUser(@Body() updateUserDto: UserDTO) {
    try {
      await this.authService.toggleUserStatus(updateUserDto.email, false);
      return { message: 'User successfully deactivated' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to deactivate user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('activate_user')
  @UseGuards(AuthGuard)
  async activateUser(@Body() updateUserDto: UserDTO) {
    try {
      await this.authService.toggleUserStatus(updateUserDto.email, true);
      return { message: 'User successfully activated' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to activate user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update_user')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profile_picture', multerOptions))
  async updateUser(
    @Body() updateUserDto: UserDTO,
    @UploadedFile() profile_picture?: Express.Multer.File,
  ) {
    try {
      const result = await this.authService.updateUser(
        updateUserDto,
        profile_picture,
      );
      return { message: 'User updated successfully', data: result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete_user')
  @UseGuards(AuthGuard)
  async deleteUser(@Body() updateUserDto: UserDTO) {
    try {
      await this.authService.deleteUser(updateUserDto.email);
      return { message: 'User successfully deleted' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
