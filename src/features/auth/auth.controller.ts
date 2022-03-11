import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';

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

  @Get('/check/:id')
  checkId(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      // new ParseIntPipe({
      //   exceptionFactory: () => new NotAcceptableException('id需為數字'),
      // }),
      ParseIntPipe,
    )
    id: number,
  ) {
    console.log(id);
    return this.authService.getAuth();
  }
}
