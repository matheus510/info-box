<template>
  <v-app>
    <i-toolbar :noticiaAtual="noticiaAtual" :parametros="parametros"></i-toolbar>
    <i-sideinfo :infos="infos"></i-sideinfo>
    <i-bookview v-if="parametros.idBook" :noticiaAtual="noticiaAtual" :parametros="parametros" :abaAtual="abaAtual"></i-bookview>
    <i-singleview v-if="!parametros.idBook" :noticiaAtual="noticiaAtual" :parametros="parametros" :abaAtual="abaAtual"></i-singleview>
    <v-footer class="grey darken-3" app>
      <v-layout row wrap justify-center>
        <v-flex xs12 py-3 text-xs-center white--text>
          &copy;2018 — <strong>Boxnet</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import helpers from '../helpers/'
import ISingleview from './ISingleview.vue'
import IBookview from './IBookview.vue'
import IToolbar from './IToolbar.vue'
import ISideinfo from './ISideinfo.vue'

export default {
  data () {
    return {
      infos: [
        { icon: 'library_books', title: 'Visualizações', value: '12'},
        { icon: 'calendar_today', title: 'Publicação', value: ''},
        { icon: 'assessment', title: 'Audiência', value: 'Valor não disponível'},
        { icon: 'attach_money', title: 'Valoração', value: 'Valor não disponível'},
        { icon: 'format_shapes', title: 'Exposição', value: 'Exposição não disponível'}
      ],
      miniVariant: false,
      title: 'BoxView',
      urlToken: '',
      stringParametros: '',
      arrayParametros: [],
      parametros: {},
      noticiaAtual: {},
      abaAtual: 1
    }
  },
  mounted () {
    const vm = this
    helpers.init(vm)
    helpers.eventBus.$on('abaUpdate', (payload) => {
      this.abaAtual = payload
    })
    helpers.eventBus.$on('grifosAtualizados', () => {
      this.noticiaAtual.Conteudo = helpers.highlight(this.noticiaAtual.Conteudo, this.parametros.grifos)
    })
  },
  components: {
    ISingleview,
    IBookview,
    IToolbar,
    ISideinfo,
  }
}
</script>

<style>

</style>
