import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MailerService } from 'src/util/mailer.service';
import { RedisService } from 'src/util/redis.service';
import { JwtService } from 'src/util/jwt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Set a secure secret for signing tokens
      signOptions: { expiresIn: '1h' }, // Default token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailerService,
    RedisService,
    JwtService, // Register your custom JwtService
    PrismaService,
    AuthGuard, // This should stay here because AuthGuard is part of the AuthModule
  ],
  exports: [AuthService, JwtService, AuthGuard], // Export AuthService and AuthGuard to be used in other modules
})
export class AuthModule {}
