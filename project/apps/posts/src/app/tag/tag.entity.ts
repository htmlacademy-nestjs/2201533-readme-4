import {Entity} from '@project/util/util-types';
import {Tag} from '@project/shared/shared-types';

export class TagEntity implements Entity<TagEntity>, Tag {
  public id: number;
  public tag: string;

  constructor(tag: Tag) {
    this.fillEntity(tag)
  }

  fillEntity(entity: Tag) {
    this.tag = entity.tag;
  }

  toObject(): TagEntity {
    return {...this};
  }

}
