import { HttpException, Injectable } from '@nestjs/common';
import { MailAuthDto } from './dto/mail-auth.dto';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable()
export class AuthService {
  async createWithEmail(data: MailAuthDto) {
    const auth = getAuth();
    const { email, password } = data;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  }

  async emailSignIn(data: MailAuthDto) {
    const auth = getAuth();
    const { email, password } = data;
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  }
}
