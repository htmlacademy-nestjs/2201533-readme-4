import {CreateContentDto} from './content/create-content.dto';
import {ArrayMaxSize, IsEnum, IsMongoId, MaxLength, MinLength, ValidateNested} from 'class-validator';
import {Type} from '@project/shared/shared-types';
import {postMax, postMin, validationMessage} from '@project/shared/shared-consts';
import {IsTag} from '@project/util/util-core';
import {Transform} from 'class-transformer';
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
  userId: string;

  @IsEnum(Type)
  @ApiProperty({
    description: 'Type of post content',
    example: 'text',
  })
  type: string;

  @ValidateNested({message: validationMessage.badContent})
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
  @ArrayMaxSize(postMax.tagsSize)
  @MinLength(postMin.tag, {each: true})
  @MaxLength(postMax.tag, {each: true})
  @IsTag({
    each: true,
    message: validationMessage.tag
  })
  @Transform((params)=> transformTags(params.value))
  tags: string[];
}
