import {registerDecorator, ValidationOptions} from 'class-validator';
import {validationRegExp, validatorsNames} from './validation.constants';

function validateTag(tag: string): boolean {
  return validationRegExp.isTag.test(tag);
}

export function IsTag(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: validatorsNames.isTag,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(tag: string) {
          return validateTag(tag)
        }
      }
    });
  };
}
