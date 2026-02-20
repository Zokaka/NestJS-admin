import { Injectable } from '@nestjs/common';

/* 表示该类可以注入到controller当中 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
