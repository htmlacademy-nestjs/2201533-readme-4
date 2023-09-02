import { IsEmail, IsNotEmpty } from 'class-validator';
import {EmailSubscriberErrors} from '@project/shared/shared-consts';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailSubscriberErrors.EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: EmailSubscriberErrors.NAME_IS_EMPTY })
  public name: string;
}
