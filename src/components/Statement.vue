<template>
  <div class="order" style="padding-bottom: 50px">
    <div style="position:fixed;top:0;width:100%;z-index:10">
      <x-header :left-options="{ showBack: false }" class="header"
        >对账单</x-header
      >
      <div style="font-size:12px;color:red;background:#d3d3d3">
        说明:点击相应日期显示当天的采购清单
      </div>
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
    </div>
    <calendar :show.sync="beginShow" @change="onChange" />
    <calendar :show.sync="endShow" @change="onEndChange" />
    <group class="main" style="margin-top:90px">
      <statement-list
        :title="title"
        :list="billlist"
        :showMenu="false"
        　
        @on-edt-item="edtBill($event)"
      ></statement-list>
    </group>
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
  Cell
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
    Cell
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
      beginShow: false,
      endShow: false
    };
  },
  mounted() {
    let now = new Date();
    var t = now.getTime() - 1000 * 60 * 60 * 24 * 1;
    var yesterday = new Date(t);
    this.beginDate =
      yesterday.getFullYear() +
      "-" +
      (yesterday.getMonth() + 1 > 9
        ? yesterday.getMonth() + 1
        : "0" + (yesterday.getMonth() + 1)) +
      "-" +
      (yesterday.getDate() > 9
        ? yesterday.getDate()
        : "0" + yesterday.getDate());
    console.log(this.beginDate);

    this.endDate =
      now.getFullYear() +
      "-" +
      (now.getMonth() + 1 > 9
        ? now.getMonth() + 1
        : "0" + (now.getMonth() + 1)) +
      "-" +
      (now.getDate() > 9 ? now.getDate() : "0" + now.getDate());

    this.getBillList();
  },
  methods: {
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
    },
    search() {
      this.getBillList();
      this.showFilter = false;
    },
    getBillList() {
      this.$vux.loading.show({
        text: "正在加载"
      });
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
        "bill/getStatementByClient.do",
        {
          client: this.$store.state.vux.snsUserInfo.username,
          beginDate: searchDate,
          endDate: searchEndDate
        },
        function(data) {
          console.log(data);
          _this.billlist = data;
          _this.$vux.loading.hide();
          if (!_this.beginDate) {
            _this.beginDate = searchDate;
          }

          if (!_this.endDate) {
            _this.endDate = searchEndDate;
          }
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
      console.log(e["日期"]);
      if (e["应付款"]) {
        this.$router.push({
          path: "/billDetail",
          query: { billdate: e["日期"] }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
