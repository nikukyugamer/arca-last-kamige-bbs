import axios, { AxiosResponse, AxiosError } from 'axios'

const baseUrl = 'https://vg-gamemedia-kamigame-enquete.appspot.com/comment/list?path=%2Farcalast%2F%25E6%258E%25B2%25E7%25A4%25BA%25E6%259D%25BF.html&no_pager='

const firstGet = async () => {
  axios.get(`${baseUrl}`)
    .then(function (response: AxiosResponse) {
      console.log('初期データを取得')
      console.log(response.data)
    })
    .catch(function (error: AxiosError) {
      console.log(error)
    })
    .then(function () {
      console.log('axios done')
    })
}

firstGet()
