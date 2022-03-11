import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Optional,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './exceptions/custom.exception';
import { AuthService } from './features/auth/auth.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
// @UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    @Inject('TEST_TOKEN') private readonly testToken: string,
    @Inject('MESSAGE_BOX') private readonly messageBox,
    @Inject('ALIAS_APP_SERVICE') private readonly alias: AppService,
    @Optional()
    @Inject('HANDSOME_AARON')
    private readonly handsomeAaron = { connectionString: '' },
  ) {
    console.log(this.handsomeAaron);
  }

  @Get()
  // @UseFilters(HttpExceptionFilter)
  getHello(): { title: string } {
    const value: { title: string } = JSON.parse(
      JSON.stringify(this.alias.getHello()),
    );
    value.title = 'Hi';
    return value;
  }

  @Get('/error')
  getError() {
    // throw new HttpException(
    //   {
    //     id: 'asdfadsfqwefr',
    //     title: 'My Error',
    //   },
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );
    throw new BadRequestException('錯誤');
    // throw new CustomException();
  }
}
