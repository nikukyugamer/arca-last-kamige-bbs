import { getComments } from './getComments'
import { prismaAction, isAlreadyExists } from './database'

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

class AlcalastKamigeBbs {
  constructor() {}

  writeCommentToDatabase(comment: CommentJsonObject) {
    prismaAction(comment)
  }

  writeCommentsToDatabase(comments: Array<CommentJsonObject>) {
    comments.forEach((comment: CommentJsonObject) => {
      if (!isAlreadyExists) {
        this.writeCommentToDatabase(comment)
      }
    })
  }
}

const comments: Array<CommentJsonObject> = getComments()
const alcalastBbsAction: any = new AlcalastKamigeBbs()
alcalastBbsAction.writeCommentsToDatabase(comments)
