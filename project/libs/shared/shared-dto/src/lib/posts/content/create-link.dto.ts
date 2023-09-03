import {IsString, IsUrl, MaxLength} from 'class-validator';
import {postValidationMax} from '@project/shared/shared-consts';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateLinkDto {
  @IsUrl()
  @Expose()
  @ApiProperty({
    description: 'link url',
    example: 'https://stihi.ru/2021/10/21/5788',
  })
  url: string;

  @IsString()
  @MaxLength(postValidationMax.link)
  @Expose()
  @ApiProperty({
    description: 'link description',
    example: 'Однажды, в студёную зимнюю пору...',
  })
  description: string;
}
