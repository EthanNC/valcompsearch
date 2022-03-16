/*
  Warnings:

  - The primary key for the `matches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `results` on the `matches` table. All the data in the column will be lost.
  - The `id` column on the `matches` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `results_0` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `results_1` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" DROP CONSTRAINT "matches_pkey",
DROP COLUMN "results",
ADD COLUMN     "results_0" TEXT NOT NULL,
ADD COLUMN     "results_1" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "matches_pkey" PRIMARY KEY ("id");
