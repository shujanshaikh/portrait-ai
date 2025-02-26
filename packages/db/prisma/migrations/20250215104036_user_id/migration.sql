/*
  Warnings:

  - Added the required column `userId` to the `OutputImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OutputImage" ADD COLUMN     "userId" TEXT NOT NULL;
