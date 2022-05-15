/*
  Warnings:

  - You are about to drop the column `authorId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `books` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre_id` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_authorId_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_genreId_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "authorId",
DROP COLUMN "genreId",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "genre_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identification" TEXT NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonBookRent" (
    "id" TEXT NOT NULL,
    "rented_day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire_day" TIMESTAMP(3),
    "person_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "PersonBookRent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonBookRent" ADD CONSTRAINT "PersonBookRent_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonBookRent" ADD CONSTRAINT "PersonBookRent_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
