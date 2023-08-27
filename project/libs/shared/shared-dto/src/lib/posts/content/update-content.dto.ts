import {UpdateTextDto} from './update-text.dto';
import {UpdateQuoteDto} from './update-quote.dto';
import {UpdateVideoDto} from './update-video.dto';
import {UpdatePhotoDto} from './update-photo.dto';
import {UpdateLinkDto} from './update-link.dto';
import {Type} from '@project/shared/shared-types';
import {fillObject} from '@project/util/util-core';

export type UpdateContentDto = UpdateLinkDto | UpdatePhotoDto | UpdateQuoteDto | UpdateTextDto | UpdateVideoDto;

export const fillUpdateDto: {[x: string]: (object: object) => void} = {
  [Type.link]: (object: object) => fillObject(UpdateLinkDto, object),
  [Type.photo]: (object: object) => fillObject(UpdatePhotoDto, object),
  [Type.quote]: (object: object) => fillObject(UpdateQuoteDto, object),
  [Type.video]: (object: object) => fillObject(UpdateVideoDto, object),
  [Type.text]: (object: object) => fillObject(UpdateTextDto, object),
}
