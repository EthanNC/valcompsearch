-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "timestamp" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "results" TEXT[],

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);
