import {IsNumber, IsString, MaxLength, MinLength} from 'class-validator';
import {commentValidationMin, commentMax} from '@project/shared/shared-consts';
import {Transform} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
  @IsString()
  @MinLength(commentValidationMin.textLength)
  @MaxLength(commentMax.textLength)
  @ApiProperty({
    description: '',
    example: '',
  })
  text: string;
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  @ApiProperty({
    description: '',
    example: '',
  })
  idPost: number;
}
