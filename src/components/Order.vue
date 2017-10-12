<template>
  <div class="order" style="padding-bottom: 50px">
    <x-header :left-options="{showBack: false}">订单管理</x-header>
    <group title="订单信息">
      <bill-list   :list="billlist" 　@on-del-item="delBill($event)" @on-edt-item="edtBill($event)" ></bill-list>


    </group>

  </div>
</template>

<script>
import {XHeader,Group,Confirm} from 'vux'
import BillList from './BillList.vue'
import HttpUtil from '../util/HttpUtil'
export default {

  name: 'order',
  components:{
    XHeader,
    BillList,
    Group,
    Confirm
  },
  data () {
    return {
      billlist:[]
    }
  },
  mounted(){
    this.getBillList();
  },
  methods:{
    getBillList(){
      let _this = this;
      let templist = [];
      let billcode = '';
      let goodlist = [];
      let billdate = '';
      HttpUtil.get('billInfo/getBillByWxid',{wxid:this.$store.state.vux.snsUserInfo.openId},function(data){
        data.forEach(function(item){
          if ((billcode !='') && (billcode != item.billcode)) {
            templist.push({billdate:billdate,billcode:billcode,goodslist:goodlist});
            goodlist = [];
          }
          billdate = item.billdate;
          billcode = item.billcode;

          goodlist.push({goodsName:item.goodsName,number:item.number});
        })
        templist.push({billdate:billdate,billcode:billcode,goodslist:goodlist});
        _this.billlist = templist;
      })
    },
    delBill(e){

      let _this = this;
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认删除该订单',


        onConfirm () {
          HttpUtil.del('billInfo/delBillInfo',{billcode:e},function(data){

            _this.getBillList();
          })
        }
      })

    },
    edtBill(e){
      this.$router.push({path:'/',query:{billcode:e}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
