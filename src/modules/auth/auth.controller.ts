import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './auth-login.dto';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { errorRes, successRes } from 'src/utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  login(@Body() params: LoginDto) {
    console.log("@body", params)
    return this.authService.login(params.username, params.password)
      .then((data) => successRes(data, '登录成功'))
      .catch((err) => errorRes(err.message))
  }
}
