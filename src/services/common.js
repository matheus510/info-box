import { axiosInstance } from './axiosInstance'

function descriptografar (txt) {
  return axiosInstance.get(`criptografia/descriptografar?texto=${txt}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao descriptografar')
      console.log(error)
    })
}

function criptografar (txt) {
  axiosInstance.get(`criptografia/criptografar?texto=${txt}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao criptografar')
      console.log(error)
    })
}

function getPropriedadesMvc (idProdutoMvc) {
  return axiosInstance.get(`ProdutoMvc/GetPropriedadesMvc?id=${idProdutoMvc}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar propriedades')
      console.log(error)
    })
}

function getDadosVisualizacao (idNoticia, idProdutoMvc, idProduto) {
  let dados = {}
  getGrifos(idNoticia, idProduto).then((data) => {
    dados.grifos = data
  })
  getFontesRestritas().then((data) => {
    dados.fontesRestritas = data
  })
  getNoticiasSimilares(idNoticia).then((data) => {
    dados.noticiasSimilares = data
  })
  getOpcoesCliente(idProdutoMvc).then((data) => {
    dados.opcoes = data
  })
  return dados
}

function getIdNoticiasBook (idBook) {
  return axiosInstance.get(`Book/GetIdsNoticias/${idBook}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar ids de noticias do book')
      console.log(error)
    })
}

function getNoticia (idProdutoMvc, idNoticia, tags) {
  return axiosInstance.get(`Noticia/Get?idNoticia=${idNoticia}&idProdutoMvc=${idProdutoMvc}&retornarTags=${tags}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar noticia')
      console.log(error)
    })
}

function getExposicao (idProdutoMvc, idNoticia, idMidia, centWeb) {
  return axiosInstance.get(`ProdutoMvcExposicao/GetExposicao?idProdutoMvc=${idProdutoMvc}&idNoticia=${idNoticia}&idMidia=${idMidia}&calculaCentimetragemTotal=${centWeb}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar exposição da noticia')
      console.log(error)
    })
}

function getExposicaoCanal (idProdutoMvc, idNoticia, idMidia) {
  return axiosInstance.get(`ProdutoSecaoNoticia/GetExposicoes?idProdutoMvc=${idProdutoMvc}&idNoticia=${idNoticia}&idMidia=${idMidia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar exposição por canal')
      console.log(error)
    })
}

function getTiragem (idNoticia) {
  return axiosInstance.get(`Tiragem/GetByIdNoticia?idNoticia=${idNoticia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar tiragem da notícia')
      console.log(error)
    })
}

function getValoracao (idProdutoMvc, idNoticia) {
  return axiosInstance.get(`Valoracao/Get?idProdutoMvc=${idProdutoMvc}idNoticia=${idNoticia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar valoração')
      console.log(error)
    })
}

function registraAcessoNoticia (email, idNoticia, bookVersao) {
  return axiosInstance.get(`BookRelatorioAcessoMateria/InserirRelatorioAcessomateriasBook?destinatario=${email}&idNoticia=${idNoticia}&idBookVersao=${bookVersao}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar noticia')
      console.log(error)
    })
}

//BEGIN_non-exportable 
function getGrifos (idNoticia, idProduto) {
  return axiosInstance.get(`grifo/GetPalavras?idProduto=${idProduto}&idNoticia=${idNoticia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar grifos')
      console.log(error)
    })
}
function getFontesRestritas () {
  return axiosInstance.get(`FonteRestricaoExibicao/CacheFontesRestritas/`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar fontes restritas')
      console.log(error)
    })
}
function getNoticiasSimilares (idNoticia) {
  return axiosInstance.get(`Noticia/GetNoticiasSimilares/${idNoticia}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar noticias similares')
      console.log(error)
    })
}
function getOpcoesCliente (idProdutoMvc) {
  return axiosInstance.get(`ProdutoMvc/GetOpcoesVisualizacao?idProdutoMvc=${idProdutoMvc}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log('Erro ao carregar as opções de visualização')
      console.log(error)
    })
}
//END_non-exportable

export default {
  descriptografar,
  criptografar,
  getPropriedadesMvc,
  getDadosVisualizacao,
  getIdNoticiasBook,
  getNoticia,
  getExposicao,
  getExposicaoCanal,
  getTiragem,
  getValoracao,
  registraAcessoNoticia
}