import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import GoogleAuth from 'vue-google-oauth2'

Vue.config.productionTip = false

Vue.use(VeeValidate)
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB2AWqsBw6NLLz6j36GNkaUt2HYBH3Citw',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})
Vue.use(GoogleAuth, {
  client_id: '670997545619-kk83v1n02fqn22qasg455snoa1j8gli0.apps.googleusercontent.com',
  scope: 'profile email',
  promt: 'select_account'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
