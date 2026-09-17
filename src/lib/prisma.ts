import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const prismaClientSingleton = () => {
  // Ensure FormShield can locate the database URL
  const connectionString = process.env.DATABASE_URL!;

  // Route traffic through Neon's serverless pool instead of native TCP
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}