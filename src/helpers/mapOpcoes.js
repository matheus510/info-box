import services from '../services/'
import moment from 'moment'
import eventBus from '../helpers/eventBus'
moment.locale('pt-BR')

export default function mapOpcoes (vm) {
  const opcoes = vm.parametros.opcoes
  const idsOpcoesEspeciais = opcoes.Opcoes.map(opcao => opcao.Id)
  const barraInformacoes = [
    { id: 1, icon: 'library_books', title: 'Visualizações', value: ''},
    { id: 2, icon: 'calendar_today', title: 'Publicação', value: moment(vm.noticiaAtual.DataHora).format("DD/MM/YYYY")}
  ]
  if(opcoes['OpcaoExposicaoMesa'] && opcoes['OpcaoCentimetragemVisualizacaoBook']) {
    Promise.resolve(services.common.getExposicao(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, vm.noticiaAtual.IdMidia, vm.parametros.opcoes['centimetragemWeb']))
      .then((data) => {
        vm.noticiaAtual.exposicao = data

        const caracteresCortados = vm.noticiaAtual.IdMidia === 1 ? 33 : vm.noticiaAtual.IdMidia === 2 ? 14 : 10
        const formattedExposicao = vm.noticiaAtual.exposicao ? vm.noticiaAtual.exposicao.Exposicao.substring(caracteresCortados, vm.noticiaAtual.exposicao.Exposicao.length) : null
        const formattedExposicaoLabel = vm.noticiaAtual.IdMidia === 1 ? 'Caracteres' : vm.noticiaAtual.IdMidia === 2 ? 'Centimetragem' : 'Duração'
        if(formattedExposicao) {
          barraInformacoes.push({ id: 3, icon: 'format_shapes',title: formattedExposicaoLabel,value: formattedExposicao})
        }
      })
  }
  if(opcoes['OpcaoExposicaoPorCanal'] && opcoes['OpcaoCentimetragemVisualizacaoBook']) {
    Promise.resolve(services.common.getExposicaoCanal(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, vm.noticiaAtual.IdMidia))
      .then((data) => {
        vm.noticiaAtual.exposicaoPorCanal = data
        if(data.length !== 0) {
          barraInformacoes.push({ id: 4, icon:'assignment',title: vm.noticiaAtual.IdMidia === 1 ? 'Caracteres' : vm.noticiaAtual.IdMidia === 2 ? 'Centimetragem' : 'Exposição' ,value:''})
        }
      })
  }
  if(opcoes['OpcaoTiragemVisualizacaoBook']) {
    Promise.resolve(services.common.getTiragem(vm.parametros.idNoticia))
      .then((data) => {
        vm.noticiaAtual.tiragem = data
        barraInformacoes.push({ id: 5, icon:'file_copy',title: 'Tiragem' ,value: vm.noticiaAtual.tiragem})
      })
  }
  if(opcoes['OpcaoValoracaoVisualizacaoBook']) {
    Promise.resolve(services.common.getValoracao(vm.parametros.idProdutoMvc, vm.parametros.idNoticia))
    .then((data) => {
      vm.noticiaAtual.valoracao = data
      vm.noticiaAtual.valoracao.map((valoracao, index) => {
        barraInformacoes.push({ id: (index + 5), icon:'attach_money',title: `Valoração - ${valoracao["Nome"]}`,value: valoracao["Valoracao"] || '0,00'})
      })
    })
  }
  
  const botoes = [
    { 
      id: 1,
      valor: 1,
      click: function () {
        eventBus.$emit('abaUpdate', this.valor)
      },
      texto: 'Matéria'
    },
    { 
      id: 2,
      valor: 2,
      click: function () {
        eventBus.$emit('abaUpdate', this.valor)
      },
      texto: 'Páginas'
    },
    { 
      id: 3,
      valor: 3,
      click: function () {
        eventBus.$emit('abaUpdate', this.valor)
      },
      texto: 'Capa'
    },
    { 
      id: 4,
      valor: 4,
      click: function () {
        eventBus.$emit('abaUpdate', this.valor)
      },
      texto: 'Texto'
    },
    { 
      id: 5,
      valor: 5,
      click: function () {
        eventBus.$emit('abaUpdate', this.valor)
      },
      texto: 'Leitura'
    },
    { 
      id: 6,
      valor: 6,
      click: function () {
        eventBus.$emit('abaUpdate', this.valor)
      },
      texto: 'Screenshot'
    }
  ]
  
  const botoesMapeados = botoes.filter(botao => {
    if (vm.noticiaAtual.IdMidia === 2) {
      if ((botao.id === 1 && idsOpcoesEspeciais.indexOf(101) === -1)||(botao.id ===  2 && idsOpcoesEspeciais.indexOf(100) === -1)||(botao.id ===  3 && idsOpcoesEspeciais.indexOf(99) === -1)||(botao.id ===  4 && idsOpcoesEspeciais.indexOf(98) === -1)) {
        return botao
      }
    }
    if (vm.noticiaAtual.IdMidia === 1) {
      if (botao.id === 5 || botao.id === 6) {
        return botao
      }
    }
    if ((vm.noticiaAtual.IdMidia === 3 || vm.noticiaAtual.IdMidia === 4)) {
      if ((botao.id === 5 && idsOpcoesEspeciais.indexOf(102) === -1)) {
        return botao
      }
    }
  })
  return {
    barraInformacoes,
    botoesMapeados,
    idsOpcoesEspeciais
  }
}
