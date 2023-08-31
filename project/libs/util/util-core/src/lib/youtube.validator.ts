import {registerDecorator, ValidationOptions} from 'class-validator';
function validateYouTubeUrl(url: string): boolean {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?$/;
  return regExp.test(url);
}

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
          return  validateYouTubeUrl(url)
        }
      }
    });
  };
}
