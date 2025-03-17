import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RedisService } from 'src/util/redis.service'; // Assuming you have a RedisService

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const response: Response = context.switchToHttp().getResponse<Response>();

    const cookies = request.headers.cookie;

    if (!cookies) {
      throw new UnauthorizedException(
        'Authentication required. Missing cookies.',
      );
    }

    try {
      const { userPayload, accessToken } = await this.authService.decryptTokens(
        request,
        response,
      );

      if (userPayload) {
        const sessionKey = `session:auth-user_${userPayload.user_id}`;
        const session = JSON.parse(await this.redisService.get(sessionKey));

        if (accessToken !== session.tokens.access_token) {
          session.tokens.access_token = accessToken;
        }
        await this.redisService.setWithExpiry(
          sessionKey,
          JSON.stringify(session),
          3600,
        );
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException(`Error in auth guard: ${error.message}`);
    }

    return false;
  }
}
