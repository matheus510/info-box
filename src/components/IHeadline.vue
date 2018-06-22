<template>
  <v-flex xs8 offset-xs2 class="pb-4">
    <span class="headline mb-3">{{ noticiaAtual.Titulo ? noticiaAtual.Titulo : noticiaAtual.TituloOriginal}}</span><br />
    <span class="body-2 mb-3">{{ noticiaAtual.NomeFonte }}</span><span class="body-2" v-if="noticiaAtual.NomeProgramaSecao">{{ ` | ${noticiaAtual.NomeProgramaSecao}` }}</span><br />
    <span class="body-2 mb-3">{{ dataVeiculacao }}</span><br />
    <v-btn v-for="botao in parametros.botoes" :class="abaAtual === botao.valor ? 'white' : 'secondary'" :key="botao.texto" @click="botao.click(botao)" class="px-4" :value="botao.valor">{{ botao.texto }}</v-btn>
  </v-flex>
</template>

<script>
import moment from 'moment'
import eventBus from '../helpers/eventBus'
moment.locale('pt-BR')

export default {
  props: ['noticiaAtual', 'parametros', 'abaAtual'],
  computed: {
    dataVeiculacao () {
      return moment(this.noticiaAtual.DataHora).format("dddd, D MMMM YYYY, h:mm a")
    }
  },
  created () {
    eventBus.$on('parametrosAtualizados', (vm) => vm.$forceUpdate)
  }
}
</script>

<style>

</style>
