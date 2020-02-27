import Vue from 'vue'
import App from '@/App.vue'
import router from "@/router.js";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios';
Vue.use(ViewUI);

axios.defaults.baseURL = '/api';
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
