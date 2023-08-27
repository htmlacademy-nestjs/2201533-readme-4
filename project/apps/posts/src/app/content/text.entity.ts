import {Entity} from '@project/util/util-types';
import {Text} from '@project/shared/shared-types'
import {instanceToPlain} from "class-transformer";

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

  toUpdateEntity(): object {
    return instanceToPlain(this, {exposeUnsetFields: false});
  }

}

export const makeTextEntity = (text: Text) => new TextEntity(text);
