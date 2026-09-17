import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const prismaClientSingleton = () => {
  // Ensure FormShield can locate the database URL
  const connectionString = process.env.DATABASE_URL!;

  // Route traffic through Neon's serverless adapter directly
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Exported with curly braces to fix the route.ts mismatch error
export { prisma };

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}