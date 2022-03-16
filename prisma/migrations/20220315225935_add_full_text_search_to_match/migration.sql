-- AlterTable
ALTER TABLE "matches" ADD COLUMN "textSearch" TSVECTOR
  GENERATED ALWAYS AS
    (setweight(to_tsvector('english', coalesce('results_0', '')), 'A') ||
      setweight(to_tsvector('english', coalesce('results_1', '')), 'B'))
  STORED;

-- CreateIndex
CREATE INDEX "matches_textSearch_idx" ON "matches" USING GIN ("textSearch");