/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `accounts_accountNumber_key` ON `accounts`(`accountNumber`);
