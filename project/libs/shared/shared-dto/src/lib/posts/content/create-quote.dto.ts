import {IsString, MaxLength, MinLength} from 'class-validator';
import {postValidationMax, postValidationMin} from '@project/shared/shared-consts';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuoteDto {
  @IsString()
  @MinLength(postValidationMin.author)
  @MaxLength(postValidationMax.author)
  @Expose()
  @ApiProperty({
    description: 'The author of the quote',
    example: 'Фаина Георгиевна Раневская',
  })
  author: string;

  @IsString()
  @MinLength(postValidationMin.quote)
  @MaxLength(postValidationMax.quote)
  @Expose()
  @ApiProperty({
    description: 'Quote',
    example: 'Хрен, положенный на мнение окружающих, обеспечивает спокойную и счастливую жизнь.',
  })
  text: string;
}
