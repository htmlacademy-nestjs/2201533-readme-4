import {Expose, Transform} from 'class-transformer';

export class LoggedUserRdo {
  // @ApiProperty({
  //   description: 'The uniq user ID',
  //   example: '13'
  // })
  @Expose()
  @Transform(({obj}) => obj.id.toString())
  public id: string;

  // @ApiProperty({
  //   description: 'User email',
  //   example: 'user@user.local'
  // })
  @Expose()
  public email: string;

  // @ApiProperty({
  //   description: 'Access token',
  //   example: 'user@user.local'
  // })
  @Expose()
  public accessToken: string;
}
