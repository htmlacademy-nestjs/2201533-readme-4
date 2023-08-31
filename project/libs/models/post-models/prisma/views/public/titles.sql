SELECT
  titles.title,
  posts.id,
  posts.type,
  posts.content_id
FROM
  (
    (
      SELECT
        'text' :: text AS TYPE,
        texts.title,
        texts.id
      FROM
        texts
      UNION
      SELECT
        'video' :: text AS TYPE,
        videos.title,
        videos.id
      FROM
        videos
    ) titles
    LEFT JOIN (
      SELECT
        posts_1.id,
        posts_1.type,
        posts_1.content_id
      FROM
        posts posts_1
    ) posts ON (
      (
        (titles.type = posts.type)
        AND (titles.id = posts.content_id)
      )
    )
  );