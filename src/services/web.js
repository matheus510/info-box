import { axiosInstance } from './axiosInstance'

function getScreenshot (idNoticia) {
  axiosInstance.get(`Screenshot/Get?idNoticia=${idNoticia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      console.log("Erro ao carregar screenshot")
    })
}

export default {
  getScreenshot
}