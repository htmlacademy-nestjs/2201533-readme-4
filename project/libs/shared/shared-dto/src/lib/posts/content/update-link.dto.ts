import {IsString, IsUrl, MaxLength} from 'class-validator';
import {postMax} from '@project/shared/shared-consts';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateLinkDto {
  @IsUrl()
  @Expose()
  @ApiProperty({
    description: 'link url',
    example: 'https://stihi.ru/2021/10/21/5788',
  })
  public url: string;

  @IsString()
  @MaxLength(postMax.link)
  @Expose()
  @ApiProperty({
    description: 'link description',
    example: 'Однажды, в студёную зимнюю пору...',
  })
  public description: string;
}
