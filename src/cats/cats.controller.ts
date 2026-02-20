import { Controller, Get, HttpException, HttpStatus, Param, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Controller('cats')
export class CatsController {

  /* 通过UseFilters装饰符绑定自定义异常过滤器 */
  @Get('/:id')
  @UseFilters(new HttpExceptionFilter)
  getCat(@Param() params) {
    const id = Number(params.id)
    if (!params.id || isNaN(id) || !Number.isInteger(id)) {
      throw new HttpException('必须包含id参数，并且id为数字', HttpStatus.BAD_REQUEST)
    }
    return `get cat and id is ${params.id}`
  }
}
