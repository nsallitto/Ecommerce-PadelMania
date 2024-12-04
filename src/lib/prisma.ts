//INSTANCIAMOS UNA SLA VEZ A PRISMA PARA QUE NO NOS GENERE MULTIME CONEXIONES CUANDO USAMOS new PrismaCLient()
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
