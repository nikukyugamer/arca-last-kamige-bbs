import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allMessages = await prisma.message.findMany()
  console.log(allMessages)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
