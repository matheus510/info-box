<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      permanent
      right
      app
      hide-overlay
      @click="miniVariant = !miniVariant"
    >
      <!-- <v-list>
        <v-list-tile 
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->
      <v-list two-line>
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
              <v-btn @click="abaAtual = 3" :color="abaAtual === 3 ? 'primary': 'secondary'" class="px-4" value="3">Anexos</v-btn>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 1">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3 justify">
                  <span class="mx-4 px-4 subheading">{{ noticiaAtual.Conteudo }}</span>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 1 && abaAtual === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3 justify">
                  <span class="mx-4 px-4 subheading">{{ noticiaAtual.Conteudo }}</span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia web --> 
            <!-- midia impresso -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 2">
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'primary': 'secondary'" class="px-4" value="1">Matéria</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'primary': 'secondary'" class="px-4" value="2">Páginas</v-btn>
              <v-btn @click="abaAtual = 3" :color="abaAtual === 3 ? 'primary': 'secondary'" class="px-4" value="3">Capa</v-btn>
              <v-btn @click="abaAtual = 4" :color="abaAtual === 4 ? 'primary': 'secondary'" class="px-4" value="4">texto</v-btn>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 1 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <img class="img-limit" v-for="imagem in parametros.listaPaginasRecorte" :key="imagem[imagem.Url]" :src="imagem.Url" />
              </v-card>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 4 && noticiaAtual.IdMidia === 2">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3 justify">
                  <span class="mx-4 px-4 subheading">{{ noticiaAtual.Conteudo }}</span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia impresso -->
            <!-- midia radio -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 3">
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'primary': 'secondary'" class="px-4" value="1">Matéria</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'primary': 'secondary'" class="px-4" value="2">Páginas</v-btn>
              <v-btn @click="abaAtual = 3" :color="abaAtual === 3 ? 'primary': 'secondary'" class="px-4" value="3">Capa</v-btn>
              <v-btn @click="abaAtual = 4" :color="abaAtual === 4 ? 'primary': 'secondary'" class="px-4" value="4">texto</v-btn>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 4 && noticiaAtual.IdMidia === 3">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3 justify">
                  <span class="mx-4 px-4 subheading">{{ noticiaAtual.Conteudo }}</span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia radio -->
            <!-- midia tv -->
            <v-flex xs8 offset-xs2 v-if="noticiaAtual.IdMidia === 4">
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'primary': 'secondary'" class="px-4" value="1">Matéria</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'primary': 'secondary'" class="px-4" value="2">Páginas</v-btn>
              <v-btn @click="abaAtual = 3" :color="abaAtual === 3 ? 'primary': 'secondary'" class="px-4" value="3">Capa</v-btn>
              <v-btn @click="abaAtual = 4" :color="abaAtual === 4 ? 'primary': 'secondary'" class="px-4" value="4">texto</v-btn>
            </v-flex>
            <v-flex xs8 offset-xs2 v-if="abaAtual === 4 && noticiaAtual.IdMidia === 4">
              <v-card class="py-3 px-4 text-xs-left">
                <v-card-text class="py-3 justify">
                  <span class="justify">{{ noticiaAtual.Conteudo }}</span>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- /midia tv -->
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import services from './services/'
  import moment from 'moment'
  moment.locale('pt-BR')
  export default {
    data () {
      return {
        items: [
          { icon: 'library_books', title: 'Visualizações', value: '12'},
          { icon: 'calendar_today', title: 'Publicação', value: '21/05/2018'},
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
      }
    },
    computed: {
      dataVeiculacao () {
        return moment(this.noticiaAtual.DataHora).format("dddd, MMMM D YYYY, h:mm:ss a")
      }
    },
    methods: {
      getParametrosMvc () {
        this.urlToken = window.location.href.split('=')[1]
        
        return Promise.resolve(services.descriptografar(this.urlToken)).then((data) => {
          this.stringParametros = data
          const expressao = new RegExp('([^=&?]+)=([^&]+)', 'g')
          this.arrayParametros = this.stringParametros.match(expressao)
          this.arrayParametros.map((parametro) => {
            let nome = parametro.substr(0, parametro.indexOf('='))
            this.parametros[nome] = parametro.substr(parametro.indexOf('=') + 1, parametro.length)
          })
        })
      },
      loadPropriedadesMvc () {
        return Promise.resolve(services.getPropriedadesMvc(this.parametros.idProdutoMvc))
          .then((data) => {
            this.parametros.idProduto = data.IdProduto
            this.parametros.propriedadesMvc = data
            Promise.resolve(services.getDadosVisualizacao(this.parametros.idNoticia, this.parametros.idProdutoMvc, this.parametros.idProduto))
              .then((data) => {
            let vm = this
            let dados = data          
            return setTimeout(function () {
              vm.parametros.grifos = dados.grifos
              vm.parametros.fontesRestritas = dados.fontesRestritas
              vm.parametros.noticiasSimilares = dados.noticiasSimilares
              vm.parametros.opcoes = dados.opcoes
            }, 2000, vm, dados)
              })
          })
      },
      loadIdNoticiasBook () {
        if (this.parametros.idBook) {
          Promise.resolve(services.getIdNoticiasBook(this.parametros.idBook))
            .then((data) => {
              this.parametros.idNoticiasBook = data
            })
        }
      },
      loadImpresso() {
        this.parametros.listaPaginasRecorte = []
        this.parametros.listaIdsPaginas = []
        const vm = this
        Promise.resolve(services.impresso.getIdsPaginas(this.parametros.idNoticia)
          .then((response) => {
            vm.parametros.listaIdsPaginas = response.Paginas
            vm.parametros.listaIdsPaginas.map((pagina, index) => {
              Promise.resolve(services.impresso.getPaginaComRecortes(pagina)
              .then((response) => {
                debugger
                vm.parametros.listaPaginasRecorte.push(response)
                vm.$forceUpdate()
              }), vm)
            })
          })
        , vm)
      },
      loadNoticia () {
        Promise.resolve(services.getNoticia(this.parametros.idProdutoMvc, this.parametros.idNoticia, false))
          .then((data) => {
            this.noticiaAtual = data
            if (this.noticiaAtual.IdMidia === 2) {
              this.loadImpresso()
            }
          })
      }
    },
    mounted () {
      this.getParametrosMvc().then(() => {
        this.loadPropriedadesMvc()
        this.loadIdNoticiasBook()
        this.loadNoticia()
      })
    }
  }
</script>
<style>
.img-limit {
  max-height: 80% !important;
}
</style>
