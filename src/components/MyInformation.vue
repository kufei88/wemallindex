<<template>
  <div style="padding-bottom: 50px">
    <x-header :left-options="{ showBack: false }" class="header"
      >个人中心</x-header
    >
    <div class="main">
      <div class="mainheader">
        <img :src="headImgUrl" class="headImg" />
        <div class="nick"><span>公司名称</span>{{ username }}</div>
      </div>
      <group label-width="5em">
        <cell title="信誉额度">{{ maxDebt.toFixed(2) }}元/{{ payDate }}天</cell>
        <cell title="欠款">{{ balance.toFixed(2) }}元</cell>

        <cell :title="limitDebtTitle"
          >{{ Math.abs(lostDebt).toFixed(2) }}元</cell
        >
        <cell title="欠款天数">{{ maxDay }}天</cell>
        <cell :title="limitDayTitle"
          >{{ maxDay == 0 ? 0 : Math.abs(payDate - maxDay) }}天</cell
        >
      </group>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showPass">
        <group title="修改密码" style="width:300px">
          <x-input type="password" title="新密码" v-model="pass"></x-input>
          <x-input type="password" title="密码确认" v-model="repass"></x-input>
        </group>
        <flexbox style="padding:10px">
          <flexbox-item>
            <x-button type="primary" @click.native="modify_pass">确定</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="warn" @click.native="showPass = false"
              >取消</x-button
            >
          </flexbox-item>
        </flexbox>
      </x-dialog>
    </div>
    <x-button @click.native="showSupplierSellQuery" v-show="type=='供应商'||type=='客户及供应商'">查销售</x-button>
    <x-button @click.native="showContact">联系我们</x-button>
    <x-button @click.native="showPass = true">修改密码</x-button>
    <x-button @click.native="logout">退出登录</x-button>
  </div>
</template>
<
<script>
import {
  XHeader,
  Divider,
  XInput,
  Group,
  XButton,
  Toast,
  Cell,
  Qrcode,
  XDialog,
  TransferDomDirective as TransferDom,
  Flexbox,
  FlexboxItem
} from "vux";
import HttpUtil from "../util/HttpUtil";
import MyUtil from "../util/MyUtil";
import { mapState } from "vuex";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      pass: "",
      repass: "",
      balance: 0,
      maxDebt: 0,
      lostDebt: 0,
      maxDay: 0,
      number: "",
      code: "",
      limitDebtTitle: "剩余额度",
      limitDayTitle: "剩余天数",
      payDate: 0,
      showPass: false,
      shopcode:
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc8423586aa004b0a&redirect_uri=http%3a%2f%2fwww.jishengsoft.com%2fredirect%2fredirectwemall.asp&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    };
  },
  methods: {
    showContact() {
      this.$router.push("/contact");
    },
    showSupplierSellQuery(){
      this.$router.push("/supplier_sellQuery");
    },
    getClientInformation() {
      let _this = this;
      HttpUtil.get(
        "bill/getClientCredit.do",
        { client: this.username },
        function(data) {
          console.log(data);
          _this.balance = data.endBalance;
          _this.maxDebt = data.maxDebt;
          _this.lostDebt =
            data.maxDebt == 0 ? 0 : data.maxDebt - data.endBalance;
          _this.limitDebtTitle = _this.lostDebt < 0 ? "超出额度" : "剩余额度";
          _this.maxDay = data.maxDay;

          _this.payDate = data.payDate;
          _this.limitDayTitle =
            _this.payDate - _this.maxDay < 0 ? "超出天数" : "剩余天数";
        }
      );
    },
    logout() {
      let _this = this;

      HttpUtil.get(
        "wechat/logout.do",
        { openid: this.$store.state.vux.snsUserInfo.openId },
        function(data) {
          _this.$store.commit("updateUsername", "");
          _this.$router.push({ path: "/" });
        }
      );
    },
    modify_pass() {
      let _this = this;
      if (!this.pass) {
        this.$vux.toast.show({
          text: "请输入密码",
          type: "warn"
        });
        return;
      }
      if (this.pass != this.repass) {
        this.$vux.toast.show({
          text: "两次密码不一致",
          type: "warn"
        });
        return;
      }
      HttpUtil.post(
        "bill/update_client_pass.do",
        { client: this.username, pass: this.pass },
        function(data) {
          if (data > 0) {
            _this.$vux.toast.show({
              text: "修改成功",
              type: "success"
            });
            _this.showPass = false;
          }
        }
      );
    }
  },
  computed: {
    ...mapState({
      nick: state => state.vux.snsUserInfo.nickname,
      headImgUrl: state => state.vux.snsUserInfo.headImgUrl,
      username: state => state.vux.snsUserInfo.username,
      type:state => state.vux.snsUserInfo.type
    })
  },
  mounted() {
    console.log(this.type);
    this.getClientInformation();
  },
  components: {
    XHeader,
    Divider,
    XInput,
    Group,
    XButton,
    Toast,
    Cell,
    Qrcode,
    XDialog,
    Flexbox,
    FlexboxItem
  }
};
</script>
<style>
.main {
  padding: 10px;
}
.mainheader {
  height: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;
}
.header {
  background: linear-gradient(90deg, #1a961a, #6bc2f7);
  box-shadow: 0 2px 5px rgba(255, 98, 98, 0.4);
}
.headImg {
  width: 50px;
  height: 50px;
  float: left;
}
.nick {
  float: left;
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
.nick span {
  color: #a1a1a1;
  margin-right: 5px;
}
.numberform h1 {
  text-align: center;
  color: #a1a1a1;
}
</style>
