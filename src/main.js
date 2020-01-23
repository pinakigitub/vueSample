import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import { BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import RestResource from "./services/httpService";
const {
  enableInterceptor
} = require('./services/httpInterCept');
const restResourceService = new RestResource();
import UtilityResource from './services/utilityService';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

/* eslint-disable no-new */
Vue.prototype.$appName = 'My App'
Vue.prototype.$isDbOperationGoingOn = false;
//sarada Pinaki
new Vue({
  data: {
    isLoading: false,
    axiosInterceptor: null,
    axiosInstance: null,
    isLoggedIn: false
  },
  methods: {
    setAxiosInstance() {
      this.axiosInstance = restResourceService.GetAxiosObject();
      enableInterceptor(this, UtilityResource);

    },
    GetSample(restUrl) {
      return this.axiosInstance.get(restUrl);
    },
    PostSample(restUrl, data) {
      return this.axiosInstance.post(restUrl, data);
    },
    disableInterceptor() {
      this.axiosInstance.interceptors.request.eject(this.axiosInterceptor)
    },
  },
  created() {
    this.setAxiosInstance();

  },
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})