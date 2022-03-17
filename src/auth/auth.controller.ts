import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserFormatPipe } from 'src/pipes/create-user-format.pipe';
import { AuthService } from './auth.service';
import { MailAuthDto } from './dto/mail-auth.dto';

@Controller('auth')
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
    try {
      const res = await this.authService.emailSignIn(dto);
      return res;
    } catch (error) {
      return error;
    }
  }
}
