import Vue from 'vue'
import App from './App.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Viewer.setDefaults({  
  title: false,
  loop: false,
  rotatable: false,
  toolbar: false,
  navbar: false,
  zoomRatio: 0.5
})

Vue.use(Vuetify)
Vue.use(Viewer)

new Vue({
  el: '#app',
  render: h => h(App)
})
