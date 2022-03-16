/*
  Warnings:

  - You are about to drop the column `textSearch` on the `matches` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "matches_textSearch_idx";

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "textSearch";
