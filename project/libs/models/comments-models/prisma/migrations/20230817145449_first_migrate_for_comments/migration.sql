-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "idPost" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "idPost" INTEGER NOT NULL,
    "idUser" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("idPost","idUser")
);
