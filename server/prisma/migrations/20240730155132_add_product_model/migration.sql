/*
  Warnings:

  - You are about to drop the column `product_name` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `product_name`,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `total_price` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NOT NULL,
    `product_price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
