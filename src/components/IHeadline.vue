<template>
  <v-flex xs8 offset-xs2 class="pb-4">
    <span class="headline mb-3">{{ noticiaAtual.Titulo ? noticiaAtual.Titulo : noticiaAtual.TituloOriginal}}</span><br />
    <span class="body-2 mb-3">{{ noticiaAtual.NomeFonte }}</span><span class="body-2" v-if="noticiaAtual.NomeProgramaSecao">{{ ` | ${noticiaAtual.NomeProgramaSecao}` }}</span><br />
    <span class="body-2 mb-3">{{ dataVeiculacao }}</span><br />
    <v-btn v-for="botao in parametros.botoes" :class="abaAtual === botao.valor ? 'white': 'secondary'" :key="botao.texto" @click="botao.click(botao)" class="px-4" :value="botao.valor">{{ botao.texto }}</v-btn>
  </v-flex>
</template>

<script>
import moment from 'moment'
moment.locale('pt-BR')

export default {
  props: ['noticiaAtual', 'parametros'],
  computed: {
    dataVeiculacao () {
      return moment(this.noticiaAtual.DataHora).format("dddd, D MMMM YYYY, h:mm a")
    }
  }
}
</script>

<style>

</style>
