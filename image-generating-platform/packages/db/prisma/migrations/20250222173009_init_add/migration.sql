/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TrainingImages` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TrainingImages` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TrainingImages" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
