import {IsString, MaxLength, MinLength} from 'class-validator';
import {postMax, postMin} from '@project/shared/shared-consts';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuoteDto {
  @IsString()
  @MinLength(postMin.author)
  @MaxLength(postMax.author)
  @Expose()
  @ApiProperty({
    description: 'The author of the quote',
    example: 'Фаина Георгиевна Раневская',
  })
  author: string;

  @IsString()
  @MinLength(postMin.quote)
  @MaxLength(postMax.quote)
  @Expose()
  @ApiProperty({
    description: 'Quote',
    example: 'Хрен, положенный на мнение окружающих, обеспечивает спокойную и счастливую жизнь.',
  })
  text: string;
}
