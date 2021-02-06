<template>
  <div>
    <x-header :left-options="{ showBack: false }" class="header">单据明细</x-header>
    <group>
      <cell title="订单日期" :value="billDate"></cell>
      <cell title="订单金额" :value="sum"></cell>
    </group>
    <div style="margin-top:20px;margin-bottom:80px;padding:0 20px">
      <flexbox style="background-color: #F7F7F7 ;padding-right:5px;font-size:11px">
        <flexbox-item :span="4">名称</flexbox-item>
        <flexbox-item :span="2">件数</flexbox-item>
        <flexbox-item :span="2">斤两</flexbox-item>
        <flexbox-item :span="2">单价</flexbox-item>
        <flexbox-item :span="2">金额</flexbox-item>
      </flexbox>
      <flexbox
        style="padding-right:5px;font-size:11px;height:30px"
        v-for="(item,index) in list"
        v-bind:key="index"
      >
        <flexbox-item :span="4">{{item.goodsName}}</flexbox-item>
        <flexbox-item :span="2">{{Math.abs(item.number.toFixed(2))}}</flexbox-item>
        <flexbox-item :span="2">{{Math.abs(item.weight.toFixed(2))}}</flexbox-item>
        <flexbox-item
          :span="2"
        >{{item.weightPrice?Math.abs(item.weightPrice.toFixed(2)):item.price.toFixed(2)}}</flexbox-item>
        <flexbox-item :span="2">{{Math.abs(item.number*item.price).toFixed(2)}}</flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, Flexbox, FlexboxItem } from "vux";
import HttpUtil from "../util/HttpUtil";
export default {
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    Group,
    Cell
  },
  data() {
    return {
      billDate: "2020-01-01 12:00:00",
      billState: "已结清",
      sum: 300,
      list: []
    };
  },
  mounted() {
    let client = this.$geturlpara.getUrlKey("client");
    let billCode = this.$geturlpara.getUrlKey("billCode");
    this.$store.commit("updateSnsUserInfo", { username: client });
    HttpUtil.get(
      "bill/getSellDetailByCode.do",
      {
        billCode: billCode
      },
      data => {
        this.list = data;
        this.sum = 0;
        data.forEach(item => {
          this.sum += -item.number * item.price;
          this.billDate = item.billDate;
        });
        console.log(data);
      }
    );
  }
};
</script>

<style>
</style>
