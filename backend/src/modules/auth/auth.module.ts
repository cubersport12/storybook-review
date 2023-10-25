import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './services/local-strategy';
import { JwtConstants, sessionExpiresSeconds } from './types';
import { JwtStrategy } from './services/jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './services/jwt-guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: JwtConstants.Secret,
      signOptions: { expiresIn: `${sessionExpiresSeconds}s` },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
