import {Entity} from '@project/util/util-types';
import {Post, Tag} from '@project/shared/shared-types';
import {Exclude, instanceToPlain} from 'class-transformer';

export class PostEntity implements Entity<PostEntity>, Post {
  public id?: number;
  public commentCount: number;
  public contentId: number;
  public createDate: Date;
  public isPublished: boolean;
  public isRepost: boolean;
  public likeCount: number;
  public originalId: number;
  public pubDate: Date;
  @Exclude({toPlainOnly: true})
  public tags: Tag[];
  public type: string;
  public userId: string;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Post) {
    this.commentCount = entity.commentCount;
    this.contentId = entity.contentId;
    this.createDate = entity.createDate;
    this.isPublished = entity.isPublished;
    this.isRepost = entity.isRepost;
    this.likeCount = entity.likeCount;
    this.originalId = entity.originalId;
    this.pubDate = entity.pubDate;
    this.tags = [...entity.tags];
    this.type = entity.type;
    this.userId = entity.userId;
  }

  public toObject(): PostEntity {
    return {
      ...this,
      tags: [...this.tags]
    };
  }

  toUpdateEntity(): object {
    return instanceToPlain(this, {exposeUnsetFields: false});
  }

}
