/*
  Warnings:

  - You are about to drop the column `product_name` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `product_price` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `product_name`,
    DROP COLUMN `product_price`,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
