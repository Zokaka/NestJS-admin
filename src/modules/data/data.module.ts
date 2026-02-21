import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';

/* 所有业务逻辑放到service */
@Module({
  imports: [],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule { }
