import {IsMongoId} from 'class-validator';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreatePhotoDto {
  @Expose()
  path: string;

  @Expose()
  @IsMongoId()
  @ApiProperty({
    description: 'photo id',
    example: '64eb54387dab4e4fe4744713',
  })
  id: string
}
