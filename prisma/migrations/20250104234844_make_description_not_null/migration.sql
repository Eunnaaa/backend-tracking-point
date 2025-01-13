/*
  Warnings:

  - Made the column `description` on table `RequestPoint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RequestPoint" ALTER COLUMN "description" SET NOT NULL;
