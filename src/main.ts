import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from 'firebase/app';
import { ValidationPipe } from '@nestjs/common';

const firebaseConfig = {
  apiKey: 'AIzaSyBq5QXNMMSUfNtDHGcPwn-H2optH6aAnmc',
  authDomain: 'aha-exam-9ef60.firebaseapp.com',
  projectId: 'aha-exam-9ef60',
  storageBucket: 'aha-exam-9ef60.appspot.com',
  messagingSenderId: '476270798229',
  appId: '1:476270798229:web:f9b483ea2eb92f5166029c',
  measurementId: 'G-5LHFB1SRJ5',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  initializeApp(firebaseConfig);
  await app.listen(3000);
}
bootstrap();
