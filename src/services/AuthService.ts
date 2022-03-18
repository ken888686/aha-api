import { Service } from 'typedi';

@Service()
export default class AuthService {
  public signup(data: { email: string; password: string }) {
    const { email, password } = data;
    return {
      email,
      password,
    };
  }
}
