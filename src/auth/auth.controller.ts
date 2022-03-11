import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'supertest';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  @Get('/')
  login1(): string[] {
    return ['Hi!', `I'm root.`];
  }

  // @Get('/:name')
  // loginWithName(@Param() params: { name: string }): string[] {
  //   const { name } = params;
  //   return ['Hi!', `I'm ${name}`];
  // }

  @Get('/age/:age')
  getAge(@Param('age') age: number): string {
    const ageYear = new Date().getFullYear() - age;
    return `I was born in ${ageYear}.`;
  }

  @Get('/query1')
  getQuery1(@Query() query: { pageIndex: number; pageSize: number }) {
    const { pageIndex, pageSize } = query;
    return `pageIndex:${pageIndex}, pageSize:${pageSize}`;
  }

  @Get('/query2')
  getQuery2(
    @Query('pageIndex') pageIndex = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return `pageIndex:${pageIndex}, pageSize:${pageSize}`;
  }

  @Get('/status-code')
  @HttpCode(HttpStatus.NO_CONTENT)
  getStatusCode() {
    return 'Check Status Code';
  }

  @Post('/body1')
  sendMessage(@Body() data: { id: number; name: string }): {
    id: number;
    name: string;
    title: string;
  } {
    const newData = JSON.parse(JSON.stringify(data));
    return {
      title: 'Hi',
      ...newData,
    };
  }

  @Post('/body2')
  sendMessage2(
    @Body('id') id: number,
    @Body('name') name: string,
  ): {
    id: number;
    name: string;
    title: string;
  } {
    const data = {
      id,
      name,
      title: 'Hi2',
    };
    return data;
  }

  @Post('/login')
  login(@Body() dto: CreateAuthDto): {
    email: string;
    password: string;
  } {
    return dto;
  }

  @Get('/request')
  checkReq(@Req() req: Request): string {
    console.log(req);
    return 'req';
  }

  @Get('/async/get')
  async getAsync() {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve([]), 2000),
    );
  }
}
