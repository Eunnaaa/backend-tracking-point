/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Moderator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Moderator_code_key" ON "Moderator"("code");
