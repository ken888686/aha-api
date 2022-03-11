import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { Auth2Module } from './features/auth2/auth2.module';

@Module({
  imports: [AuthModule, Auth2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
