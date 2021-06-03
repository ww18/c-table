import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 初始化样式，用于浏览器平衡 或者引入normalize
// import "@/less/index.less";
// // 主题样式
// import "theme/index.css";
// import "@/less/common_style.less";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, {
  size: "mini",
});

// 使用less
import less from "less";
Vue.use(less);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
