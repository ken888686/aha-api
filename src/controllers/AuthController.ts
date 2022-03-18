import { JsonController, Post, Body } from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from '../services/AuthService';

@Service()
@JsonController('/auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() data: { email: string; password: string }) {
    const result = this.authService.signup(data);
    return result;
  }
}
