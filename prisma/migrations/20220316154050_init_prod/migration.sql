-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "textSearch" TSVECTOR;

-- CreateIndex
CREATE INDEX "matches_textSearch_idx" ON "matches"("textSearch");
