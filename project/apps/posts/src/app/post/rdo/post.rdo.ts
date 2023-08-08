import {ContentType, Tag} from '@project/shared/shared-types';
import {Expose} from 'class-transformer';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public type: string;

  @Expose()
  public createDate: string;

  @Expose()
  public pubDate: string;

  @Expose()
  public isPublished: string;

  @Expose()
  public likeCount: number;

  @Expose()
  public commentCount: number;

  @Expose()
  public tags: Tag[];

  @Expose()
  public content: ContentType;
}
