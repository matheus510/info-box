<template>
  <v-toolbar class="grey darken-3" fixed app>
      <v-toolbar-title class="white--text"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn v-if="noticiaAtual.IdMidia === 1" slot="activator" target="_blank" :href="noticiaAtual.Url" fab small>
          <v-icon>link</v-icon>
        </v-btn>
        <span>Link original</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn slot="activator" download :href="`http://pdf.boxnet.com.br/Geral/Imagem?idNoticia=${parametros.idNoticia}&idProdutoMvc=${parametros.idProdutoMvc}${noticiaAtual.IdMidia === 2 ? '&paginaCompleta=false' : ''}`" fab small>
          <v-icon>vertical_align_bottom</v-icon>
        </v-btn>
        <span>Download da matéria</span>
      </v-tooltip>
    </v-toolbar>
</template>

<script>
export default {
  props: ['noticiaAtual', 'parametros']
}
</script>

<style>

</style>
