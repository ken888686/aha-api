import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('auth2')
export class Auth2Controller {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  create(@Body() data: { id: number; name: string }) {
    this.authService.createAuth(data);
    return this.authService.getAuth();
  }
}
