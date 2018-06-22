<template>
  <v-layout row wrap>
    <i-headline :aba-atual="abaAtual" :noticiaAtual="noticiaAtual" :parametros="parametros"></i-headline>
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
</template>

<script>
import IHeadline from './IHeadline.vue'
import eventBus from '../helpers/eventBus.js'

export default {
  props: ['parametros', 'noticiaAtual', 'abaAtual'],
  created () {
    eventBus.$on('noticiaAtualDefinida', (vm) => vm.$forceUpdate)
  },
  components : {
    IHeadline
  }
}
</script>

<style>
.viewer img{
  width: 100%;
  height: 100%;
}
</style>
