<template>
  <div>
    <div style="font-size:16px;background-color:#fff;">
      <flexbox
        style="background-color: #F7F7F7 ;padding-left:10px;position:fixed;height:40px;top:100px"
      >
        <flexbox-item>日期</flexbox-item>
        <flexbox-item>当天货款</flexbox-item>
        <flexbox-item>实付</flexbox-item>
        <flexbox-item>结余</flexbox-item>
      </flexbox>
      <div style="margin-top:50px">
        <div
          v-for="(item, index) in list"
          :key="index"
          style="border-bottom:1px solid #ddd"
          @click.prevent="edtBill(item)"
        >
          <flexbox style="height:50px;margin-left:10px">
            <flexbox-item>{{ item["日期"].substring(5, 11) }}</flexbox-item>
            <flexbox-item>{{ item["应付款"].toFixed(2) }}</flexbox-item>
            <flexbox-item>{{ item["付款"].toFixed(2) }}</flexbox-item>
            <flexbox-item>{{ item["结余金额"].toFixed(2) }}</flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XNumber, Flexbox, FlexboxItem } from "vux";
export default {
  name: "statementList",
  components: {
    XNumber,
    Flexbox,
    FlexboxItem
  },

  props: {
    list: Array,
    title: String,
    showMenu: Boolean
  },

  methods: {
    delBill(item) {
      this.$emit("on-del-item", item);
    },
    edtBill(src) {
      this.$emit("on-edt-item", src);
    },
    findbyindex(currentValue) {
      return (currentValue.index = this.index);
    }
  }
};
</script>
<style scoped>
.clear {
  clear: both;
}

#emptylist {
  margin-bottom: 20px;
  padding-top: 60px;
  font-size: 14px;
  display: block;
  text-align: center;
  padding: 30px 10px;
  color: #999;
  width: 100%;
  padding: 20px 10px;
  vertical-align: middle;
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

#emptylist h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
}

.tag {
  color: #f60;
  border-color: #f60;
  font-size: 14px;
  line-height: 18px;
  display: inline-block;
  background-color: transparent;
  border: 1px solid #f60;
  border-radius: 3px;
  text-align: center;
  margin: 0;
  text-decoration: none;
}

#billlist {
  background: #f0f2f5;
  padding-top: 5px;
}

.ubilllist {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0;
}

.bill {
  background: #fff;
  margin-top: 5px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  position: relative;
}

.title p {
  margin: 0 10px;
  line-height: 40px;
  height: 40px;
  font-size: 15px;
  float: left;
}

.title a {
  font: 18px/30px "微软雅黑";
  float: right;
  text-decoration: none;
  color: red;
  border: 1px solid red;
  width: 50px;
  text-align: center;
  border-radius: 5px;
  height: 30px;
  margin: 5px;
}

.title {
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.goodslist {
  font-size: 0;
  padding: 0 15px;
  background: #f0f2f5;
}

.goodslist li {
  display: inline-block;
  font-size: 12px;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
}

.signet {
  z-index: 2;

  right: 30px;
  top: 20%;
  width: 64px;
  height: 64px;
  background: url(../assets/index.png) no-repeat;
  background-size: 64px 64px;
}

.item-pay-data {
  float: right;
}

.price {
  font-weight: 700;
  text-overflow: ellipsis;
}

.num {
  font-size: 12px;
  color: #999;
}

.sum {
  float: right;
}

.sum b {
  word-break: break-all;
  font-weight: 700;
}
.goods {
  font-weight: 400;
  font-size: 12px;
}

.itemfooter {
  font-size: 15px;
  height: 1.5rem;
  line-height: 1.5rem;
  border-top: 1px solid #ddd;
}

.payment {
  float: left;
  padding-left: 10px;
}

.balance {
  float: right;
  padding-right: 10px;
}
</style>
