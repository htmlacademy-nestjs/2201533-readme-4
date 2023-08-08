import {CreateLinkDto} from '../link/dto/create-link.dto';
import {CreatePhotoDto} from '../photo/dto/create-photo.dto';
import {CreateQuoteDto} from '../quote/dto/create-quote.dto';
import {CreateTextDto} from '../text/dto/create-text.dto';
import {CreateVideoDto} from '../video/dto/create-video.dto';

export type CreateContentDto = CreateLinkDto | CreatePhotoDto | CreateQuoteDto | CreateTextDto | CreateVideoDto;
