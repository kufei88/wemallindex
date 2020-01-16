// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import VueRouter from "vue-router";
import App from "./App";
import Commodity from "./components/Commodity";
import Order from "./components/Order";
import Sell from "./components/Sell";
import MyTab from "./components/MyTab";
import billDetail from "./components/BillDetail";
import myinformation from "./components/MyInformation.vue";
import contact from "./components/Contact.vue";
import Vuex from "vuex";
import { BusPlugin } from "vux";
import {
  AjaxPlugin,
  LoadingPlugin,
  ToastPlugin,
  ConfirmPlugin,
  AlertPlugin
} from "vux";
import AddCommondity from "./components/AddCommondity";
import geturlpara from "./util/MyUtil";
import Statement from "./components/Statement";
import HttpUtil from "./util/HttpUtil";
import VueClipboard from "vue-clipboard2";
import "./styles/iconfont";
import ECharts from "vue-echarts/components/ECharts.vue";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import Calendar from "vue-mobile-calendar";

Vue.use(Calendar);

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BusPlugin);
Vue.use(AjaxPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(VueClipboard);
Vue.use(AlertPlugin);
Vue.component("chart", ECharts);

Vue.prototype.$geturlpara = geturlpara;
Vue.prototype.$httputil = HttpUtil;

const routes = [
  {
    path: "/",
    component: Commodity,
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: "/order",
    component: Order,
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: "/sell",
    component: Sell
  },
  {
    path: "/addCommondity",
    component: AddCommondity
  },
  {
    path: "/statement",
    component: Statement,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/mytab",
    component: MyTab
  },
  {
    path: "/billDetail",
    component: billDetail
  },
  {
    path: "/myinformation",
    component: myinformation
  },
  {
    path: "/myinformation",
    component: myinformation
  },
  {
    path: "/contact",
    component: contact
  }
];

const router = new VueRouter({
  routes
});

const store = new Vuex.Store({}); // 这里你可能已经有其他 module

store.registerModule("vux", {
  // 名字自己定义
  state: {
    isLoading: false,
    snsUserInfo: {},
    tenant: ""
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    },
    updateSnsUserInfo(state, payload) {
      state.snsUserInfo = payload;
    },
    updateUsername(state, payload) {
      state.snsUserInfo.username = payload.username;
    },
    updateTenant(state, payload) {
      state.tenant = payload.tenant;
    }
  }
});

router.beforeEach(function(to, from, next) {
  console.log(store.state.vux.snsUserInfo.username);
  if (
    store.state.vux.snsUserInfo &&
    store.state.vux.snsUserInfo.username == "null" &&
    to.path != "/"
  ) {
    next({
      path: "/"
    });
  } else {
    store.commit("updateLoadingStatus", {
      isLoading: true
    });
    next();
  }
});

router.afterEach(function(to) {
  store.commit("updateLoadingStatus", {
    isLoading: false
  });
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app-box");
