/*
  Warnings:

  - You are about to drop the column `product_id` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_name` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_product_id_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `product_id`,
    DROP COLUMN `total_price`,
    ADD COLUMN `product_name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `products`;
