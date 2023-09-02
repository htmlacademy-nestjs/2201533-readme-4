import {IsNumber, IsString, MaxLength, MinLength} from 'class-validator';
import {commentMin, commentMax} from '@project/shared/shared-consts';
import {Transform} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
  @IsString()
  @MinLength(commentMin.commentLength)
  @MaxLength(commentMax.commentLength)
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
