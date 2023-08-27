import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_NOT_VALID, NAME_IS_EMPTY } from '@project/shared/shared-consts';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  public name: string;
}
