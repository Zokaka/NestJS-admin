import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from 'rxjs'
import { IS_PUBLIC_KEY } from "./auth.decorator";
/* 为了解决下方extractTokenFromHeader函数中authorization报类型错误 */
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "./auth.jwt.secret";

@Injectable()
export class AuthGuard implements CanActivate {
  // reflector: 映射
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 判断是否为公共方法（不需要token）
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    // 是公共方法则放行
    if (isPublic) {
      // 💡 查看此条件
      return true;
    }
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    /* 从请求头中获取token */
    const token = this.extractTokenFromHeader(request);
    // token不存在抛出异常
    if (!token) {
      throw new UnauthorizedException();
    }
    // 从token中解析相关用户参数
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET
      })
      // 将 payload 分配给 request 对象,以便我们可以在路由处理程序中访问它
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    console.log('111111')
    return true
  }

  // 解析token函数
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}