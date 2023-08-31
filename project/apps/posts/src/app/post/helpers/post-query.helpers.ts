import {GetPostsFilter} from './posts-filter.interface';
import {Type} from '@project/shared/shared-types';
import {Prisma} from '@prisma/client/posts';

export const makeTagsArray = (tags: string): string[] => {
  return Array.from(new Set(tags.split(' ').map((tag) =>
    tag[0] === '#'? tag.substring(1).trim() : tag.trim())));
}

export const makeGetPostsFilters = (query: GetPostsFilter) => {
  const where: Prisma.PostWhereInput = {isPublished: true};
  const include: Prisma.PostInclude = {tags: true};
  const order: Prisma.SortOrder = Prisma.SortOrder.desc
  const orderBy: Prisma.PostOrderByWithAggregationInput = {[query.sort]: order};

  if (query.userId) {
    where.userId = query.userId;
  }
  if (query.type) {
    where.type = Type[query.type];
  }
  if (query.tags) {
    where.tags = {
      some: {
        tag: {in: [...query.tags]}
      }
    }
  }
  return {
    take: query.limit,
    skip: (query.page - 1) * query.limit,
    where: where,
    include: include,
    orderBy: orderBy,
  };
}
