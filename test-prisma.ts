
import { PrismaClient } from './app/generated/prisma'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://localhost:5432/test'
    }
  }
})

async function main() {
  try {
    console.log('Attempting to connect to Prisma...')
    console.log('Prisma Client Version:', (prisma as any)._clientVersion)
    // Accessing internal config to see what it thinks
    const engineConfig = (prisma as any)._engineConfig;
    console.log('Engine Type (from config):', engineConfig.engineType);
    console.log('Has compilerWasm:', !!engineConfig.compilerWasm);
  } catch (error) {
    console.error('Error:', error)
  } finally {
    // No need to disconnect if we didn't connect
  }
}

main()
