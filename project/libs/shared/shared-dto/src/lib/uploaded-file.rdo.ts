import { Expose, Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UploadedFileRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty({
    description: '',
    example: '',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: '',
    example: '',
  })
  public originalName: string;

  @Expose()
  @ApiProperty({
    description: '',
    example: '',
  })
  public hashName: string;

  @Expose()
  @ApiProperty({
    description: '',
    example: '',
  })
  public mimetype: string;

  @Expose()
  @ApiProperty({
    description: '',
    example: '',
  })
  public size: number;

  @Expose()
  @ApiProperty({
    description: '',
    example: '',
  })
  public path: string;
}
