import {IsMongoId} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class FollowDto {
  @IsMongoId()
  @ApiProperty({
    description: '',
    example: '',
  })
  followed: string;
}
