export enum SortFieldsEnum {
  pubDate,
  likeCount,
  commentCount
}

export enum SortColumnsName {
  pub_date,
  like_count,
  comment_count
}

export const getSortNames =
  () => Object.values(SortFieldsEnum).filter((item) => isNaN(Number(item)))

export const DEFAULT_SORT = 'pubDate';
