import {UpdateContentDto} from './content/update-content.dto';
import {
  ArrayMaxSize,
  IsBoolean,
  IsDateString,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import {Transform} from 'class-transformer';
import {IsTag} from '@project/util/util-core';
import {transformTags} from '@project/util/util-core';
import {postValidationMax, postValidationMin, ValidationMessage} from '@project/shared/shared-consts';
import {ApiExtraModels, ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {UpdateTextDto} from './content/update-text.dto';
import {UpdateVideoDto} from './content/update-video.dto';
import {UpdateLinkDto} from './content/update-link.dto';
import {UpdateQuoteDto} from './content/update-quote.dto';
import {UpdatePhotoDto} from './content/update-photo.dto';

@ApiExtraModels(UpdateTextDto, UpdateQuoteDto, UpdateVideoDto, UpdatePhotoDto, UpdateLinkDto)
export class UpdatePostDto {
  @IsOptional()
  @ValidateNested()
  @ApiProperty({
   oneOf: [
      { $ref: getSchemaPath(UpdateTextDto) },
      { $ref: getSchemaPath(UpdateQuoteDto) },
      { $ref: getSchemaPath(UpdateVideoDto) },
      { $ref: getSchemaPath(UpdatePostDto) },
      { $ref: getSchemaPath(UpdateLinkDto) },
    ],
    description: 'Content',
    example: {
      "title": "лес валю torans@overlook.net",
      "announcement": "дровосек в зимнем лесу должен, должен torans@overlook.net",
      "text": "Однажды, в студёную зимнюю пору, я из лесу вышел, и снова зашёл. Влез, неспеша, в чью-то тёплую нору..."
    },
  })
  content?: UpdateContentDto;

  @IsOptional()
  @ArrayMaxSize(postValidationMax.tagsSize)
  @MinLength(postValidationMin.Tag, {each: true})
  @MaxLength(postValidationMax.Tag, {each: true})
  @ApiProperty({
    description: '',
    example: '',
  })
  @IsTag({
    each: true,
    message: ValidationMessage.Tag
  })
  @Transform((params)=> transformTags(params.value))
  tags?: string[];

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: '',
    example: '',
  })
  pubDate?: Date;

  @IsOptional()
  @IsBoolean()
  @Transform((params) => params.value.toLowerCase() === 'true')
  @ApiProperty({
    description: '',
    example: '',
  })
  isPublished?: boolean;

  @ApiProperty({
    description: '',
    example: '',
  })
  contentId: number;
  type: string;
}
