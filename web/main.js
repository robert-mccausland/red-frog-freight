import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './src/routes'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: "history"
})

new Vue({
    template: '<App/>',
    router,
    components: {
        App
    }
}).$mount("#app")
