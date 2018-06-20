import services from '../services/'
import moment from 'moment'
moment.locale('pt-BR')

export default function mapOpcoes (vm) {
  const opcoes = vm.parametros.opcoes
  const barraInformacoes = [
    { id: 1, icon: 'library_books', title: 'Visualizações', value: ''},
    { id: 2, icon: 'calendar_today', title: 'Publicação', value: moment(vm.noticiaAtual.DataHora).format("DD/MM/YYYY")},
  ]
  console.log(opcoes)
  if(opcoes['OpcaoExposicaoMesa'] && opcoes['OpcaoCentimetragemVisualizacaoBook']) {
    Promise.resolve(services.common.getExposicao(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, vm.noticiaAtual.IdMidia, vm.parametros.opcoes['centimetragemWeb']))
      .then((data) => {
        vm.noticiaAtual.exposicao = data

        const caracteresCortados = vm.noticiaAtual.IdMidia === 1 ? 33 : vm.noticiaAtual.IdMidia === 2 ? 10 : 14
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
  return barraInformacoes
}
