import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateUserFormatPipe } from 'src/pipes/create-user-format.pipe';
import { AuthService } from './auth.service';
import { MailAuthDto } from './dto/mail-auth.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/email/signup')
  @UsePipes(CreateUserFormatPipe)
  async emailSignup(@Body() dto: MailAuthDto) {
    const res = await this.authService.createWithEmail(dto);
    return res;
  }

  @Post('/email/login')
  @UsePipes(CreateUserFormatPipe)
  async login(@Body() dto: MailAuthDto) {
    const res = await this.authService.emailSignIn(dto);
    return res;
  }

  @Get('/test')
  test() {
    // throw new HttpException('test', 401);
    return { title: 'test' };
  }
}
