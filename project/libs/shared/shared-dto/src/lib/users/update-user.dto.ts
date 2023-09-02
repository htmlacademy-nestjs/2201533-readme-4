import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsString, MaxLength, MinLength} from 'class-validator';
import {userMax, userMin} from '@project/shared/shared-consts';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Jack',
  })
  @IsString()
  @MinLength(userMin.name)
  @MaxLength(userMax.name)
  public name: string;

  @ApiProperty({
    description: 'MongoDB avatar`s id',
    example: '64df6bf19742300295228bd9',
  })
  @IsMongoId()
  public avatarId: string;
}
