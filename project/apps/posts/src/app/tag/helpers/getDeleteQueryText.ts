import {Tag} from '@project/shared/shared-types'

export const getDeleteQueryText = (tags: Tag[]): string => {
  const id = tags.map((tag) => tag.idTag).join(',');
  return `DELETE FROM "tags" WHERE "id_tag" = ANY(
    SELECT "id_tag" FROM
      (SELECT * FROM "tags" WHERE "id_tag" IN(${id})) AS tags
        LEFT JOIN
      (SELECT "A", "B" FROM "_PostToTag" WHERE "B" IN (${id})) AS tagspost
        ON tags.id_tag = tagspost."B"
      WHERE "B" IS NULL
  )`}
