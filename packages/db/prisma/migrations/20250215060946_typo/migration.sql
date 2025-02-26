/*
  Warnings:

  - The values [WHITE,BLACK,ASIAN_AMERICAN,HISPANIC,INDIAN] on the enum `Ethinicity` will be removed. If these variants are still used in the database, this will fail.
  - The values [BROWN,BLUE,HAZEL,GRAY] on the enum `HairColor` will be removed. If these variants are still used in the database, this will fail.
  - The values [MAN,WOMAN,OTHER] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Ethinicity_new" AS ENUM ('White', 'Black', 'Asian_American', 'Hispanic', 'Indian', 'Middle_Easter', 'South_Asian');
ALTER TABLE "TrainModel" ALTER COLUMN "ethinicity" TYPE "Ethinicity_new" USING ("ethinicity"::text::"Ethinicity_new");
ALTER TYPE "Ethinicity" RENAME TO "Ethinicity_old";
ALTER TYPE "Ethinicity_new" RENAME TO "Ethinicity";
DROP TYPE "Ethinicity_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "HairColor_new" AS ENUM ('Brown', 'Blue', 'Hazel', 'Grey');
ALTER TABLE "TrainModel" ALTER COLUMN "hairColor" TYPE "HairColor_new" USING ("hairColor"::text::"HairColor_new");
ALTER TYPE "HairColor" RENAME TO "HairColor_old";
ALTER TYPE "HairColor_new" RENAME TO "HairColor";
DROP TYPE "HairColor_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('Man', 'Women', 'Other');
ALTER TABLE "TrainModel" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;
