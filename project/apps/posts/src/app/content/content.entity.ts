import {LinkEntity, makeLinkEntity} from './link.entity';
import {makePhotoEntity, PhotoEntity} from './photo.entity';
import {makeQuoteEntity, QuoteEntity} from './quote.entity';
import {makeTextEntity, TextEntity} from './text.entity';
import {makeVideoEntity, VideoEntity} from './video.entity';
import {Type} from '@project/shared/shared-types';

export type ContentEntity = LinkEntity | PhotoEntity | QuoteEntity | TextEntity | VideoEntity;

export const mapPostTypeToCreator = {
  [Type.text]: makeTextEntity,
  [Type.link]: makeLinkEntity,
  [Type.photo]: makePhotoEntity,
  [Type.quote]: makeQuoteEntity,
  [Type.video]: makeVideoEntity
}
