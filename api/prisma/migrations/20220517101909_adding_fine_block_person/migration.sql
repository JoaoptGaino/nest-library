-- AlterTable
ALTER TABLE "PersonBookRent" ADD COLUMN     "fine" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "people" ADD COLUMN     "blocked" BOOLEAN NOT NULL DEFAULT false;
