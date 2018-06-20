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
        <v-list-tile v-for="item in items" :key="item.icon">
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
<<<<<<< HEAD
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'primary': 'secondary'" class="px-4" value="1">Leitura</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'primary': 'secondary'" class="px-4" value="2">Screenshot</v-btn>
=======
              <v-btn @click="abaAtual = 1" :color="abaAtual === 1 ? 'white': 'secondary'" class="px-4" value="1">Leitura</v-btn>
              <v-btn @click="abaAtual = 2" :color="abaAtual === 2 ? 'white': 'secondary'" class="px-4" value="2">Screenshot</v-btn>
>>>>>>> 537625bbe725f725dbceef29c500bbac72f83db0
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
<<<<<<< HEAD
                <v-card-text class="py-3 justify">
                  <div class="viewer" v-viewer>
                    <img :src="noticiaAtual.screenshot" />
                  </div>
                </v-card-text>
=======
                <div class="viewer" v-viewer>
                  <img :src="noticiaAtual.screenshot" />
                </div>
>>>>>>> 537625bbe725f725dbceef29c500bbac72f83db0
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
        return moment(this.noticiaAtual.DataHora).format("dddd, D MMMM YYYY, h:mm:ss a")
      }
    },
<<<<<<< HEAD
    methods: {
      getParametrosMvc () {
        this.urlToken = window.location.href.split('=')[1]
        
        return Promise.resolve(services.common.descriptografar(this.urlToken)).then((data) => {
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
        return Promise.resolve(services.common.getPropriedadesMvc(this.parametros.idProdutoMvc))
          .then((data) => {
            this.parametros.idProduto = data.IdProduto
            this.parametros.propriedadesMvc = data
            Promise.resolve(services.common.getDadosVisualizacao(this.parametros.idNoticia, this.parametros.idProdutoMvc, this.parametros.idProduto))
              .then((data) => {
            let vm = this
            let dados = data          
            return setTimeout(function () {
              vm.parametros.grifos = dados.grifos
              vm.parametros.fontesRestritas = dados.fontesRestritas
              vm.parametros.noticiasSimilares = dados.noticiasSimilares
              vm.parametros.opcoes = dados.opcoes
              if (vm.parametros.grifos && vm.noticiaAtual.Conteudo) {
                vm.noticiaAtual.Conteudo = helpers.highlight(vm.noticiaAtual.Conteudo, vm.parametros.grifos)
              }
              if (vm.parametros.opcoes['OpcaoExposicaoMesa'] && vm.parametros.opcoes['OpcaoCentimetragemVisualizacaoBook']) {
                Promise.resolve(services.common.getExposicao(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, vm.noticiaAtual.IdMidia, vm.parametros.opcoes['centimetragemWeb']))
                  .then((data) => {
                    vm.noticiaAtual.exposicao = data
                    vm.items[3].value = vm.noticiaAtual.exposicao.Exposicao.substring(14, vm.noticiaAtual.exposicao.Exposicao.length)
                  })
            }
            if (vm.parametros.opcoes['OpcaoExposicaoPorCanal'] && vm.parametros.opcoes['OpcaoCentimetragemVisualizacaoBook']) {
                Promise.resolve(services.common.getExposicaoCanal(vm.parametros.idProdutoMvc, vm.parametros.idNoticia, vm.parametros.idMidia))
                  .then((data) => {
                    vm.noticiaAtual.exposicao = data
                    vm.items[3].value = vm.noticiaAtual.exposicao.Exposicao.substring(14, vm.noticiaAtual.exposicao.Exposicao.length)
                  })
            }
            if (vm.parametros.opcoes['OpcaoTiragemVisualizacaoBook']) {
                Promise.resolve(services.common.getTiragem(vm.parametros.idNoticia))
                  .then((data) => {
                    vm.noticiaAtual.tiragem = data
                    vm.items[4].value = vm.noticiaAtual.tiragem
                  })
            }
            if (vm.parametros.opcoes['OpcaoValoracaoVisualizacaoBook']) {
                Promise.resolve(services.common.getValoracao(vm.parametros.idProdutoMvc, vm.parametros.idNoticia))
                  .then((data) => {
                    vm.noticiaAtual.valoracao = data
                    vm.items[2].value = vm.noticiaAtual.valoracao ? vm.noticiaAtual.valoracao : 'Informação não disponível' 
                  })
            }
            }, 2000, vm, dados)
              })
          })
      },
      loadIdNoticiasBook () {
        if (this.parametros.idBook) {
          Promise.resolve(services.common.getIdNoticiasBook(this.parametros.idBook))
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
                  vm.parametros.listaPaginasRecorte.push(response)
                  vm.$forceUpdate()
                }), vm)
            })
            Promise.resolve(services.impresso.getCapa(vm.parametros.idNoticia)
              .then((data) => {
                vm.noticiaAtual.capa = data
                vm.$forceUpdate()
              }), vm)
          })
        , vm)
      },
      loadWeb () {
        debugger
        Promise.resolve(services.web.getScreenshot(this.parametros.idNoticia).then((response) => {
            this.noticiaAtual.screenshot = response
            this.$forceUpdate()
          })
        )
      },
      loadNoticia () {
        Promise.resolve(services.common.getNoticia(this.parametros.idProdutoMvc, this.parametros.idNoticia, false))
          .then((data) => {
            this.noticiaAtual = data
            this.items[1].value = moment(this.noticiaAtual.DataHora).format("DD/MM/YYYY")
            if (this.noticiaAtual.IdMidia === 2) {
              this.loadImpresso()
            }
            if (this.noticiaAtual.IdMidia === 1) {
              this.loadWeb()
            }
          })
      },
      inited (viewer) {
        this.$viewer = viewer
        this.$viewer.show()
      },
      show () {
        this.$viewer.show()
      }
    },
=======
>>>>>>> 537625bbe725f725dbceef29c500bbac72f83db0
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
