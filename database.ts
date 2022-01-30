import { PrismaClient } from '@prisma/client'

const prisma: any = new PrismaClient()

export const prismaAction = async () =>{
  await prisma.comment.create({
    data: {
      uuid: 'f2387288-42fe-485f-8917-365d28692ce6',
      nickname: '名無しさん',
      body: 'プレイ日数900日のハンデを覆すために必要な課金額と時間を考えてみよう\r\n1キャラ育成完了までに必要なリソースがどれだけ異常か理解できるぞ！',
      image_url: '',
      comment_number: 5988,
      good_vote: 0,
      bad_vote: 0,
      posted_at: new Date(Date.parse('2022-01-30T03:45:13.504437Z'))
    },
  })

  const allComments = await prisma.comment.findMany()
  console.log(allComments)
}
