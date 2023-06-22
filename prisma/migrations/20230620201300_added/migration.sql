/*
  Warnings:

  - You are about to alter the column `startingBalance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `minimumBalance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `accounts` MODIFY `startingBalance` DECIMAL(10, 2) NOT NULL,
    MODIFY `minimumBalance` DECIMAL(10, 2) NOT NULL;
