import Vue from 'vue';
import App from './App.vue'
import { router } from './router.js'
import store from './store.js'
import Notifications from 'vue-notification'
import vmodal from 'vue-js-modal'
import services from './service.js'


Vue.prototype.$SERVICES = services;


Vue.use(store)
Vue.use(router)
Vue.use(Notifications)
Vue.use(vmodal)


Vue.config.productionTip = false;


new Vue({
    router,
    store,
    mounted() {
        if (localStorage.getItem('Token')) {
            const token = localStorage.getItem('Token')
            console.log("Token :", token)
            this.$store.dispatch("setToken", token)
        }
        if (localStorage.getItem('UserData')) {
            const user = localStorage.getItem('UserData');
            console.log("User Data :", JSON.parse(user))
            this.$store.dispatch("setUser", JSON.parse(user))
        }
    },
    render: h => h(App)
}).$mount('#app');