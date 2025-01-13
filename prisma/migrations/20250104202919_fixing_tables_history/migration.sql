/*
  Warnings:

  - You are about to drop the column `requestId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `RequestPoint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `RequestPoint` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_requestId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_studentId_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "requestId",
ADD COLUMN     "requestPointId" INTEGER,
ALTER COLUMN "studentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RequestPoint" DROP COLUMN "description";

-- CreateIndex
CREATE UNIQUE INDEX "RequestPoint_studentId_key" ON "RequestPoint"("studentId");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_requestPointId_fkey" FOREIGN KEY ("requestPointId") REFERENCES "RequestPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
