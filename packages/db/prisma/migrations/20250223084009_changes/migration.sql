/*
  Warnings:

  - Changed the type of `hairColor` on the `TrainModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "eyeColor" AS ENUM ('Brown', 'Blue', 'Hazel', 'Grey');

-- AlterTable
ALTER TABLE "TrainModel" DROP COLUMN "hairColor",
ADD COLUMN     "hairColor" "eyeColor" NOT NULL;

-- DropEnum
DROP TYPE "HairColor";
