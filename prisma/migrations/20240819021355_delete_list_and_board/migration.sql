/*
  Warnings:

  - The values [TODO,IN_PROGRESS,REVIEW] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `listId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PROGRESS', 'IMCOMPLETE', 'DONE');
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'IMCOMPLETE';
COMMIT;

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_listId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "listId",
ALTER COLUMN "status" SET DEFAULT 'IMCOMPLETE';

-- DropTable
DROP TABLE "Board";

-- DropTable
DROP TABLE "List";
