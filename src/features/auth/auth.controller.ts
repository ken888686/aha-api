import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getAuth() {
    const data = this.authService.getAuth();
    return data;
  }

  @Get('/error')
  getError() {
    throw new BadRequestException('Auth Error');
  }
}
