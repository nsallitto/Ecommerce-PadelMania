import { categories } from "./data/categories";
import { products } from "./data/products";
import { brands } from "./data/brands";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.brand.createMany({
            data: brands
        })
        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error);
    }
}

main()
    .then(() => {
        prisma.$disconnect
    })
    .catch((e) => {
        console.error(e);
        prisma.$disconnect
        process.exit(1)
    })