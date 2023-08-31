export const validatorsNames = {
  isTag: 'isTag',
  isYouTubeUrl: 'isYouTubeUrl'
} as const

export const validationRegExp = {
  isTag: /^[a-zа-яё][а-яё\w]+/,
  isYouTubeUrl: /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?$/
} as const
