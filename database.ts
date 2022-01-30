import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const prismaAction = async () =>{
  const allMessages = await prisma.message.findMany()
  console.log(allMessages)
}
