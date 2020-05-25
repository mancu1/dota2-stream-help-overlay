import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueNativeSock from "vue-native-websocket";
Vue.use(VueNativeSock, "ws://localhost:8999/");

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
