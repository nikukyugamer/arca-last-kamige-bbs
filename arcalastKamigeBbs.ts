import { getCommentsFromJsonFile } from './getComments'
import { createCommentRecord, isAlreadyExists } from './database'
import { saveResponseJsonFiles } from './saveResponseJsonFiles'

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
    createCommentRecord(comment)
  }

  async writeCommentsToDatabase(comments: Array<CommentJsonObject>) {
    for (let i = 0; i < comments.length; i++) {
      let comment: CommentJsonObject = comments[i]

      if (isAlreadyExists(comment)) {
        console.log(`ALREADY EXISTS "comment.id": ${comment.id}`)
      } else {
        this.writeCommentToDatabase(comment)
      }
    }
  }

  saveJsonFiles() {
    saveResponseJsonFiles()
  }
}

const arcalastBbsObject: any = new ArcalastKamigeBbs()

const importFiles: Array<string> = [
  'out/sampleResponse.json',
]

importFiles.forEach((file: string) => {
  const comments: Array<CommentJsonObject> = getCommentsFromJsonFile(file)

  arcalastBbsObject.writeCommentsToDatabase(comments)
})

// arcalastBbsObject.saveJsonFiles()
