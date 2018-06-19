<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      permanent
      right
      app
      hide-overlay
      
      v-model="miniVariant"
    >
      <v-list two-line @click="miniVariant = !miniVariant">
        <v-list-tile v-for="item in items" :key="item.title">
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
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon v-if="miniVariant === false" @click.stop="miniVariant = !miniVariant">
          <v-icon>chevron_right</v-icon>
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
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'primary': 'secondary'" class="px-4" value="1">Leitura</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'primary': 'secondary'" class="px-4" value="2">Screenshot</v-btn>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 1">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3 justify">
                  <span v-html="noticiaAtual.Conteudo" class="mx-4 px-4 subheading"></span>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <img :src="noticiaAtual.screenshot" />
                </div>
              </v-card>
            </v-flex>
            <!-- /midia web --> 
            <!-- midia impresso -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 2">
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'primary': 'secondary'" class="px-4" value="1">Matéria</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'primary': 'secondary'" class="px-4" value="2">Páginas</v-btn>
              <v-btn @click="abaAtual = 3" :color="abaAtual === 3 ? 'primary': 'secondary'" class="px-4" value="3">Capa</v-btn>
              <v-btn @click="abaAtual = 4" :color="abaAtual === 4 ? 'primary': 'secondary'" class="px-4" value="4">Texto</v-btn>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 1 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <div v-for="imagem in parametros.listaPaginasRecorte" :key="imagem.Url">
                    <img v-for="recorte in imagem.Recortes" :src="recorte.Url" :key="recorte.Url" />
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 2 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <img v-for="imagem in parametros.listaPaginasRecorte" :src="imagem.Url" :key="imagem.Url" />
                </div>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 3 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <div class="viewer" v-viewer>
                  <img :src="noticiaAtual.capa.Url"/>
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
              <v-card class="py-3 px-4 text-xs-left">
                <span class="headline">Transcrição</span><br/>
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
                <v-card-text class="py-3">
                  <span class="py-4 headline">Transcrição</span><br/>
                  <span v-html="noticiaAtual.Conteudo" class="subheading"></span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia tv -->
          </v-layout>
        </v-slide-y-transition>
      </v-container>
      <canvas id="canvas"></canvas>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import services from './services/'
  import helpers from './helpers/'
  import moment from 'moment'
  moment.locale('pt-BR')
  export default {
    data () {
      return {
        items: [
          { icon: 'library_books', title: 'Visualizações', value: '12'},
          { icon: 'calendar_today', title: 'Publicação', value: 0},
          { icon: 'attach_money', title: 'Valor', value: '24.227,53'},
          { icon: 'format_shapes', title: 'Centimetragem', value: '24.11'},
          { icon: 'assessment', title: 'Audiência da matéria', value: '108'}
        ],
        miniVariant: true,
        title: 'info-view',
        urlToken: '',
        stringParametros: '',
        arrayParametros: [],
        parametros: {},
        noticiaAtual: {},
        abaAtual: 1,
        loading: true
      }
    },
    computed: {
      dataVeiculacao () {
        return moment(this.noticiaAtual.DataHora).format("dddd, D MMMM YYYY, h:mm:ss a")
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
  height: auto;
}
mark {
  background-color: #ffff00;
  padding: 0;
}
</style>
