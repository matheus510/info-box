import services from '../services/'
import helpers from '../helpers/'
import eventBus from '../helpers/eventBus'

export default function init (vm) {
  getParametrosMvc(vm).then(() => {
    loadPropriedadesMvc(vm)
    loadIdNoticiasBook(vm)
    loadNoticia(vm)
  })
}

function getParametrosMvc (vm) {
  vm.urlToken = window.location.href.split('=')[1]
  
  return Promise.resolve(services.common.descriptografar(vm.urlToken)).then((data) => {
    vm.stringParametros = data
    const expressao = new RegExp('([^=&?]+)=([^&]+)', 'g')
    vm.arrayParametros = vm.stringParametros.match(expressao)
    vm.arrayParametros.map((parametro) => {
      let nome = parametro.substr(0, parametro.indexOf('='))
      vm.parametros[nome] = parametro.substr(parametro.indexOf('=') + 1, parametro.length)
    })
  })
}
function loadPropriedadesMvc (vm) {
  return Promise.resolve(services.common.getPropriedadesMvc(vm.parametros.idProdutoMvc))
    .then((data) => {
      vm.parametros.idProduto = data.IdProduto
      vm.parametros.propriedadesMvc = data
      Promise.resolve(services.common.getDadosVisualizacao(vm.parametros.idNoticia, vm.parametros.idProdutoMvc, vm.parametros.idProduto))
        .then((data) => {
      let dados = data          
      return setTimeout(function () {
        vm.parametros.grifos = dados.grifos
        vm.parametros.fontesRestritas = dados.fontesRestritas
        vm.parametros.noticiasSimilares = dados.noticiasSimilares
        vm.parametros.opcoes = dados.opcoes
        const info = helpers.mapOpcoes(vm)
        vm.infos = info.barraInformacoes
        vm.parametros.botoes = info.botoesMapeados
        vm.parametros.idsOpcoesEspeciais = info.idsOpcoesEspeciais
        eventBus.$emit('parametrosAtualizados', vm)
        if (vm.parametros.grifos && vm.noticiaAtual.Conteudo && (vm.noticiaAtual.IdMidia && vm.noticiaAtual.IdMidia !== 3 && vm.noticiaAtual.IdMidia !== 4)) {
          eventBus.$emit('grifosUpdate')
        }
        }, 2000, vm, dados)
      })
    })
}
function loadIdNoticiasBook (vm) {
  if (vm.parametros.idBook) {
    Promise.resolve(services.common.getIdNoticiasBook(vm.parametros.idBook))
      .then((data) => {
        vm.parametros.idNoticiasBook = data
      })
  }
}
function loadImpresso(vm) {
  vm.parametros.listaPaginasRecorte = []
  vm.parametros.listaIdsPaginas = []

  Promise.resolve(services.impresso.getIdsPaginas(vm.parametros.idNoticia)
    .then((response) => {
      vm.parametros.listaIdsPaginas = response.Paginas
      vm.parametros.listaIdsPaginas.map((pagina, index) => {
        Promise.resolve(services.impresso.getPaginaComRecortes(pagina)
          .then((response) => {
            vm.parametros.listaPaginasRecorte.push(response)
            vm.$forceUpdate()
          }), vm)
      })
      Promise.resolve(services.impresso.getCapa(vm.parametros.idNoticia)
        .then((data) => {
          vm.noticiaAtual.capa = data
          vm.$forceUpdate()
        }), vm)
    })
  , vm)
}
function loadWeb (vm) {

  Promise.resolve(services.web.getScreenshot(vm.parametros.idNoticia).then((response) => {
      vm.noticiaAtual.screenshot = response
      vm.$forceUpdate()
    }), vm)
}
function loadNoticia (vm) {
  Promise.resolve(services.common.getNoticia(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, false))
    .then((data) => {
      vm.noticiaAtual = data
      eventBus.$emit('noticiaAtualDefinida', vm)

      if (vm.noticiaAtual.IdMidia === 1) {
        loadWeb(vm)
      }
      if (vm.noticiaAtual.IdMidia === 2) {
        loadImpresso(vm)
      }
      if (vm.noticiaAtual.IdMidia === 3) {
        vm.noticiaAtual.audioSrc = `https://cloud.boxnet.com.br${vm.noticiaAtual.Anexos[0].Url}`
      }
      if (vm.noticiaAtual.IdMidia === 4) {
        vm.noticiaAtual.videoSrc = `https://cloud.boxnet.com.br${vm.noticiaAtual.Anexos[0].Url}`
      }
    })
}