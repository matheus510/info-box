import services from '../services/'
import helpers from '../helpers/'

export default async function init (vm) {
  getParametrosMvc(vm).then(() => {
    loadIdNoticiasBook(vm)
    loadNoticia(vm).then((data) => vm.noticiaAtual = data)
    loadPropriedadesMvc(vm).then((dadosVisualizacao) => {
      vm.parametros.grifos = dadosVisualizacao.grifos
      vm.parametros.fontesRestritas = dadosVisualizacao.fontesRestritas
      vm.parametros.noticiasSimilares = dadosVisualizacao.noticiasSimilares
      vm.parametros.opcoes = dadosVisualizacao.opcoes

      helpers.eventBus.$emit('grifosAtualizados')

      helpers.mapOpcoes(vm).then((info) => {
        vm.infos = info.barraInformacoes
        vm.parametros.botoes = info.botoesMapeados
        vm.parametros.idsOpcoesEspeciais = info.idsOpcoesEspeciais
        helpers.eventBus.$emit('initCompleto')
      })
    })
  })
}

async function getParametrosMvc (vm) {
  vm.urlToken = window.location.href.split('=')[1]
  const descriptografado = await services.common.descriptografar(vm.urlToken)
  vm.stringParametros = descriptografado
  const expressao = new RegExp('([^=&?]+)=([^&]+)', 'g')
  vm.arrayParametros = vm.stringParametros.match(expressao)
  vm.arrayParametros.map((parametro) => {
    let nome = parametro.substr(0, parametro.indexOf('='))
    vm.parametros[nome] = parametro.substr(parametro.indexOf('=') + 1, parametro.length)
  })
  //if (vm.parametros['IdBook'] || vm.parametros['idBook']) vm.
}
async function loadPropriedadesMvc (vm) {
  const propriedadesMvc = await services.common.getPropriedadesMvc(vm.parametros.idProdutoMvc)
  vm.parametros.idProduto = propriedadesMvc.IdProduto
  vm.parametros.propriedadesMvc = propriedadesMvc
  return await services.common.getDadosVisualizacao(vm.parametros.idNoticia, vm.parametros.idProdutoMvc, vm.parametros.idProduto)
}
function loadIdNoticiasBook (vm) {
  if (vm.parametros.idBook) {
    Promise.resolve(services.common.getIdNoticiasBook(vm.parametros.idBook))
      .then((data) => {
        vm.parametros.idNoticiasBook = data
      })
  }
}
async function loadImpresso(vm) {
  vm.parametros.listaPaginasRecorte = []
  vm.parametros.listaRecortes = []
  vm.parametros.listaRecortesURL = []
  vm.parametros.listaIdsPaginas = []

  vm.parametros.listaIdsPaginas = await services.impresso.getIdsPaginas(vm.parametros.idNoticia)
      
  vm.parametros.listaIdsPaginas.map((pagina) => {
    Promise.resolve(services.impresso.getPaginaComRecortes(pagina)
      .then((response) => {
        vm.parametros.listaPaginasRecorte.push(response)
        response.Recortes.map((recorte) => {
          vm.parametros.listaRecortes.push(recorte)
          let novoRecorte = {
            thumb: recorte.Url,
            src: recorte.Url,
          }
          vm.parametros.listaRecortesURL.push(novoRecorte)
          vm.$forceUpdate()
        })
        vm.$forceUpdate()
      }), vm)
  })
  Promise.resolve(services.impresso.getCapa(vm.parametros.idNoticia)
    .then((data) => {
      vm.noticiaAtual.capa = data
      vm.$forceUpdate()
    }), vm)
}
function loadWeb (vm) {

  Promise.resolve(services.web.getScreenshot(vm.parametros.idNoticia).then((response) => {
      vm.noticiaAtual.screenshot = response
      vm.$forceUpdate()
    }), vm)
}
function loadNoticia (vm) {
  return services.common.getNoticia(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, false).then((data) => {
    const noticiaAtual = data
    if (noticiaAtual.IdMidia === 1) {
      loadWeb(vm)
    }
    if (noticiaAtual.IdMidia === 2) {
      loadImpresso(vm)
    }
    if (noticiaAtual.IdMidia === 3) {
      noticiaAtual.audioSrc = `https://cloud.boxnet.com.br${noticiaAtual.Anexos[0].Url}`
    }
    if (noticiaAtual.IdMidia === 4) {
      noticiaAtual.videoSrc = `https://cloud.boxnet.com.br${noticiaAtual.Anexos[0].Url}`
    }
    return noticiaAtual
  })
}