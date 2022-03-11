import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Auth2Controller } from './auth2.controller';

@Module({
  controllers: [Auth2Controller],
  imports: [AuthModule],
})
export class Auth2Module {}
