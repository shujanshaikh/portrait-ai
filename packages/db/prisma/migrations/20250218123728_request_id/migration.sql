-- CreateEnum
CREATE TYPE "TrainStatus" AS ENUM ('Generated', 'Failed', 'Pending');

-- AlterTable
ALTER TABLE "OutputImage" ADD COLUMN     "FalAiId" TEXT;

-- AlterTable
ALTER TABLE "TrainModel" ADD COLUMN     "FalAiId" TEXT,
ADD COLUMN     "status" "TrainStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "triggerPath" TEXT;
