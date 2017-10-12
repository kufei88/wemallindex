<template>
  <div style="padding-bottom: 50px">
    <x-header :left-options="{showBack: false}" >热销商品</x-header>
    <div v-transfer-dom>
      <previewer :list="imglist" ref="previewer" ></previewer>
    </div>
    <group title="商品信息">
      <goods-list   :list="goodslist" @on-click-img="imgclick($event)" 　 ></goods-list>


    </group>
    <group title="个人信息">
      <x-input title="真实姓名" v-model="name"></x-input>
      <x-input title="手机号" v-model="number"  is-type="china-mobile" ></x-input>
      <x-textarea title="备注" v-model="memo"></x-textarea>
    </group>
    <div style="padding:15px;">
        <x-button type="primary" @click.native="buy">确定</x-button>

    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <form-preview header-label="金额" :header-value="sum" :body-items="showlist" ></form-preview>
        <div class="weui-form-preview__ft">
          <a class="weui-form-preview__btn weui-form-preview__btn_default" @click="showToast=false">取消</a>
          <a class="weui-form-preview__btn weui-form-preview__btn_primary" @click="saveOrder">确定</a>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell,XHeader,CellBox,Panel,AjaxPlugin,
 TransferDom,Previewer,XButton,XInput,XTextarea,XDialog,FormPreview,Flexbox, FlexboxItem  } from 'vux'
import GoodsList from './GoodsList'
import HttpUtil from '../util/HttpUtil'
import MyUtil from '../util/MyUtil';
export default {
  directives: {
    TransferDom
  },
  data(){
    return{
      type:"5",
      goodslist:[],
      imglist:[],
      buylist:[],
      number:'',
      name:'',
      memo:'',
      showToast:false,
      sum:'',
      showlist:[],
      billdate:''
    }


  },
  mounted(){
    let _this = this;
    console.log(this.$route);
    if(!this.$store.state.vux.snsUserInfo.nickname){

        let code = _this.$geturlpara.getUrlKey('code');
        let state = _this.$geturlpara.getUrlKey('state');
        let username = _this.$geturlpara.getUrlKey('username');
        this.$store.commit('updateTenant',{tenant:username});
        HttpUtil.get('wechat/clientLogin',{code:code,state:state},function(data){
            _this.$store.commit('updateSnsUserInfo',data);
            _this.getGoodsList();
            _this.name = data.name;
            _this.number = data.tel;
        })

      /*
      HttpUtil.get('wechat/getWechatUser',{},function(data){

      })
      */
    }
    else{
      _this.getGoodsList();
      _this.name = _this.$store.state.vux.snsUserInfo.name;
      _this.number =_this.$store.state.vux.snsUserInfo.tel;
    }

  },
  methods: {
    getGoodsList:function(){
      let _this = this;
      let templist = [];

      if(this.$route.query.billcode){
        HttpUtil.get('billInfo/getBillByBillcode',{username:this.$store.state.vux.tenant,billcode:this.$route.query.billcode},function(data){
        data.forEach(function(item){
           console.log(item);
          if(item.src){
            item.src = "http://127.0.0.1:7777/getfile/"+item.src;
          }
          else{
            item.src = "http://iph.href.lu/100x100?text=济胜软件";
          }
          item.id=item.goodsid;
          item.goodsname = item.goodsName;
          if(item.remark){
            _this.memo = item.remark;
          }
          if(item.billdate){
            _this.billdate = item.billdate;
          }

          templist.push(item);
        })
        _this.goodslist = templist;
        console.log(_this.goodslist);
      })
      }
      else{
        HttpUtil.get('goods/getAllPutaway',{username:this.$store.state.vux.tenant},function(data){
        data.forEach(function(item){
          console.log(item);
          if(item.src){
            item.src = "/getfile/"+item.src;
          }
          else{
            item.src = "http://iph.href.lu/100x100?text=济胜软件";
          }
          item.number = 0;
          templist.push(item);
        })
        _this.goodslist = templist;
      })
      }


    },
    showLoading(){
                this.$vux.loading.show({
                    text: '正在保存'
                })
    },
    hideLoading(){
        this.$vux.loading.hide();
    },
    imgclick(e){
      console.log(e);
      this.imglist = [];
      this.imglist.push({
        src:e
      });
      var _this = this;
      setTimeout(function() {
        _this.$refs.previewer.show(0);
      }, 100);

    },
    buy(){
      if(!this.name){
        this.$vux.toast.show({
                        text: '请输入真实姓名',
                        type: 'warn'
                    })
      }
      if (!MyUtil.validateMobile(this.number)){
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type:'warn'
          })
        return;
      }
      let nums = 0;
      let goodsinfo = [];
      let isum = 0;
      this.showlist = [];
      var _this = this;
      this.goodslist.forEach(function(a){
        nums+=a.number;
        if(a.number > 0){
          goodsinfo.push({goodsid:a.id,number:a.number});
          isum += a.number*a.price;
          _this.showlist.push({label:a.goodsname,value:a.number});
        }

      })

      if(nums == 0){
        this.$vux.toast.show({
          text: '请选择一件商品',
          type:'warn'
          })
        return;
      }
      //console.log(this.goodslist[0].number);
      this.sum = '¥'+isum.toFixed(2);
      this.showToast = true;

    },
    saveOrder(){
      this.showToast = false;
      let goodsinfo = [];
      this.goodslist.forEach(function(a){

        if(a.number > 0){
          goodsinfo.push({goodsid:a.id,number:a.number});
        }

      })

      this.showLoading();
      var _this = this;
      if(this.$route.query.billcode){
        HttpUtil.post('billInfo/updateBill',
      {
          goodsinfo:JSON.stringify(goodsinfo),
          tenant:this.$store.state.vux.tenant,
          name:_this.name,
          tel:_this.number,
          remark:_this.memo,
          wxid:_this.$store.state.vux.snsUserInfo.openId,
          nick:_this.$store.state.vux.snsUserInfo.nickname,
          billdate:_this.billdate,
          billcode:this.$route.query.billcode

      },function(data){
          if(data.result =="success"){
              _this.$vux.toast.show({
              text: '修改成功',
              type: 'success'
          })
          _this.$router.push('/order');
          }else{
            _this.$vux.toast.show({
              text: '修改失败',
              type: 'warn'
          })
          }

          _this.hideLoading();
      })
      }else{
        HttpUtil.post('billInfo/saveBill',
      {
          goodsinfo:JSON.stringify(goodsinfo),
          tenant:this.$store.state.vux.tenant,
          name:_this.name,
          tel:_this.number,
          remark:_this.memo,
          wxid:_this.$store.state.vux.snsUserInfo.openId,
          nick:_this.$store.state.vux.snsUserInfo.nickname

      },function(data){
          if(data.result =="success"){
              _this.$vux.toast.show({
              text: '保存成功',
              type: 'success'
          })
          _this.$router.push('/order');
          }
          else{
            _this.$vux.toast.show({
              text: '保存失败',
              type: 'warn'
          })
          }

          _this.hideLoading();
      })
      }


    }
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    XHeader,
    CellBox,
    Panel,
    GoodsList,
    Previewer,
    XButton,
    XInput,
    XTextarea,
    XDialog,
    FormPreview,
    Flexbox, FlexboxItem
  }
}
</script>
<style lang="less">
  .info{
    margin-left: 10px;
  }

</style>
