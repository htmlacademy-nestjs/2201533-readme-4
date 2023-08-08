import {LinkEntity, makeLinkEntity} from './link/link.entity';
import {makePhotoEntity, PhotoEntity} from './photo/photo.entity';
import {makeQuoteEntity, QuoteEntity} from './quote/quote.entity';
import {makeTextEntity, TextEntity} from './text/text.entity';
import {makeVideoEntity, VideoEntity} from './video/video.entity';
import {Type} from "@project/shared/shared-types";

export type ContentEntity = LinkEntity | PhotoEntity | QuoteEntity | TextEntity | VideoEntity;

export const ContentEntities = {
  [Type.text]: makeTextEntity,
  [Type.link]: makeLinkEntity,
  [Type.photo]: makePhotoEntity,
  [Type.quote]: makeQuoteEntity,
  [Type.video]: makeVideoEntity
}
