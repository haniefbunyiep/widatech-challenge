/*
  Warnings:

  - Added the required column `order_date` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `order_date` DATE NOT NULL;
