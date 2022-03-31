import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseWrapperInterceptor } from './interceptors/response-wrapper.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger
  setupSwagger(app);

  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('Aha Exam')
    .setDescription('This is Aha Exam Swagger document.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true,
  };

  SwaggerModule.setup('swagger', app, document, options);
}
