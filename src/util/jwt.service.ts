import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  // Generate a single token with a specific expiry time
  private async signToken(
    payload: object,
    expiryTime: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: expiryTime,
    });
  }

  // Generate both access and refresh tokens
  async generateRefreshAndAcessTokens(payload: object): Promise<Tokens> {
    const access_token = await this.signToken(payload, '15m'); // Access token valid for 30 seconds
    const refresh_token = await this.signToken(payload, '7d'); // Refresh token valid for 7 days
    return { access_token, refresh_token };
  }

  // Verify a token (access or refresh)
  async verifyToken(token: string): Promise<object> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired.');
      }
      throw new UnauthorizedException('Invalid token.');
    }
  }

  // Generate a new access token using a valid refresh token
  async generateNewAccessToken(refreshToken: string): Promise<string> {
    try {
      // Verify the refresh token
      const payload: any = await this.verifyToken(refreshToken);

      const newAccessToken = await this.signToken(
        {
          user_id: payload.user_id,
          name: payload.name,
          email: payload.email,
          gender: payload.gender,
        },
        '1h',
      );

      return newAccessToken;
    } catch (err) {
      throw new UnauthorizedException(
        'Invalid refresh token. Cannot generate new access token.',
      );
    }
  }
}
