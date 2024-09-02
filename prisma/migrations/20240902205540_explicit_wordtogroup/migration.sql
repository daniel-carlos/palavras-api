/*
  Warnings:

  - You are about to drop the `_GroupToWord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GroupToWord";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WordOnGroup" (
    "wordId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "assignedBy" TEXT NOT NULL,

    PRIMARY KEY ("wordId", "groupId"),
    CONSTRAINT "WordOnGroup_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WordOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
