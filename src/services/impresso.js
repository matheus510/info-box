import { axiosInstance } from './axiosInstance'

function getRecortes (idNoticia, idProduto) {
  return axiosInstance.get(`RecorteSvg/ComGrifoNoSql?idNoticia=${idNoticia}&idProduto=${idProduto}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar recortes')
      console.log(error)
    })
}
function getPaginas (idNoticia) {
  return axiosInstance.get(`pagina/PaginasByIdNoticia/${idNoticia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar recortes')
      console.log(error)
    })
}
function getCapa (idNoticia) {
  return axiosInstance.get(`pagina/capa/${idNoticia}`)
    .then(function (response) {
      return axiosInstance.get(`pagina/PaginaById/${response.data}`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log('Erro ao carregar capa (por id da pagina)')
        console.log(error)
      })
    })
    .catch(function (error) {
      console.log('Erro ao carregar id da capa')
      console.log(error)
    })
}
function getIdsPaginas (idNoticia) {
  return axiosInstance.get(`Impressos/GetIdsPaginasByIdNoticia?idNoticia=${idNoticia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar recortes')
      console.log(error)
    })
}

function getPaginaComRecortes (pagina) {
  let paramNomes = Object.keys(pagina)
  let paramValores = Object.values(pagina)
  return axiosInstance.get(`Impressos/GetPaginaComRecortes/?${paramNomes[0]}=${paramValores[0]}&${paramNomes[1]}=${paramValores[1]}&${paramNomes[2]}=${paramValores[2]}&${paramNomes[3]}=${paramValores[3]}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar recortes')
      console.log(error)
    })
}


export default {
  getRecortes,
  getPaginas,
  getCapa,
  getIdsPaginas,
  getPaginaComRecortes
}