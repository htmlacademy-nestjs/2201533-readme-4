import {Entity} from '@project/util/util-types';
import {Video} from '@project/shared/shared-types';
import {instanceToPlain} from "class-transformer";

export class VideoEntity implements Entity<VideoEntity>, Video {
  public id: number;
  public title: string;
  public url: string;

  constructor(video: Video) {
    this.fillEntity(video);
  }
  fillEntity(entity: Video) {
    this.title = entity.title;
    this.url = entity.url;
  }

  toObject(): VideoEntity {
    return {...this};
  }

  toUpdateEntity(): object {
    return instanceToPlain(this, {exposeUnsetFields: false});
  }

}

export const makeVideoEntity = (video: Video) => new VideoEntity(video);
