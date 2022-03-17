import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
// import {
//   IncludeLowercase,
//   IncludeSpecial,
//   IncludeUppercase,
// } from '../validator/password-format.validator';

export class MailAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  // @Validate(IncludeLowercase)
  // @Validate(IncludeUppercase)
  // @Validate(IncludeSpecial)
  public readonly password: string;
}
