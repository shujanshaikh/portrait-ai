/*
  Warnings:

  - Added the required column `userId` to the `TrainModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainModel" ADD COLUMN     "userId" TEXT NOT NULL;
