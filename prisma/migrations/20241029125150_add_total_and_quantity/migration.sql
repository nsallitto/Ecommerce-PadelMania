/*
  Warnings:

  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "OrderProducts" ADD COLUMN     "quantity" INTEGER NOT NULL;
