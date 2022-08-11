import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/index.scss"; // global css

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import components from "logicflow-vue/packages/index";
// 加载view-generator项目组件
// import * as dragsComponets from "@drag/install.js";
// import "logicflow-vue/lib/logicFlow.css";
for (const i in components) {
  Vue.use(components[i]);
}
// dragsComponets.aioComponents.component.forEach((item) => {
//   Vue.component(item.name, item);
// });

import App from "./App";
import store from "./store";
import router from "./router";
import "@/icons"; // icon
import "@/permission"; // permission control

// import { vuePlugin } from "../package/highlight";
// import "highlight.js/styles/atom-one-dark-reasonable.css";
// Vue.use(vuePlugin);

// import MyPD from "../package/index.js";
// Vue.use(MyPD);

import componets from "@/components";
Vue.use(componets);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
