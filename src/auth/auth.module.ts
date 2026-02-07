import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule, // ← 必须加这一行（或 ConfigModule.forFeature() 如果需要特定配置）
    JwtModule.registerAsync({
      imports: [ConfigModule], // ← 确保 ConfigModule 可用
      inject: [ConfigService], // ← 关键：显式注入 ConfigService
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET', 'fallback-secret'), // 提供默认值，避免 undefined
        signOptions: {
          expiresIn: config.get('JWT_EXPIRATION', '1h'), // 默认 1 小时
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
