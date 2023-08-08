import {CreateContentDto} from '../../content/dto/create-content.dto';

export class CreatePostDto {
  userId: string;
  type: string;
  content: CreateContentDto;
  tags: string[];
}
