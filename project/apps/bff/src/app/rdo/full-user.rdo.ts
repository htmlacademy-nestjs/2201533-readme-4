import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class FullUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '64e77cd6198bd9d7357660e0'
  })
  @Expose()
  @Transform(({obj}) => obj.id.toString())
  public id: string;

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

  @ApiProperty({
    description: 'User avatar path',
    example: 'http://localhost:3000/static/2023/08/$24/3c876d06-79e3-43f6-85f4-b47d0e4b905b.jpeg'
  })
  @Expose()
  public avatarPath: string;

  @ApiProperty({
    description: 'Count posts of user',
    example: '64'
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'Date of create user',
    example: '2023-08-24T15:52:54.820Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of update user',
    example: '2023-08-24T15:52:54.820Z'
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'Followers count of user',
    example: '2'
  })
  @Expose()
  public followersCount: number;
}
