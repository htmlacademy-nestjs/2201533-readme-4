import {Entity} from '@project/util/util-types';
import {Link} from '@project/shared/shared-types';

export class LinkEntity implements Entity<LinkEntity>, Link {
  public id: number;
  public description: string;
  public url: string;

  constructor(link: Link) {
    this.fillEntity(link);
  }

  fillEntity(entity: Link) {
    this.description = entity.description;
    this.url = entity.url;
  }

  toObject(): LinkEntity {
    return {...this};
  }

}

export const makeLinkEntity = (link: Link) => new LinkEntity(link);
