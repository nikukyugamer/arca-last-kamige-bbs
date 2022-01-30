import axios, { AxiosResponse, AxiosError } from 'axios'

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

const apiResponseData: any = async (cursor: string | null) => {
  let requestUrl = 'https://vg-gamemedia-kamigame-enquete.appspot.com/comment/list?path=%2Farcalast%2F%25E6%258E%25B2%25E7%25A4%25BA%25E6%259D%25BF.html&no_pager='

  if (cursor !== null) {
    requestUrl = `${requestUrl}false&cursor=${cursor}`
  }

  return axios.get(requestUrl)
    .then((response: AxiosResponse) => {
      return response.data
    })
    .catch((error: AxiosError) => {
      console.log(error)
    })
    .then((responseData: ResponseData) => {
      return responseData
    })
}

const allGet: any = async () => {
  const responseData: ResponseData = await apiResponseData(null)

  console.log('========== 1st comment ==========')
  console.log(responseData.comments[0])

  let latestCursor = responseData.cursor

  for (let i = 2; i < 5; i++) {
    const latestResponseData = await apiResponseData(latestCursor)

    console.log(`========== ${i}th comment ==========`)
    console.log(latestResponseData.comments[0])

    latestCursor = latestResponseData.cursor
  }
}

// created_at は例えば Ruby だと Time.parse(t += 'JST') で Timeクラス として取得できる
allGet()
