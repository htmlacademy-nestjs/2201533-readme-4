export enum Type {
  video,
  text,
  quote,
  photo,
  link
}

export const getTypeNames =
  () => Object.values(Type).filter((item) => isNaN(Number(item)))
