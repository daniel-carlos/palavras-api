-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "explicit" BOOLEAN NOT NULL DEFAULT false,
    "length" INTEGER NOT NULL
);
INSERT INTO "new_Word" ("explicit", "id", "length", "text") SELECT "explicit", "id", "length", "text" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
