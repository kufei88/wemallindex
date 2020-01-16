<template>
  <div class="order" style="padding-bottom: 50px">
    <x-header :left-options="{showBack: false}" class="header">订单管理</x-header>
    <flexbox>
      <flexbox-item>
        <datetime class="dateRange" v-model="beginDate" title="开始时间" @on-change="getBillList"></datetime>
      </flexbox-item>
      <flexbox-item>
        <datetime class="dateRange" v-model="endDate" title="结束时间" @on-change="getBillList"></datetime>
      </flexbox-item>
    </flexbox>
    <group>
      <bill-list
        :title="title"
        :list="billlist"
        :showMenu="true"
        　@on-del-item="delBill($event)"
        @on-edt-item="edtBill($event)"
      ></bill-list>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Confirm, Flexbox, FlexboxItem, Datetime } from "vux";
import BillList from "./BillList.vue";
import HttpUtil from "../util/HttpUtil";
export default {
  name: "order",
  components: {
    XHeader,
    BillList,
    Group,
    Confirm,
    Flexbox,
    FlexboxItem,
    Datetime
  },
  data() {
    return {
      billlist: [],
      title: "订单日期",
      beginDate: "",
      beginDate1: "",
      endDate: "",
      endDate1: ""
    };
  },
  mounted() {
    let now = new Date();
    this.beginDate =
      now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate();
    console.log(this.beginDate);
    this.beginDate1 = this.beginDate;
    this.endDate =
      now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate();
    this.endDate1 = this.endDate;
    this.getBillList();
  },
  methods: {
    getBillList() {
      let _this = this;
      let templist = [];
      let billcode = "";
      let goodlist = [];
      let billdate = "";
      let audite = "";
      let deliver = false;
      HttpUtil.get(
        "bill/getOrderByClient.do",
        {
          client: this.$store.state.vux.snsUserInfo.username,
          beginDate: this.beginDate,
          endDate: this.endDate
        },
        function(data) {
          console.log(_this.beginDate);
          if (!_this.beginDate) {
            _this.beginDate = _this.beginDate1;
          }

          if (!_this.endDate) {
            _this.endDate = _this.endDate1;
          }
          data.forEach(function(item) {
            if (billcode != "" && billcode != item.goodCode) {
              templist.push({
                billdate: billdate,
                billcode: billcode,
                goodslist: goodlist,
                audite: audite,
                deliver: deliver
              });
              goodlist = [];
              deliver = false;
            }
            billdate = item.datetime;
            billcode = item.goodCode;
            audite = item.postition;

            goodlist.push({
              goodsName: item.stockGoodsName,
              number: item.stockGoodsNum,
              weight: item.defineTwentyFive
            });
            console.log(item.transitNum);
            if (item.transitNum > 0) {
              deliver = true;
            }
          });
          if (billcode) {
            templist.push({
              billdate: billdate,
              billcode: billcode,
              goodslist: goodlist,
              audite: audite,
              deliver: deliver
            });
          }

          _this.billlist = templist;
          console.log(templist);
        }
      );
    },
    delBill(e) {
      let _this = this;
      this.$vux.confirm.show({
        title: "提示",
        content: "是否确认删除该订单",

        onConfirm() {
          _this.$vux.loading.show({
            text: "正在删除"
          });
          HttpUtil.del("bill/delOrder.do", { billCode: e }, function(data) {
            _this.getBillList();
            _this.$vux.loading.hide();
          });
        }
      });
    },
    edtBill(e) {
      this.$router.push({ path: "/", query: { billcode: e } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dateRange {
  font-size: 12px;
}
</style>
