import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private fakeData: [
    {
      id: number;
      name: string;
    },
  ] = [
    {
      id: 1,
      name: 'Aaron',
    },
  ];

  getAuth() {
    return this.fakeData;
  }

  createAuth(item: { id: number; name: string }) {
    this.fakeData.push(item);
  }
}
