-- AlterTable
ALTER TABLE "models" ADD COLUMN     "popularity_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "release_tag" TEXT;
