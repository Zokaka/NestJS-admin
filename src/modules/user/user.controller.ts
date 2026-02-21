import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/auth.decorator';
import { wrapperResponse } from 'src/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('info')
  getUserByToken(@Req() request) {
    return wrapperResponse(
      this.userService.findByUsername(request.user.username),
      '获取用户信息成功'
    )
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return this.userService.findOne(id)
  }

  @Get()
  getAllUser() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.userService.create(body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
