/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `characters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");

-- CreateIndex
CREATE INDEX "characters_name_idx" ON "characters"("name");
