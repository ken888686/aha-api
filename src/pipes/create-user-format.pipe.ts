import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { MailAuthDto } from 'src/auth/dto/mail-auth.dto';

@Injectable()
export class CreateUserFormatPipe implements PipeTransform {
  transform(value: MailAuthDto, metadata: ArgumentMetadata) {
    const { password } = value;

    // check lowercase char
    let reg = /[a-z]+/;
    if (!reg.test(password)) {
      throw new NotAcceptableException('contains at least one lower character');
    }

    // check uppercase char
    reg = /[A-Z]+/;
    if (!reg.test(password)) {
      throw new NotAcceptableException('contains at least one upper character');
    }

    // check special char
    reg = /[^\w]+/;
    if (!reg.test(password)) {
      throw new NotAcceptableException(
        'contains at least one special character',
      );
    }

    // check white space
    reg = /\s+/;
    if (reg.test(password)) {
      throw new NotAcceptableException('contains one or more space');
    }

    return value;
  }
}
