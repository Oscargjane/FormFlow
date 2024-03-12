/*
  Warnings:

  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_formId_fkey";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fields" TEXT NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "Field";
