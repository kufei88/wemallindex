<template>
  <div class="order" style="padding-bottom: 50px">
    <x-header :left-options="{showBack: false}" class="header">
      收货管理
      <x-icon
        slot="right"
        type="funnel"
        size="25"
        style="fill:#fff;position:relative;top:-6px;left:-3px;"
        @click="showDialog"
      ></x-icon>
    </x-header>
    <group :title="'收货信息:'+beginDate+'--'+endDate" class="main">
      <sell-list
        :title="title"
        :list="billlist"
        :showMenu="false"
        　@on-del-item="delBill($event)"
        @on-edt-item="edtBill($event)"
      ></sell-list>
    </group>
    <div>
      <x-dialog v-model="showFilter" class="dialog-demo">
        <group>
          <datetime v-model="beginDate" format="YYYY-MM-DD" title="开始日期"></datetime>
        </group>
        <group>
          <datetime v-model="endDate" format="YYYY-MM-DD" title="结束日期"></datetime>
        </group>

        <div class="weui-form-preview__ft">
          <a
            class="weui-form-preview__btn weui-form-preview__btn_default"
            @click="showFilter=false"
          >取消</a>
          <a class="weui-form-preview__btn weui-form-preview__btn_primary" @click="search">确定</a>
        </div>
      </x-dialog>
    </div>
    <footer>
      <div class="total">
        总数量:
        <b>{{totalNum}}</b>
      </div>
      <div class="sum">
        总金额:
        <b>{{totalSum}}</b>
      </div>
    </footer>
  </div>
</template>

<script>
import { XHeader, Group, Confirm, Datetime, XDialog } from "vux";
import SellList from "./SellList.vue";
import HttpUtil from "../util/HttpUtil";
import MyUtil from "../util/MyUtil";
export default {
  name: "order",
  components: {
    XHeader,
    SellList,
    Group,
    Confirm,
    Datetime,
    XDialog
  },
  data() {
    return {
      billlist: [],
      title: "收货日期",
      totalNum: 0,
      totalSum: 0,
      beginDate: MyUtil.getToday(),
      endDate: MyUtil.getToday(),
      showFilter: false
    };
  },
  mounted() {
    this.getBillList();
  },
  methods: {
    search() {
      this.getBillList();
      this.showFilter = false;
    },
    getBillList() {
      let _this = this;
      let templist = [];
      let billcode = "";
      let goodlist = [];
      let billdate = "";
      let audite = "";
      let sum = 0;
      this.totalNum = 0;
      this.totalSum = 0;
      console.log(this.beginDate);
      let searchDate = this.beginDate;
      let searchEndDate = this.endDate;
      HttpUtil.get(
        "bill/getSellByClient.do",
        {
          client: this.$store.state.vux.snsUserInfo.username,
          beginDate: searchDate,
          endDate: searchEndDate
        },
        function(data) {
          data.forEach(function(item) {
            if (billcode != "" && billcode != item.goodCode) {
              templist.push({
                billdate: billdate,
                billcode: billcode,
                goodslist: goodlist,
                audite: audite,
                sum: sum
              });
              goodlist = [];
              sum = 0;
            }
            billdate = item.datetime;
            billcode = item.goodCode;
            audite = item.postition;
            sum += item.stockGoodsNum * item.stockGoodsPrice;
            _this.totalNum += item.stockGoodsNum;
            _this.totalSum += item.stockGoodsNum * item.stockGoodsPrice;
            goodlist.push({
              goodsName: item.stockGoodsName,
              number: item.stockGoodsNum,
              price: item.stockGoodsPrice
            });
          });
          templist.push({
            billdate: billdate,
            billcode: billcode,
            goodslist: goodlist,
            audite: audite,
            sum: sum
          });
          _this.billlist = templist;
        }
      );
    },
    showDialog() {
      this.showFilter = !this.showFilter;
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
          HttpUtil.del("bill/delOrder1.do", { billCode: e }, function(data) {
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
.header {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 2rem;
  background-color: #3d3d3f;
}
.main {
  margin-top: 2rem;
  padding: 0;
  margin-bottom: 2rem;
}
footer {
  position: fixed;
  bottom: 2rem;
  font-size: 15px;
  width: 100%;
  background-color: #fff;
  height: 2rem;
  line-height: 2rem;
  border-top: 1px solid #3d3d3f;
}
.total {
  float: left;
  width: 45%;
  padding-left: 0.5rem;
}
.sum {
  float: right;
  padding-right: 0.5rem;
}
</style>
