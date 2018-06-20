import services from '../services/'
import helpers from '../helpers/'

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
      let vmScope = vm
      let dados = data          
      return setTimeout(function () {
        vmScope.parametros.grifos = dados.grifos
        vmScope.parametros.fontesRestritas = dados.fontesRestritas
        vmScope.parametros.noticiasSimilares = dados.noticiasSimilares
        vmScope.parametros.opcoes = dados.opcoes
        vmScope.items = helpers.mapOpcoes(vm)
        if (vmScope.parametros.grifos && vmScope.noticiaAtual.Conteudo && (vmScope.noticiaAtual.IdMidia && vmScope.noticiaAtual.IdMidia !== 3 && vmScope.noticiaAtual.IdMidia !== 4)) {
          vmScope.noticiaAtual.Conteudo = helpers.highlight(vmScope.noticiaAtual.Conteudo, vmScope.parametros.grifos)
        }
        }, 2000, vmScope, dados)
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
  const vmScope = vm
  Promise.resolve(services.impresso.getIdsPaginas(vm.parametros.idNoticia)
    .then((response) => {
      vmScope.parametros.listaIdsPaginas = response.Paginas
      vmScope.parametros.listaIdsPaginas.map((pagina, index) => {
        Promise.resolve(services.impresso.getPaginaComRecortes(pagina)
          .then((response) => {
            vmScope.parametros.listaPaginasRecorte.push(response)
            vmScope.$forceUpdate()
          }), vmScope)
      })
      Promise.resolve(services.impresso.getCapa(vmScope.parametros.idNoticia)
        .then((data) => {
          vmScope.noticiaAtual.capa = data
          vmScope.$forceUpdate()
        }), vmScope)
    })
  , vmScope)
}
function loadWeb (vm) {
  const vmScope = vm
  Promise.resolve(services.web.getScreenshot(vm.parametros.idNoticia).then((response) => {
      vmScope.noticiaAtual.screenshot = response
      vmScope.$forceUpdate()
    }), vmScope)
}
function loadNoticia (vm) {
  Promise.resolve(services.common.getNoticia(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, false))
    .then((data) => {
      vm.noticiaAtual = data
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