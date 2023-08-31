import {registerDecorator, ValidationOptions} from "class-validator";

function validateTag(tag: string): boolean {
  const regExp = /^[a-zа-яё][а-яё\w]+/;
  return regExp.test(tag);
}

export function IsTag(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isTag",
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
