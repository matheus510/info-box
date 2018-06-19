import services from '../services/'
import helpers from '../helpers/'
import moment from 'moment'
moment.locale('pt-BR')

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
        if (vmScope.parametros.grifos && vmScope.noticiaAtual.Conteudo && vmScope.noticiaAtual.idMidia !== 3 && vmScope.noticiaAtual.idMidia !== 4) {
          vmScope.noticiaAtual.Conteudo = helpers.highlight(vmScope.noticiaAtual.Conteudo, vmScope.parametros.grifos)
        }
        if (vmScope.parametros.opcoes['OpcaoExposicaoMesa'] && vmScope.parametros.opcoes['OpcaoCentimetragemVisualizacaoBook']) {
          Promise.resolve(services.common.getExposicao(vmScope.parametros.idProdutoMvc, vmScope.parametros.idNoticia, vmScope.noticiaAtual.IdMidia, vmScope.parametros.opcoes['centimetragemWeb']))
            .then((data) => {
              vmScope.noticiaAtual.exposicao = data
              vmScope.items[3].value = vmScope.noticiaAtual.exposicao.Exposicao.substring(14, vmScope.noticiaAtual.exposicao.Exposicao.length)
            })
      }
      if (vmScope.parametros.opcoes['OpcaoExposicaoPorCanal'] && vmScope.parametros.opcoes['OpcaoCentimetragemVisualizacaoBook']) {
          Promise.resolve(services.common.getExposicaoCanal(vmScope.parametros.idProdutoMvc, vmScope.parametros.idNoticia, vmScope.parametros.idMidia))
            .then((data) => {
              vmScope.noticiaAtual.exposicao = data
              vmScope.items[3].value = vmScope.noticiaAtual.exposicao.Exposicao.substring(14, vmScope.noticiaAtual.exposicao.Exposicao.length)
            })
      }
      if (vmScope.parametros.opcoes['OpcaoTiragemVisualizacaoBook']) {
          Promise.resolve(services.common.getTiragem(vmScope.parametros.idNoticia))
            .then((data) => {
              vmScope.noticiaAtual.tiragem = data
              vmScope.items[4].value = vmScope.noticiaAtual.tiragem
            })
      }
      if (vmScope.parametros.opcoes['OpcaoValoracaoVisualizacaoBook']) {
          Promise.resolve(services.common.getValoracao(vmScope.parametros.idProdutoMvc, vmScope.parametros.idNoticia))
            .then((data) => {
              vmScope.noticiaAtual.valoracao = data
              vmScope.items[2].value = vmScope.noticiaAtual.valoracao ? vmScope.noticiaAtual.valoracao : 'Informação não disponível' 
            })
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
      vm.items[1].value = moment(vm.noticiaAtual.DataHora).format("DD/MM/YYYY")
      vm.loading = false
      if (vm.noticiaAtual.IdMidia === 1) {
        loadWeb()
      }
      if (vm.noticiaAtual.IdMidia === 2) {
        loadImpresso()
      }
      if (vm.noticiaAtual.IdMidia === 3) {
        vm.noticiaAtual.audioSrc = `https://cloud.boxnet.com.br${vm.noticiaAtual.Anexos[0].Url}`
      }
      if (vm.noticiaAtual.IdMidia === 4) {
        vm.noticiaAtual.videoSrc = `https://cloud.boxnet.com.br${vm.noticiaAtual.Anexos[0].Url}`
      }
    })
}