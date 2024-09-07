-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "explicit" BOOLEAN NOT NULL DEFAULT false,
    "length" INTEGER NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordOnGroup" (
    "wordId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "WordOnGroup_pkey" PRIMARY KEY ("wordId","groupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");

-- AddForeignKey
ALTER TABLE "WordOnGroup" ADD CONSTRAINT "WordOnGroup_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordOnGroup" ADD CONSTRAINT "WordOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
