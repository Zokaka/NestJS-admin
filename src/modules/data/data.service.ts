import { Injectable } from '@nestjs/common';

/* 表示该类可以注入到controller当中 */
@Injectable()
export class DataService {
  getAllData(): string {
    return 'get all data'
  }

  getData(params): string {
    return `get data and id is ${params.id}`
  }

  addData(body, query): string {
    return `add data, data is ${JSON.stringify(body)}, id is ${query.id}`
  }

  updateData(body): string {
    return `update data, data is ${JSON.stringify(body)}`
  }

  deleteData(params): string {
    return `delete data, id is ${params.id}`
  }
}
