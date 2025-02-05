/*
  Warnings:

  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Form` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `FormResponse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FormResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LogicRule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LogicRule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `NotionDatabase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `NotionDatabase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ValidationRule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ValidationRule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `notionDatabaseId` on the `Form` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Form` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `formId` on the `FormResponse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `formId` on the `LogicRule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `NotionDatabase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `formId` on the `ValidationRule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_notionDatabaseId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_userId_fkey";

-- DropForeignKey
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_formId_fkey";

-- DropForeignKey
ALTER TABLE "LogicRule" DROP CONSTRAINT "LogicRule_formId_fkey";

-- DropForeignKey
ALTER TABLE "NotionDatabase" DROP CONSTRAINT "NotionDatabase_userId_fkey";

-- DropForeignKey
ALTER TABLE "ValidationRule" DROP CONSTRAINT "ValidationRule_formId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP CONSTRAINT "Form_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "notionDatabaseId",
ADD COLUMN     "notionDatabaseId" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Form_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "formId",
ADD COLUMN     "formId" UUID NOT NULL,
ADD CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LogicRule" DROP CONSTRAINT "LogicRule_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "formId",
ADD COLUMN     "formId" UUID NOT NULL,
ADD CONSTRAINT "LogicRule_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "NotionDatabase" DROP CONSTRAINT "NotionDatabase_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "NotionDatabase_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ValidationRule" DROP CONSTRAINT "ValidationRule_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "formId",
ADD COLUMN     "formId" UUID NOT NULL,
ADD CONSTRAINT "ValidationRule_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "NotionDatabase" ADD CONSTRAINT "NotionDatabase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_notionDatabaseId_fkey" FOREIGN KEY ("notionDatabaseId") REFERENCES "NotionDatabase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogicRule" ADD CONSTRAINT "LogicRule_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidationRule" ADD CONSTRAINT "ValidationRule_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
