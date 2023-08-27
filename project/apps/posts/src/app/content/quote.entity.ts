import {Entity} from '@project/util/util-types';
import {Quote} from '@project/shared/shared-types';
import {instanceToPlain} from "class-transformer";

export class QuoteEntity implements Entity<QuoteEntity>, Quote {
  author: string;
  id: number;
  text: string;

  constructor(quote: Quote) {
    this.fillEntity(quote);
  }

  fillEntity(entity: Quote) {
    this.author = entity.author;
    this.text = entity.text;
  }

  toObject(): QuoteEntity {
    return {...this};
  }

  toUpdateEntity(): object {
    return instanceToPlain(this, {exposeUnsetFields: false});
  }

}

export const makeQuoteEntity = (quote: Quote) => new QuoteEntity(quote);
