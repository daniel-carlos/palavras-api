-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "initialized" BOOLEAN NOT NULL DEFAULT false;
