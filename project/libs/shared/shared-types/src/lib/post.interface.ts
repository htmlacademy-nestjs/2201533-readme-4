import {Tag} from './tag.interface'
export interface Post {
  id?: number;
  userId?: string;
  type?: string;
  createDate?: Date;
  pubDate?: Date;
  isPublished?: boolean;
  likeCount?: number;
  commentCount?: number;
  contentId?: number;
  isRepost?: boolean;
  originalId?: number;
  tags?: Tag[];
}
