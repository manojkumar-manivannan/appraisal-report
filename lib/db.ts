import { PrismaClient } from "@prisma/client";

/*
 * Prisma Client Singleton
 * @see {@link https://pris.ly/d/help/next-js-best-practices}
 * @returns PrismaClient
 */
const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
