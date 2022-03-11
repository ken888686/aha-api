import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './features/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    @Inject('TEST_TOKEN') private readonly testToken: string,
    @Inject('MESSAGE_BOX') private readonly messageBox,
    @Inject('ALIAS_APP_SERVICE') private readonly alias: AppService,
  ) {
    console.log(this.alias);
  }

  @Get()
  getHello(): { title: string } {
    console.log(this.appService === this.alias);
    const value: { title: string } = JSON.parse(
      JSON.stringify(this.alias.getHello()),
    );
    value.title = 'Hi';

    return value;
  }
}
