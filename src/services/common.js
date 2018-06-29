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

async function getPropriedadesMvc (idProdutoMvc) {
  const propriedadesMvc = await axiosInstance.get(`ProdutoMvc/GetPropriedadesMvc?id=${idProdutoMvc}`)  
  return propriedadesMvc.data
}

async function getDadosVisualizacao (idNoticia, idProdutoMvc, idProduto) {
  return {
    grifos: await getGrifos(idNoticia, idProduto),
    fontesRestritas: await getFontesRestritas(),
    noticiasSimilares: await getNoticiasSimilares(idNoticia),
    opcoes: await getOpcoesCliente(idProdutoMvc)
  }
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
  return axiosInstance.get(`Valoracao/Get?idProdutoMvc=${idProdutoMvc}&idNoticia=${idNoticia}`)
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
async function getGrifos (idNoticia, idProduto) {
  let response = await axiosInstance.get(`grifo/GetPalavras?idProduto=${idProduto}&idNoticia=${idNoticia}`)
  return response.data
}
async function getFontesRestritas () {
  let response = await axiosInstance.get(`FonteRestricaoExibicao/CacheFontesRestritas/`)
  return response.data
}
async function getNoticiasSimilares (idNoticia) {
  let response = await axiosInstance.get(`Noticia/GetNoticiasSimilares/${idNoticia}`)
  return response.data
}
async function getOpcoesCliente (idProdutoMvc) {
  let response = await axiosInstance.get(`ProdutoMvc/GetOpcoesVisualizacao?idProdutoMvc=${idProdutoMvc}`)
  return response.data
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