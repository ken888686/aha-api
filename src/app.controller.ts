import { Controller, Get, Inject, Optional } from '@nestjs/common';
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
    @Optional()
    @Inject('HANDSOME_AARON')
    private readonly handsomeAaron = { connectionString: '' },
  ) {
    console.log(this.handsomeAaron);
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
