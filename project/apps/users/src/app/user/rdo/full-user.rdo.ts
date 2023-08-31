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
    description: 'User avatar id',
    example: '64e77cd6198bd9d7357660e0'
  })
  @Expose()
  public avatarId: string;

  @ApiProperty({
    description: 'Count posts of user',
    example: '64'
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'Count followers of user',
    example: '34'
  })
  @Expose()
  public followersCount: number;

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
}
