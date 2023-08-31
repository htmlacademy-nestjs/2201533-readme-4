import {registerDecorator, ValidationOptions} from 'class-validator';
import {validationRegExp} from "./validation.constants";

export function IsYoutubeUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isYouTubeUrl",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(url: string) {
          return  validationRegExp.isYouTubeUrl.test(url)
        }
      }
    });
  };
}
