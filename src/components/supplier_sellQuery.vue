<template>
  <div>
    <x-header :left-options="{ showBack: false }" class="header">货物销售明细</x-header>
    <group>
      <flexbox style="background:#fff">
        <flexbox-item>
          <!--
          <datetime class="dateRange" v-model="beginDate" title="开始时间" @on-change="getBillList"></datetime>
          -->
          <cell
            style="font-size:12px"
            title="开始时间"
            :value="beginDate"
            is-link
            @click.native="beginClick"
          ></cell>
        </flexbox-item>
        <flexbox-item>
          <cell
            style="font-size:12px"
            title="结束时间"
            :value="endDate"
            is-link
            @click.native="endShow = true"
          ></cell>
          <!--
          <datetime class="dateRange" v-model="endDate" title="结束时间" @on-change="getBillList"></datetime>
          -->
        </flexbox-item>
      </flexbox>
    </group>
    <calendar :show.sync="beginShow" @change="onChange" />
    <calendar :show.sync="endShow" @change="onEndChange" />
    <div style="margin-top:20px;padding:0 20px">
      <flexbox style="background-color: #F7F7F7 ;padding-right:5px;font-size:11px;height:30px">
        <flexbox-item :span="2">客户</flexbox-item>
        <flexbox-item :span="2">名称</flexbox-item>
        <flexbox-item :span="2">件数</flexbox-item>
        <flexbox-item :span="2">重量</flexbox-item>
        <flexbox-item :span="2">单价</flexbox-item>
        <flexbox-item :span="2">金额</flexbox-item>
      </flexbox>
      <flexbox
        style="padding-right:5px;font-size:11px;height:30px"
        v-for="(item,index) in list"
        v-bind:key="index"
      >
        <flexbox-item :span="2">{{item.client}}</flexbox-item>
        <flexbox-item :span="2">{{item.goodsName}}</flexbox-item>
        <flexbox-item :span="2">{{Math.abs(item.number.toFixed(2))}}</flexbox-item>
        <flexbox-item :span="2">{{Math.abs(item.weight.toFixed(2))}}</flexbox-item>
        <flexbox-item
          :span="2"
        >{{item.weightPrice?Math.abs(item.weightPrice.toFixed(2)):item.price.toFixed(2)}}</flexbox-item>
        <flexbox-item :span="2">{{Math.abs(item.number*item.price).toFixed(2)}}</flexbox-item>
      </flexbox>
      <flexbox style="font-size:11px;height:30px">
        <flexbox-item :span="2">合计</flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
        <flexbox-item :span="2">{{numberTotal.toFixed(2)}}</flexbox-item>
        <flexbox-item :span="2">{{weightTotal.toFixed(2)}}</flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
        <flexbox-item :span="2">{{sumTotal.toFixed(2)}}</flexbox-item>
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
      billState: "已结清",
      sum: 300,
      list: [],
      billlist: [],
      title: "日期",
      totalNum: 0,
      totalSum: 0,
      beginDate: "",
      endDate: "",
      showFilter: false,
      beginShow: false,
      endShow: false,
      numberTotal: 0,
      weightTotal: 0,
      sumTotal: 0
    };
  },
  mounted() {
    let now = new Date();
    this.beginDate =
      now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate();
    console.log(this.beginDate);

    this.endDate =
      now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate();

    this.getBillList();
  },
  methods: {
    getBillList() {
      HttpUtil.get(
        "bill/getSupplierSellList.do",
        {
          beginDate: this.beginDate,
          endDate: this.endDate,
          client: this.$store.state.vux.snsUserInfo.username
        },
        data => {
          this.list = data;
          this.weightTotal = 0;
          this.numberTotal = 0;
          this.sumTotal = 0;
          data.forEach(item => {
            this.sumTotal += item.number * item.price;
            this.weightTotal += item.weight;
            this.numberTotal += item.number;
            this.billDate = item.billDate;
          });
          console.log(data);
        }
      );
    },
    beginClick() {
      console.log(123);
      this.beginShow = true;
    },
    onChange(date) {
      this.beginDate = date.format("YYYY-MM-DD");
      this.beginShow = false;
      this.getBillList();
    },
    onEndChange(date) {
      this.endDate = date.format("YYYY-MM-DD");
      this.endShow = false;
      this.getBillList();
    }
  }
};
</script>

<style>
</style>
