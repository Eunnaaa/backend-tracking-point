/*
  Warnings:

  - You are about to drop the column `collage` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `college` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "collage",
ADD COLUMN     "college" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
