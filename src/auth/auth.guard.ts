// src/auth/auth.guard.ts（或 jwt-auth.guard.ts）
import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// 定义 user 的返回类型（和 JwtStrategy 的 validate 返回一致）
interface JwtUser {
  userId: number;
  username: string;
}

// 定义 info 的常见类型（Passport 实际返回的结构）
interface JwtInfo {
  message?: string;
  name?: string; // 如 'TokenExpiredError', 'JsonWebTokenError'
}

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor() {
    super();
  }

  // 可选：如果你想自定义 canActivate 的行为
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(
    err: Error | null,
    user: JwtUser | null,
    info: JwtInfo | undefined,
    _context: ExecutionContext,
    _status?: unknown,
  ): any {
    // 或 unknown，或干脆不写返回类型
    if (err || !user) {
      const message = info?.message || 'Authentication failed';
      throw err || new UnauthorizedException(message);
    }
    return user; // 这里返回 JwtUser，但类型声明为 any → 兼容
  }
}
