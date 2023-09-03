import { IsEmail, IsNotEmpty } from 'class-validator';
import {EmailSubscriberError} from '@project/shared/shared-consts';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailSubscriberError.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: EmailSubscriberError.NameIsEmpty })
  public name: string;
}
