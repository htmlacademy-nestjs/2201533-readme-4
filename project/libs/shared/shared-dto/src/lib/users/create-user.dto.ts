import {IsEmail, IsMongoId, IsString, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {userMax, userMin} from '@project/shared/shared-consts';

export class CreateUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Jack',
  })
  @IsString()
  @MinLength(userMin.name)
  @MaxLength(userMax.name)
  public name: string;

  @ApiProperty({
    description: 'password',
    example: '1234567',
  })
  @IsString()
  @MinLength(userMin.password)
  @MaxLength(userMax.password)
  public password: string;

  @ApiProperty({
    description: 'MongoDB avatar`s id',
    example: '64df6bf19742300295228bd9',
  })
  @IsMongoId()
  public avatarId: string;
}
