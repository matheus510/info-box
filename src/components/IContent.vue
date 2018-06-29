<template>
  <v-layout row wrap>
    <i-headline :aba-atual="abaAtual" :noticiaAtual="noticiaAtual" :parametros="parametros"></i-headline>
    <v-flex row wrap xs12>
      <v-card transparent>
        <v-btn color="primary" fab absolute top left><v-icon>chevron_left</v-icon></v-btn>
        <v-btn color="primary" fab absolute top right><v-icon>chevron_right</v-icon></v-btn>
      </v-card>
    </v-flex>
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
          <img :src="noticiaAtual.screenshot" />
        </div>
      </v-card>
    </v-flex>
    <!-- /midia web --> 
    <!-- midia impresso -->
    <v-flex xs12 v-if="abaAtual === 1 && noticiaAtual.IdMidia === 2">
      <v-card class="py-3 px-4">
        <div v-viewer class="viewer">
          <img v-for="imagem in parametros.listaRecortesURL" :src="imagem.src" :key="imagem.src">
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
        <div v-if="noticiaAtual.capa !== undefined && noticiaAtual.capa.Url" class="viewer" v-viewer>
          <img pre-load :src="noticiaAtual.capa.Url"/>
        </div>
        <div v-if="noticiaAtual.capa === undefined && !noticiaAtual.capa.Url">
          Capa não disponível
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
      O seu navegador não suporta o elemento <code>audio</code> do HTML5.
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
</template>

<script>
import VueGallery from 'vue-gallery'
import IHeadline from './IHeadline.vue'
import eventBus from '../helpers/eventBus.js'

export default {
  data () {
    return {
    }
  },
  props: ['parametros', 'noticiaAtual', 'abaAtual'],
  created () {
    eventBus.$on('noticiaAtualDefinida', () => this.$forceUpdate())
    eventBus.$on('parametrosAtualizados', () => this.$forceUpdate())
  },
  components : {
    IHeadline,
    VueGallery
  }
}
</script>

<style>
.viewer img{
  width: 100%;
  height: 100%;
}
</style>
