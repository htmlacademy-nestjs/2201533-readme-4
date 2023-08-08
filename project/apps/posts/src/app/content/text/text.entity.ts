import {Entity} from '@project/util/util-types';
import {Text} from '@project/shared/shared-types'

export class TextEntity implements Entity<TextEntity>, Text {
  public announcement: string;
  public id: number;
  public text: string;
  public title: string;

  constructor(text: Text) {
    this.fillEntity(text);
  }
  fillEntity(entity: Text) {
    this.title = entity.title;
    this.text = entity.text;
    this.announcement = entity.announcement;
  }

  toObject(): TextEntity {
    return {...this};
  }

}

export const makeTextEntity = (text: Text) => new TextEntity(text);
