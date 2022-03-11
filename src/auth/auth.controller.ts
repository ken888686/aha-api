import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('/')
  login(): string[] {
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
}
