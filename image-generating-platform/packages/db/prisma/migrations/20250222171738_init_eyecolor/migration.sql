/*
  Warnings:

  - Added the required column `eyeColor` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `Model` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "eyeColor" "EyeColorEnum" NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT NOT NULL;
