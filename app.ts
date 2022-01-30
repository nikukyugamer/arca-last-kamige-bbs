import axios, { AxiosResponse, AxiosError } from 'axios'

const baseUrl: string = 'https://vg-gamemedia-kamigame-enquete.appspot.com/comment/list?path=%2Farcalast%2F%25E6%258E%25B2%25E7%25A4%25BA%25E6%259D%25BF.html&no_pager='

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

const firstGet: any = async () => {
  return axios.get(`${baseUrl}`)
    .then((response: AxiosResponse) => {
      console.log('初期データを取得')

      return response.data
    })
    .catch((error: AxiosError) => {
      console.log(error)
    })
    .then((responseData: ResponseData) => {
      console.log('axios done')
      console.log(`cursor: ${responseData.cursor}`)

      return responseData
    })
}

// const secondGet = async (cursor: string | null) => {
//   return axios.get(`${baseUrl}false&cursor=${cursor}`)
//     .then((response: AxiosResponse) => {
//       return response.data.cursor
//     })
//     .catch((error: AxiosError) => {
//       console.log(error)
//     })
//     .then((cursor: string) => {
//       return cursor
//     })
// }

const allGet: any = async () => {
  const responseData: ResponseData = await firstGet()

  console.log('========== 1st comment ==========')
  console.log(responseData.comments[0])
  console.log('========== 1st cursor ==========')
  console.log(responseData.cursor)

  // const secondCursor = await secondGet(cursor)
  // console.log(secondCursor)

  // firstGet().then(value => {
  //   console.log(value)
  // })
  // const hoge = await firstGet()
  // firstGet().then(secondGet)
}

// firstGet()
allGet()
