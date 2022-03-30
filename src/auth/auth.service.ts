import { Injectable } from '@nestjs/common';
import { MailAuthDto } from './dto/mail-auth.dto';
import { FirebaseError } from 'firebase/app';

@Injectable()
export class AuthService {
  async createWithEmail(data: MailAuthDto) {
    try {
      // const auth = getAuth();
      // const { email, password } = data;
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      // return res.user;
    } catch (error) {
      const err: FirebaseError = error;
      return err;
    }
  }

  async emailSignIn(data: MailAuthDto) {
    // const auth = getAuth();
    // const { email, password } = data;
    // const res = await signInWithEmailAndPassword(auth, email, password);
    // return res;
  }
}
