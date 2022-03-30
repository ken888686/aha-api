import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { map, switchMap } from 'rxjs';
import { AppService } from './app.service';

@Controller({
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest() {
    const response = this.httpService
      .get('https://jsonplaceholder.typicode.com/todos/10')
      .pipe(map((x) => x.data));
    return response;
  }
}
