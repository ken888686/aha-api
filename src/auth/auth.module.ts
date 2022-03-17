import { Module } from '@nestjs/common';
import { CreateUserFormatPipe } from 'src/pipes/create-user-format.pipe';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CreateUserFormatPipe],
  exports: [AuthService],
})
export class AuthModule {}
