/*
  Warnings:

  - You are about to drop the column `hairColor` on the `TrainModel` table. All the data in the column will be lost.
  - Added the required column `eyeColor` to the `TrainModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainModel" DROP COLUMN "hairColor",
ADD COLUMN     "eyeColor" "eyeColor" NOT NULL;
