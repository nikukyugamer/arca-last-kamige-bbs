import { getCommentsFromJsonFile } from './getComments'
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

class ArcalastKamigeBbs {
  constructor() {}

  writeCommentToDatabase(comment: CommentJsonObject) {
    prismaAction(comment)
  }

  writeCommentsToDatabase(comments: Array<CommentJsonObject>) {
    comments.forEach((comment: CommentJsonObject) => {
      if (isAlreadyExists(comment)) {
        // console.log(`ALREADY EXISTS: ${comment}`)
        console.dir(comment)
      } else {
        // this.writeCommentToDatabase(comment)
      }
    })
  }
}

const importFiles: Array<string> = [
  'out/sampleResponse.json',
]

importFiles.forEach((file: string) => {
  const arcalastBbsAction: any = new ArcalastKamigeBbs()
  const comments: Array<CommentJsonObject> = getCommentsFromJsonFile(file)

  arcalastBbsAction.writeCommentsToDatabase(comments)
})
