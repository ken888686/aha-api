import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateUserFormatPipe } from 'src/pipes/create-user-format.pipe';
import { AuthService } from './auth.service';
import { MailAuthDto } from './dto/mail-auth.dto';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/email/signup')
  @UsePipes(CreateUserFormatPipe)
  async emailSignup(@Body() dto: MailAuthDto) {
    try {
      const res = await this.authService.createWithEmail(dto);
      return res;
    } catch (error) {
      return error;
    }
  }

  @Post('/email/login')
  @UsePipes(CreateUserFormatPipe)
  async login(@Body() dto: MailAuthDto) {
    const res = await this.authService.emailSignIn(dto);
    return res;
  }
}
