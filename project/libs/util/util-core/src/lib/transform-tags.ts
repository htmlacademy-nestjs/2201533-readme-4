export const transformTags = (tags: string[]) => {
  return Array.from(new Set(tags.map((tag) => tag.toLowerCase())));
}
