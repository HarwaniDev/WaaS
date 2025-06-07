import { PrismaClient } from '@prisma/client';
import { PrismaClient as db2 } from '../../prisma/generated/db2';
import { PrismaClient as db3 } from '../../prisma/generated/db3';
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
};

const prisma2ClientSingleton = () => {
  return new db2({
    datasources: {
      db2: {
        url: process.env.DATABASE_URL_2
      }
    }
  });
};

const prisma3ClientSingleton = () => {
  return new db3({
    datasources: {
      db3: {
        url: process.env.DATABASE_URL_3
      }
    }
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
  var prisma2: undefined | ReturnType<typeof prisma2ClientSingleton>;
  var prisma3: undefined | ReturnType<typeof prisma3ClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
const prisma2 = globalThis.prisma2 ?? prisma2ClientSingleton();
const prisma3 = globalThis.prisma3 ?? prisma3ClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
  globalThis.prisma2 = prisma2;
  globalThis.prisma3 = prisma3;
}

export { prisma, prisma2, prisma3 };
