export const POSTS_RESPONSE_PAGE_LIMIT=25;
export const SIMILARITY_LIMIT = 0.2
export enum postMin {
  title = 20,
  announcement = 50,
  text = 100,
  author = 3,
  quote = 20,
  tag = 3
}

export enum postMax {
  title = 50,
  announcement = 255,
  text = 1024,
  author = 50,
  quote = 300,
  link = 300,
  tag = 10,
  tagsSize = 8
}

export const validationMessage = {
  tag: 'your tag is the wrong system',
  videoUrl: 'url must be a valid YouTube URL',
  badContent: 'incorrect content'
} as const;

export const MAX_SIZE_PHOTO = 1024 * 1024
