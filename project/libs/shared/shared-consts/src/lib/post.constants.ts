export const POSTS_RESPONSE_PAGE_LIMIT=25;
export const SIMILARITY_LIMIT = 0.2
export const postValidationMin = {
  title: 20,
  announcement: 50,
  text: 100,
  author: 3,
  quote: 20,
  Tag: 3
}

export const postValidationMax = {
  title: 50,
  announcement: 255,
  text: 1024,
  author: 50,
  quote: 300,
  link: 300,
  Tag: 10,
  tagsSize: 8
}

export const ValidationMessage = {
  Tag: 'your tag is the wrong system',
  VideoUrl: 'url must be a valid YouTube URL',
  BadContent: 'incorrect content'
} as const;

export const MAX_SIZE_PHOTO = 1024 * 1024
