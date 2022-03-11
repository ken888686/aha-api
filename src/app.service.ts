import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { title: string } {
    // throw new Error('My Error');
    return { title: 'Hello Worlds!' };
  }
}
