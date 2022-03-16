/*
  Warnings:

  - Changed the type of `timestamp` on the `matches` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMPTZ NOT NULL;
