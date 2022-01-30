import axios, { AxiosResponse, AxiosError } from 'axios'

const baseUrl: string = 'https://vg-gamemedia-kamigame-enquete.appspot.com/comment/list?path=%2Farcalast%2F%25E6%258E%25B2%25E7%25A4%25BA%25E6%259D%25BF.html&no_pager='

const firstGet: any = async () => {
  return axios.get(`${baseUrl}`)
    .then((response: AxiosResponse) => {
      console.log('初期データを取得')

      return response.data.cursor
    })
    .catch((error: AxiosError) => {
      console.log(error)
    })
    .then((cursor: string) => {
      console.log('axios done')
      console.log(`cursor: ${cursor}`)

      return cursor
    })
}

const secondGet = async (cursor: string | null) => {
  axios.get(`${baseUrl}${cursor}`)
    .then((response: AxiosResponse) => {
      return response.data.cursor
    })
    .catch((error: AxiosError) => {
      console.log(error)
    })
    .then((cursor: string) => {
      return cursor
    })
}

const allGet: any = async () => {
  const cursor: string = await firstGet()
  console.log(cursor)

  const secondCursor = await secondGet(cursor)
  console.log(secondCursor)

  // firstGet().then(value => {
  //   console.log(value)
  // })
  // const hoge = await firstGet()
  // firstGet().then(secondGet)
}

// firstGet()
allGet()
