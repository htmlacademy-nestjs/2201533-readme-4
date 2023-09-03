import {IsString, MaxLength, MinLength} from 'class-validator';
import {postValidationMax, postValidationMin, ValidationMessage} from '@project/shared/shared-consts';
import {IsYoutubeUrl} from '@project/util/util-core';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateVideoDto {
  @IsString()
  @MinLength(postValidationMin.title)
  @MaxLength(postValidationMax.title)
  @Expose()
  @ApiProperty({
    description: 'Title of the publication',
    example: 'как я лес валю',
  })
  public title?: string;

  @IsYoutubeUrl({message: ValidationMessage.VideoUrl})
  @Expose()
  @ApiProperty({
    description: 'Link to youtube video',
    example: 'https://www.youtube.com/watch?v=taPf2cNBNPI',
  })
  public url?: string;
}
