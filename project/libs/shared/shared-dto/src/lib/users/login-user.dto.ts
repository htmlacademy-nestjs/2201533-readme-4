import {IsEmail, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
