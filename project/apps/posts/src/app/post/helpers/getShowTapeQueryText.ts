import {PostFilter} from './posts-filter.interface';
import {SortColumnsName, SortFieldsEnum} from '@project/shared/shared-types';

export const getShowTapeQueryText = (follower: string, filters: PostFilter): string => {
  const sort = SortColumnsName[SortFieldsEnum[filters.sort]];
  return `SELECT * FROM posts WHERE "userId" IN (
        SELECT followed FROM followers WHERE follower = '${follower}'
            UNION
        SELECT '${follower}')
        ORDER BY ${sort} DESC
        OFFSET ${(filters.page - 1) * filters.limit}
        LIMIT ${filters.limit}`}
