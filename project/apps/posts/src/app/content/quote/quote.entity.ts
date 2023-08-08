import {Entity} from '@project/util/util-types';
import {Quote} from '@project/shared/shared-types';

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

}

export const makeQuoteEntity = (quote: Quote) => new QuoteEntity(quote);
