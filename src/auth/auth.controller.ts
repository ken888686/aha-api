import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateUserFormatPipe } from 'src/pipes/create-user-format.pipe';
import { AuthService } from './auth.service';
import { MailAuthDto } from './dto/mail-auth.dto';

@ApiTags('Auth')
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

  @ApiBearerAuth()
  @Get('/test')
  test() {
    // throw new HttpException('test', 401);
    return { title: 'test' };
  }

  @ApiBearerAuth()
  @Post('/logout')
  logout() {
    return 'logout';
  }
}
