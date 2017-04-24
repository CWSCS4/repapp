import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import 'vue-material/dist/vue-material.css'
import AdminApp from './AdminApp.vue'
import LinksView from './LinksView.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  {path: '/links', component: LinksView}
]
const router = new VueRouter({
  routes
})

new Vue({
  el: '#admin-app',
  components: {AdminApp},
  router
})
