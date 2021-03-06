import { axiosInstance } from './axiosInstance'

function getScreenshot (idNoticia) {
  return axiosInstance.get(`Screenshot/Get?idNoticia=${idNoticia}&reprocessar=false`)
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