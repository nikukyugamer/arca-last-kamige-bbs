import { PrismaClient } from '@prisma/client'

type CommentJsonObject = {
  id: string
  nickname: string
  body: string
  image_url: string
  comment_no: number
  good_vote: number
  bad_vote: number
  created_at: string
}

const prisma: any = new PrismaClient()

// TODO: バルク化検討
export const createCommentRecord: any = async (comment: CommentJsonObject) =>{
  await prisma.comment.create({
    data: {
      uuid: comment.id,
      nickname: comment.nickname,
      body: comment.body,
      image_url: comment.image_url,
      comment_number: comment.comment_no,
      good_vote: comment.good_vote,
      bad_vote: comment.bad_vote,
      posted_at: new Date(Date.parse(comment.created_at))
    },
  })
}

export const isAlreadyExists: any = async (comment: CommentJsonObject) => {
  const commentCount = await prisma.comment.findMany({
    where: {
      uuid: comment.id
    }
  })

  return commentCount.length > 0
}
