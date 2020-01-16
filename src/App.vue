<template>
  <div id="app">
    <!-- main content -->

    <!-- drawer content -->

    <loading v-model="isLoading"></loading>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <tabbar
      icon-class="vux-center"
      class="vux-demo-tabbar"
      slot="bottom"
      style="position:fixed;border-top:1px solid #000"
    >
      <tabbar-item :selected="$route.path === '/'" link="/">
        <span slot="icon" class="iconfont">&#xe614;</span>
        <span slot="label" class="label">线上订货</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path === '/order'" link="/order">
        <span slot="icon" class="iconfont">&#xe616;</span>
        <span slot="label" class="label">订单核对</span>
      </tabbar-item>

      <tabbar-item :selected="$route.path === '/statement'" link="/statement">
        <span slot="icon" class="iconfont">&#xe62b;</span>
        <span slot="label" class="label">资金对账</span>
      </tabbar-item>
      <tabbar-item
        :selected="$route.path === '/myinformation'"
        link="/myinformation"
      >
        <span slot="icon" class="iconfont">&#xe618;</span>
        <span slot="label" class="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Drawer, ViewBox, XHeader } from "vux";
import svgIcon from "./components/svg";
import { Loading } from "vux";
import { mapState } from "vuex";
export default {
  name: "app",
  mounted() {},
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    ViewBox,
    Drawer,
    XHeader,
    Loading,
    svgIcon
  },
  data() {
    return {
      drawerVisibility: false,
      showModeValue: "push",
      showPlacementValue: "left",
      activeColor: "#fff"
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    }),
    leftOptions() {
      return {
        showBack: this.route.path !== "/"
      };
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "./styles/font.less";

body {
  background-color: #fbf9fe;
}
.router-view {
  width: 100%;
  top: 46px;
}
.weui-tabbar {
  position: fixed;
}
.label {
  font-size: 16px;
}
</style>
