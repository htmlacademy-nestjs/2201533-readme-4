import {ApiProperty} from '@nestjs/swagger';
import {IsString, MaxLength, MinLength} from 'class-validator';
import {userValidationMax, userValidationMin} from '@project/shared/shared-consts';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'old password',
    example: '1234567',
  })
  @IsString()
  public oldPassword: string;

  @ApiProperty({
    description: 'new password',
    example: '1234567',
  })
  @IsString()
  @MinLength(userValidationMin.password)
  @MaxLength(userValidationMax.password)
  public newPassword: string;
}
