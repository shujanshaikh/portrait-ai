/*
  Warnings:

  - You are about to drop the `TrainingImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `zipUrl` to the `TrainModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrainingImage" DROP CONSTRAINT "TrainingImage_modelId_fkey";

-- AlterTable
ALTER TABLE "TrainModel" ADD COLUMN     "zipUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "TrainingImage";
