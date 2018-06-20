<template>
  <v-app>
    <v-navigation-drawer
      permanent
      right
      app
      hide-overlay
      v-model="miniVariant"
      dark
    >
      <v-list two-line @click="miniVariant = !miniVariant">
        <v-list-tile v-for="item in items" :key="item.id">
          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.value }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="grey darken-3" fixed app>
      <v-toolbar-title v-text="title" class="white--text"></v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn class="white--text" icon v-if="miniVariant === false" @click.stop="miniVariant = !miniVariant">
          <v-icon>chevron_right</v-icon>
        </v-btn>
        <v-btn class="white--text" icon v-if="miniVariant === true" @click.stop="miniVariant = !miniVariant">
          <v-icon>chevron_left</v-icon>
        </v-btn>
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl text-xs-center>
        <v-slide-y-transition mode="out-in">
          <v-layout row wrap>
            <v-flex xs8 offset-xs2 class="pb-4">
              <span class="headline mb-3">{{ noticiaAtual.Titulo ? noticiaAtual.Titulo : noticiaAtual.TituloOriginal}}</span><br />
              <span class="body-2 mb-3">{{ noticiaAtual.NomeFonte }}</span><span class="body-2" v-if="noticiaAtual.NomeProgramaSecao">{{ ` | ${noticiaAtual.NomeProgramaSecao}` }}</span><br />
              <span class="body-2 mb-3">{{ dataVeiculacao }}</span>
            </v-flex>
            <!-- midia web -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1">
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'white': 'secondary'" class="px-4" value="1">Leitura</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'white': 'secondary'" class="px-4" value="2">Screenshot</v-btn>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 1">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="justify">
                  <span v-html="noticiaAtual.Conteudo" class="mx-4 px-4 subheading"></span>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <img pre-load :src="noticiaAtual.screenshot" />
                </div>
              </v-card>
            </v-flex>
            <!-- /midia web --> 
            <!-- midia impresso -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 2">
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'white': 'secondary'" class="px-4" value="1">Matéria</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'white': 'secondary'" class="px-4" value="2">Páginas</v-btn>
              <v-btn @click="abaAtual = 3" :color="abaAtual === 3 ? 'white': 'secondary'" class="px-4" value="3">Capa</v-btn>
              <v-btn @click="abaAtual = 4" :color="abaAtual === 4 ? 'white': 'secondary'" class="px-4" value="4">Texto</v-btn>
            </v-flex>
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
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 3">
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
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 4">
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
  import moment from 'moment'
  moment.locale('pt-BR')
  export default {
    data () {
      return {
        items: [
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
    computed: {
      dataVeiculacao () {
        return moment(this.noticiaAtual.DataHora).format("dddd, D MMMM YYYY, h:mm a")
      }
    },
    mounted () {
      const vm = this
      helpers.init(vm)
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
