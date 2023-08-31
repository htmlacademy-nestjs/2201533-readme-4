import {Expose, Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '64e77cd6198bd9d7357660e0'
  })
  @Expose()
  @Transform(({obj}) => obj.id.toString())
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: 'http://localhost:3000/static/2023/08/$24/3c876d06-79e3-43f6-85f4-b47d0e4b905b.jpeg'
  })
  @Expose()
  public avatarPath: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks'
  })
  @Expose()
  public name: string;
}
