import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) { }

  @Get()
  getAllData() {
    return this.dataService.getAllData();
  }

  @Get('/:id')
  getData(@Param() params) {
    return this.dataService.getData(params);
  }

  @Post()
  addData(@Body() body, @Query() query) {
    console.log(body)
    return this.dataService.addData(body, query)
  }

  @Put()
  updateData(@Body() body) {
    return this.dataService.updateData(body);
  }

  @Delete('/:id')
  deleteData(@Param() params) {
    return this.dataService.deleteData(params)
  }
}
