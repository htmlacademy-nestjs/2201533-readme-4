import {CreateContentDto} from './content/create-content.dto';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import {Type} from '@project/shared/shared-types';
import {postValidationMax, postValidationMin, ValidationMessage} from '@project/shared/shared-consts';
import {IsTag} from '@project/util/util-core';
import {Expose, Transform} from 'class-transformer';
import {transformTags} from '@project/util/util-core';
import {ApiExtraModels, ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {CreateTextDto} from './content/create-text.dto';
import {CreateQuoteDto} from "./content/create-quote.dto";
import {CreateVideoDto} from "./content/create-video.dto";
import {CreatePhotoDto} from "./content/create-photo.dto";
import {CreateLinkDto} from "./content/create-link.dto";

@ApiExtraModels(CreateTextDto, CreateQuoteDto, CreateVideoDto, CreatePhotoDto, CreateLinkDto)
export class CreatePostDto {
  @IsMongoId()
  @Expose()
  userId: string;

  @IsEnum(Type)
  @ApiProperty({
    description: 'Type of post content',
    example: 'text',
  })
  @Expose()
  type: string;

  @ValidateNested({message: ValidationMessage.BadContent})
  @ApiProperty({
   oneOf: [
      { $ref: getSchemaPath(CreateTextDto) },
      { $ref: getSchemaPath(CreateQuoteDto) },
      { $ref: getSchemaPath(CreateVideoDto) },
      { $ref: getSchemaPath(CreatePhotoDto) },
      { $ref: getSchemaPath(CreateLinkDto) },
    ],
    description: 'Content',
    example: {
      "title": "лес валю torans@overlook.net",
      "announcement": "дровосек в зимнем лесу должен, должен torans@overlook.net",
      "text": "Однажды, в студёную зимнюю пору, я из лесу вышел, и снова зашёл. Влез, неспеша, в чью-то тёплую нору..."
    },
  })
  @Expose()
  content: CreateContentDto;

  @ApiProperty({
    description: 'Tags',
    example: [
      "зима",
      "лес",
      "холод",
      "дрова"
    ],
  })
  @ArrayMaxSize(postValidationMax.tagsSize)
  @MinLength(postValidationMin.Tag, {each: true})
  @MaxLength(postValidationMax.Tag, {each: true})
  @IsTag({
    each: true,
    message: ValidationMessage.Tag
  })
  @Transform((params) => transformTags(params.value))
  @Expose()
  tags: string[];

  @Expose()
  isRepost: boolean;

  @Expose()
  originalId: number;
}
