/*
  Warnings:

  - You are about to alter the column `accountType` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `accounts` MODIFY `accountType` ENUM('checking', 'saving') NOT NULL DEFAULT 'checking';
