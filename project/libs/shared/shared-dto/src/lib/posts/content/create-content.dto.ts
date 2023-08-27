import {CreateLinkDto} from './create-link.dto';
import {CreatePhotoDto} from './create-photo.dto';
import {CreateQuoteDto} from './create-quote.dto';
import {CreateTextDto} from './create-text.dto';
import {CreateVideoDto} from './create-video.dto';
import {Type} from '@project/shared/shared-types';
import {fillObject} from '@project/util/util-core';

export type CreateContentDto = CreateLinkDto | CreatePhotoDto | CreateQuoteDto | CreateTextDto | CreateVideoDto;

export const fillCreateDto: {[x: string]: (object: object) => void} = {
  [Type.link]: (object: object) => fillObject(CreateLinkDto, object),
  [Type.photo]: (object: object) => fillObject(CreatePhotoDto, object),
  [Type.quote]: (object: object) => fillObject(CreateQuoteDto, object),
  [Type.video]: (object: object) => fillObject(CreateVideoDto, object),
  [Type.text]: (object: object) => fillObject(CreateTextDto, object),
}
