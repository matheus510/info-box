<template>
  <v-content>
    <v-container grid-list-xl text-xs-center>
      <v-slide-y-transition mode="out-in">
        <i-content :noticiaAtual="noticiaAtual" :parametros="parametros" :abaAtual="abaAtual"></i-content>
      </v-slide-y-transition>
    </v-container>
  </v-content>
</template>

<script>
import IContent from './IContent.vue'

export default {
  props: ['noticiaAtual', 'parametros', 'abaAtual'],
  components: {
    IContent
  }
}
</script>

<style>

</style>
