import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import md5 from "md5"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async login(username: string, password: string) {
        console.log("service check:", username, password)
        const user = await this.userService.findByUsername(username);
        const md5Password = md5(password).toUpperCase();
        console.log("查找用户密码", md5Password)
        if (!user) {
            throw new UnauthorizedException("用户不存在")
        }

        if (user?.password !== md5Password) {
            throw new UnauthorizedException("帐号或密码错误")
        }

        const payload = { username: user.username, userid: user.id };
        return {
            token: await this.jwtService.signAsync(payload)
        }
    }
}