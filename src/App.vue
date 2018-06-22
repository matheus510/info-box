<template>
  <v-app>
    <i-sideinfo :infos="infos"></i-sideinfo>
    <i-toolbar :noticiaAtual="noticiaAtual" :parametros="parametros"></i-toolbar>
    <v-content>
      <v-container grid-list-xl text-xs-center>
        <v-slide-y-transition mode="out-in">
          <v-layout row wrap>
            <i-headline :noticiaAtual="noticiaAtual" :parametros="parametros"></i-headline>
            <!-- midia web -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 5">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="justify">
                  <span v-html="noticiaAtual.Conteudo" class="mx-4 px-4 subheading"></span>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 6">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <img pre-load :src="noticiaAtual.screenshot" />
                </div>
              </v-card>
            </v-flex>
            <!-- /midia web --> 
            <!-- midia impresso -->
            <v-flex xs8 offset-xs2 v-if="abaAtual === 1 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <div v-for="imagem in parametros.listaPaginasRecorte" :key="imagem.Url">
                    <img pre-load v-for="recorte in imagem.Recortes" :src="recorte.Url" :key="recorte.Url" />
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 2 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <img pre-load v-for="imagem in parametros.listaPaginasRecorte" :src="imagem.Url" :key="imagem.Url" />
                </div>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 3 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <img pre-load :src="noticiaAtual.capa.Url"/>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 4 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3 justify">
                  <span v-html="noticiaAtual.Conteudo" class="mx-4 px-4 subheading"></span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia impresso -->
            <!-- midia radio -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 3">
              <audio controls>
                <source :src="noticiaAtual.audioSrc" type="audio/mp3">
              </audio>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="(noticiaAtual.IdMidia === 3) && !parametros.idsOpcoesEspeciais.indexOf(102)">
              <v-card-title>
                <span class="headline">Transcrição</span><br/>
              </v-card-title>
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3">
                  <span v-html="noticiaAtual.Conteudo" class="subheading"></span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia radio -->
            <!-- midia tv -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 4">
              <video controls width="320" height="240" style="background: #000;">
                <source :src="noticiaAtual.videoSrc"
                        type="video/mp4">
                O seu navegador não suporta o elemento <code>video</code> do HTML5.
              </video>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="parametros.idsOpcoesEspeciais && (noticiaAtual.IdMidia === 4) && (parametros.idsOpcoesEspeciais.indexOf(102) === -1)">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-title>
                <span class="headline">Transcrição</span><br/>
                </v-card-title>
                <v-card-text class="py-3">
                  <span v-html="noticiaAtual.Conteudo" class="subheading"></span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia tv -->
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
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
  import helpers from './helpers/'
  import IToolbar from './components/IToolbar.vue'
  import ISideinfo from './components/ISideinfo.vue'
  import IHeadline from './components/IHeadline.vue'
  
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
      helpers.eventBus.$on('grifosUpdate', () => {
        helpers.highlight(this.noticiaAtual.Conteudo, this.parametros.grifos)
      })
      if (this.parametros.grifos && this.noticiaAtual.Conteudo && (this.noticiaAtual.IdMidia && this.noticiaAtual.IdMidia !== 3 && this.noticiaAtual.IdMidia !== 4)) {
        this.noticiaAtual.Conteudo = helpers.highlight(this.noticiaAtual.Conteudo, this.parametros.grifos)
      }
    },
    components: {
      IToolbar,
      ISideinfo,
      IHeadline
    }
  }
</script>
<style>
.viewer img{
  width: 100%;
  height: 100%;
}
mark {
  background-color: #ffff00;
  padding: 0;
}
</style>
