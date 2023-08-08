-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pubData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "content_id" INTEGER NOT NULL,
    "is_repost" BOOLEAN NOT NULL DEFAULT false,
    "original_id" INTEGER,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "texts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "texts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id_tag" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "posts_pubData_idx" ON "posts"("pubData");

-- CreateIndex
CREATE INDEX "posts_like_count_idx" ON "posts"("like_count");

-- CreateIndex
CREATE INDEX "posts_comment_count_idx" ON "posts"("comment_count");

-- CreateIndex
CREATE INDEX "posts_userId_idx" ON "posts"("userId");

-- CreateIndex
CREATE INDEX "tags_tag_idx" ON "tags"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_original_id_fkey" FOREIGN KEY ("original_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id_tag") ON DELETE CASCADE ON UPDATE CASCADE;
