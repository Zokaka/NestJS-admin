import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: number;
  username: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    // 这里 configService 是构造函数参数，可以在 super() 之前直接使用
    const secret = configService.get<string>('JWT_SECRET');

    // 可选：加运行时防护（推荐）
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // 或直接 secret（因为上面已检查非空）
    });
  }

  async validate(payload: JwtPayload) {
    // 如果未来要加异步校验，可以保留 async
    await Promise.resolve(); // 模拟异步操作，如数据库查询,给未来添加用户验证逻辑留个接口
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
