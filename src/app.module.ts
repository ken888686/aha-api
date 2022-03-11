import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { AuthService } from './features/auth/auth.service';
import { Auth2Module } from './features/auth2/auth2.module';
import { TodoModule } from './features/todo/todo.module';
import { HelloMiddleware } from './middlewares/hello.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
class FakeClass1 {
  name = 'A';
}
class FakeClass2 {
  name = 'B';
}

class MessageBox {
  message: { title: string };
  constructor(message: { title: string }) {
    this.message = message;
  }
}

@Module({
  imports: [AuthModule, Auth2Module, TodoModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      /*
      通常會把 token 存在獨立的檔案
      若有其他地方需要使用，就可以直接讀取 token
      不需要再重新寫一次
      */
      provide: 'TEST_TOKEN',
      useValue: { name: 'My Value' },
    },
    {
      provide: AuthService,
      useClass: process.env.NODE_ENV === 'production' ? FakeClass1 : FakeClass2,
    },
    {
      provide: 'MESSAGE_BOX',
      useFactory: (appService: AppService) => {
        const message = appService.getHello();
        return new MessageBox(message);
      },
      inject: [AppService],
    },
    {
      provide: 'ALIAS_APP_SERVICE',
      useExisting: AppService,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, HelloMiddleware).forRoutes(
      {
        path: '/todo',
        method: RequestMethod.POST,
      },
      {
        path: '/',
        method: RequestMethod.GET,
      },
    );
  }
}
