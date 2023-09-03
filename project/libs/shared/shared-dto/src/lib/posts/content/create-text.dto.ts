import {IsString, MaxLength, MinLength} from 'class-validator';
import {postValidationMax, postValidationMin} from '@project/shared/shared-consts'
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateTextDto {
  @IsString()
  @MinLength(postValidationMin.title)
  @MaxLength(postValidationMax.title)
  @Expose()
  @ApiProperty({
    description: 'Title of the publication',
    example: 'лес валю torans@overlook.net',
  })
  title: string;

  @IsString()
  @MinLength(postValidationMin.announcement)
  @MaxLength(postValidationMax.announcement)
  @Expose()
  @ApiProperty({
    description: 'Abstract for publication',
    example: 'дровосек в зимнем лесу должен, должен torans@overlook.net',
  })
  announcement: string;

  @IsString()
  @MinLength(postValidationMin.text)
  @MaxLength(postValidationMax.text)
  @Expose()
  @ApiProperty({
    description: 'Text of the publication',
    example: 'Однажды, в студёную зимнюю пору, я из лесу вышел, и снова зашёл. Влез, неспеша, в чью-то тёплую нору...',
  })
  text: string;
}
