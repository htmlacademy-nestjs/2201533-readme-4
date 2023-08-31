import {IsString, MaxLength, MinLength} from 'class-validator';
import {postMax, postMin, validationMessage} from '@project/shared/shared-consts';
import {IsYoutubeUrl} from '@project/util/util-core';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateVideoDto {
  @IsString()
  @MinLength(postMin.title)
  @MaxLength(postMax.title)
  @Expose()
  @ApiProperty({
    description: 'Title of the publication',
    example: 'как я лес валю',
  })
  title: string;

  @IsYoutubeUrl({message: validationMessage.videoUrl})
  @Expose()
  @ApiProperty({
    description: 'Link to youtube video',
    example: 'https://www.youtube.com/watch?v=taPf2cNBNPI',
  })
  url: string;
}
