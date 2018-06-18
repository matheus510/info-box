import Vue from 'vue'
import App from './App.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(Viewer)
Viewer.setDefaults({  
  title: false,
  loop: false,
  rotatable: false,
  toolbar: false,
  navbar: false
})
new Vue({
  el: '#app',
  render: h => h(App)
})
