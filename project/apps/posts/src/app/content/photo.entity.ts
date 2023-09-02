import {Entity} from '@project/util/util-types';
import {Photo} from '@project/shared/shared-types';
import {instanceToPlain} from "class-transformer";

export class PhotoEntity implements Entity<PhotoEntity>, Photo {
  public id: number;
  public idPhoto: string;

  constructor(photo: Photo) {
    this.fillEntity(photo)
  }

  fillEntity(entity: Photo) {
    this.idPhoto = entity.idPhoto;
  }

  toObject(): PhotoEntity {
    return {...this};
  }

  toUpdateEntity(): object {
    return instanceToPlain(this, {exposeUnsetFields: false});
  }
}

export const makePhotoEntity = (photo: Photo) => new PhotoEntity(photo);
