import fs from 'fs'

type ResponseData = {
  comments: Array<{
    id: string
    nickname: string
    body: string
    image_url: string
    comment_no: number
    good_vote: number
    bad_vote: number
    created_at: string
  }>
  cursor: string
}

type CommentObject = {
  id: string
  nickname: string
  body: string
  image_url: string
  comment_no: number
  good_vote: number
  bad_vote: number
  created_at: string
}

const messagesJson: ResponseData = JSON.parse(fs.readFileSync('out/sampleResponse.json', 'utf8'));

for (const key in messagesJson) {
  if (key !== 'comments') { continue }

  const comments: Array<any> = messagesJson[key]
  comments.forEach((comment: CommentObject) => {
    console.log(comment.body)
  })
}
