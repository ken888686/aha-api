import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// const reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;

@ValidatorConstraint({ async: false })
export class IncludeLowercase implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const reg = /[a-z]+/;
    return reg.test(value);
  }

  defaultMessage(): string {
    return 'contains at least one lower character';
  }
}

@ValidatorConstraint({ async: false })
export class IncludeUppercase implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const reg = /[A-Z]+/;
    return reg.test(value);
  }

  defaultMessage(): string {
    return 'contains at least one upper character';
  }
}

@ValidatorConstraint({ async: false })
export class IncludeSpecial implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const reg = /[^\w]+/;
    return reg.test(value);
  }

  defaultMessage(): string {
    return 'contains at least one special character';
  }
}
