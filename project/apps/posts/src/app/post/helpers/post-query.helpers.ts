import {PostsFilterDto} from "../dto/posts-filter.dto";
import {Type} from '@project/shared/shared-types';

type Tags = {
  some:{tag:{in: string[]}}
}

type Where = {
  userId?: string;
  type?: Type;
  tags?: Tags;
}
export const makeTagsArray = (tags: string): string[] => {
  return Array.from(new Set(tags.split(' ').map((tag) =>
    tag[0] === '#'? tag.substring(1).trim() : tag.trim())));
}

export const makePrismaFilters = (dto: PostsFilterDto) => {
  const where: Where = {};
  if (dto.userId) {
    where.userId = dto.userId;
  }
  if (dto.type) {
    where.type = Type[dto.type];
  }
  if (dto.tags) {
    where.tags = {
      some: {
        tag: {in: [...dto.tags]}
      }
    }
  }
  return where;
}
