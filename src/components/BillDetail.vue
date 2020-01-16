<template>
  <div class="order" style="padding-bottom: 50px">
    <x-header :left-options="{ showBack: true }" class="header"
      >单据明细</x-header
    >
    <div style="font-size:12px;color:red;background:#d3d3d3">
      {{
        "采购日期:" + beginDate + "  总金额:" + totalSum.toFixed(2)
      }}(说明:左滑可以显示溯源)
    </div>
    <div style="font-size:16px;background-color:#fff;">
      <flexbox style="background-color: #F7F7F7 ;margin-left:10px">
        <flexbox-item :span="3">名称</flexbox-item>
        <flexbox-item :span="2">件数</flexbox-item>
        <flexbox-item :span="2">斤两</flexbox-item>
        <flexbox-item :span="2">单价</flexbox-item>
        <flexbox-item :span="3">金额</flexbox-item>
      </flexbox>
      <swipeout>
        <swipeout-item
          v-for="(item, index) in billlist"
          :key="index"
          style="border-bottom:1px solid #ddd"
          @click.prevent="edtBill(item)"
        >
          <div slot="right-menu">
            <swipeout-button type="warn" @click.native="onSwapClick(item)"
              >溯源</swipeout-button
            >
          </div>
          <div slot="content">
            <flexbox style="height:30px;margin-left:10px">
              <flexbox-item :span="3">{{ item.goodsName }}</flexbox-item>
              <flexbox-item :span="2">{{ -item.number }}</flexbox-item>
              <flexbox-item :span="2">{{ -item.weight }}</flexbox-item>
              <flexbox-item :span="2">{{
                -item.weightPrice.toFixed(2)
              }}</flexbox-item>
              <flexbox-item :span="3" style="margin-left:-5px">{{
                (item.price * -item.number).toFixed(2)
              }}</flexbox-item>
            </flexbox>
            <flexbox style="height:30px;margin-left:10px;color:#d3d3d3">
              <flexbox-item
                >备注:{{ item.remark ? item.remark : "" }}</flexbox-item
              >
            </flexbox>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showSource">
        <group
          label-width="4.5em"
          label-margin-right="1em"
          label-align="justify"
        >
          <group-title slot="title">
            溯源
            <span
              @click="showSource = false"
              style="float:right;"
              class="vux-close"
            ></span>
          </group-title>
          <x-input
            title="操作员"
            readonly
            :value="sourceGoods.operator"
          ></x-input>

          <x-input
            title="销售单位"
            readonly
            :value="sourceGoods.sellCompany"
          ></x-input>
          <x-input title="产地" readonly :value="sourceGoods.area"></x-input>
          <x-input
            title="供应商"
            readonly
            :value="sourceGoods.company"
          ></x-input>
        </group>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  Confirm,
  Datetime,
  XDialog,
  Flexbox,
  FlexboxItem,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  TransferDom,
  GroupTitle,
  XInput
} from "vux";
import StatementList from "./StatementList.vue";
import HttpUtil from "../util/HttpUtil";
import MyUtil from "../util/MyUtil";
export default {
  name: "order",
  components: {
    XHeader,
    StatementList,
    Group,
    Confirm,
    Datetime,
    XDialog,
    Flexbox,
    FlexboxItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    TransferDom,
    GroupTitle,
    XInput
  },
  data() {
    return {
      billlist: [],
      title: "日期",
      totalNum: 0,
      totalSum: 0,
      beginDate: "",
      endDate: "",
      showFilter: false,
      billCode: "",
      showSource: false,
      sourceGoods: {}
    };
  },
  mounted() {
    this.beginDate = this.$route.query.billdate;
    console.log(this.beginDate);
    this.getBillList();
  },
  methods: {
    onSwapClick(item) {
      let _this = this;
      HttpUtil.get(
        "goods/getSellGoodsSource.do",
        { goodsCode: item.goodsCode, billCode: item.billCode },
        function(data) {
          _this.sourceGoods = data;
          _this.showSource = true;
        }
      );
    },
    search() {
      this.getBillList();
      this.showFilter = false;
    },
    getBillList() {
      let _this = this;
      HttpUtil.get(
        "bill/getSellDetailByDate.do",
        {
          billDate: this.beginDate,
          client: this.$store.state.vux.snsUserInfo.username
        },
        function(data) {
          _this.billlist = data;
          _this.totalSum = 0;
          data.forEach(item => {
            _this.totalSum += item.price * -item.number;
          });
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
          HttpUtil.del("bill/delOrder.do", { billCode: e }, function(data) {
            _this.getBillList();
          });
        }
      });
    },
    edtBill(e) {
      console.log(e);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dateRange {
  font-size: 12px;
}

.main {
  margin-top: -20px;
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
.vux-close {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  color: #999;
  width: 24px;
  height: 24px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 11px;
    width: 24px;
    height: 1px;
    background-color: currentColor;
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
}
</style>
