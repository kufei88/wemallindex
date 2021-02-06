
<template >
  <div v-if="unRegister">
    <group title="请使用用户名和密码登录" style="margin-top:10px">
      <x-input title="用户名" placeholder="请输入用户名" v-model="card" required></x-input>
      <x-input title="密码" type="password" placeholder="请输入密码" v-model="password" required></x-input>
    </group>
    <div style="margin-top:50px">
      <x-button type="primary" @click.native="addClient">登录</x-button>
    </div>
  </div>
  <div style="padding-bottom: 50px" v-else>
    <div class="food_container">
      <x-header :left-options="{showBack: false}" class="header">热销商品</x-header>
      <a class="iconfont" :class="{buyActive:total>0}" @click="buy">保存</a>
      <div v-transfer-dom>
        <previewer :list="imglist" ref="previewer"></previewer>
      </div>
      <!--
      <section class="sort_container">

        <div :class="{choose_type:sortBy == 'food'}">
          <tab style="width:100px">
            <tab-item @on-item-click="chooseType('food')">
              {{foodTitle}}
              <svg
                width="10"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                class="sort_icon"
              >
                <polygon points="0,3 10,3 5,8" />
              </svg>
            </tab-item>
          </tab>
          <transition name="showlist" v-show="category">
            <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
              <section class="category_right">
                <ul>
                  <li
                    v-for="(item,index) in categoryDetail"
                    :key="item.id"
                    class="category_right_li"
                    @click="getCategoryIds(item.typeCode, item.type)"
                    :class="{category_right_choosed: restaurant_category_ids == item.typeCode || (!restaurant_category_ids)&&index == 0}"
                  >{{item.type}}</li>
                </ul>
              </section>
            </section>
          </transition>
        </div>
      </section>
      -->
      <section class="buy_cart_container">
        <section @click="toggleCartList" class="cart_icon_num">
          <div
            class="cart_icon_container"
            :class="{cart_icon_activity: total > 0, move_in_cart:receiveInCart}"
            ref="cartContainer"
          >
            <span v-if="total" class="cart_list_length">{{total}}</span>
            <svg class="cart_icon">
              <symbol viewBox="0 0 58 58" id="cart-icon">
                <defs>
                  <filter
                    id="a"
                    width="200%"
                    height="200%"
                    x="-50%"
                    y="-50%"
                    filterUnits="objectBoundingBox"
                  >
                    <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur
                      stdDeviation="1.5"
                      in="shadowOffsetOuter1"
                      result="shadowBlurOuter1"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                      in="shadowBlurOuter1"
                      result="shadowMatrixOuter1"
                    />
                    <feMerge>
                      <feMergeNode in="shadowMatrixOuter1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <path
                    id="b"
                    d="M7.614 4.051c-1.066.086-1.452-.398-1.752-1.584C5.562 1.28.33 5.88.33 5.88l3.71 19.476c0 .148-1.56 7.515-1.56 7.515-.489 2.19.292 4.27 3.56 4.32 0 0 36.917.017 36.92.047 1.979-.012 2.981-.995 3.013-3.039.03-2.043-1.045-2.978-2.987-2.993L8.83 31.192s.86-3.865 1.077-3.865c0 0-5.788.122 32.065-1.956.606-.033 2.018-.764 2.298-1.848 1.113-4.317 4.008-13.26 4.458-15.64.932-4.925 2.061-8.558-4.28-7.405 0 0-35.768 3.487-36.833 3.573z"
                  />
                </defs>
                <g fill="none" fill-rule="evenodd" filter="url(#a)" transform="translate(3 2)">
                  <g transform="translate(5.038 7.808)">
                    <mask id="c" fill="#fff">
                      <use xlink:href="#b" />
                    </mask>
                    <use fill="#FFF" xlink:href="#b" />
                    <path
                      fill="#2073C1"
                      d="M53.962 7.774l-5.701 19.305-40.78 1.574z"
                      opacity=".1"
                      mask="url(#c)"
                    />
                  </g>
                  <path
                    stroke="#FFF"
                    stroke-width="6"
                    d="M9.374 18.722S7.868 11.283 7.323 8.71C6.778 6.136 5.86 5.33 3.978 4.52 2.096 3.713.367 2.286.367 2.286"
                    stroke-linecap="round"
                  />
                  <circle cx="46" cy="51" r="4" fill="#FFF" />
                  <circle cx="12" cy="51" r="4" fill="#FFF" />
                </g>
              </symbol>
              <symbol viewBox="0 0 50 50" id="cart-minus">
                <path
                  fill-rule="evenodd"
                  stroke-width="4"
                  d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z"
                  clip-rule="evenodd"
                />
              </symbol>
              <symbol viewBox="0 0 50 50" id="cart-add">
                <path fill="none" d="M0 0h44v44H0z" />
                <path
                  fill-rule="evenodd"
                  d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z"
                  clip-rule="evenodd"
                />
              </symbol>
              <symbol viewBox="0 0 24 32" id="cart-remove">
                <path
                  fill="#bbb"
                  fill-rule="evenodd"
                  d="M21.5 10h-19c-1.1 0-1.918.896-1.819 1.992l1.638 18.016C2.419 31.104 3.4 32 4.5 32h15c1.1 0 2.081-.896 2.182-1.992l1.637-18.016A1.798 1.798 0 0 0 21.5 10zM8 28H5L4 14h4v14zm6 0h-4V14h4v14zm5 0h-3V14h4l-1 14zm2-24h-2.941l-.353-2.514C17.592.669 16.823 0 15.998 0H8c-.825 0-1.593.668-1.708 1.486L5.94 4H3a3 3 0 0 0-3 3v1h24V7a3 3 0 0 0-3-3zM8.24 2h7.52l.279 2H7.96l.28-2z"
                />
              </symbol>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon" />
            </svg>
          </div>
          <div class="cart_num">
            <div>¥ {{totalPrice}}{{$route.query.billcode?'(修改)':''}}</div>
          </div>
        </section>
        <section class="gotopay" :class="{gotopay_acitvity: total > 0}" @click="buy">
          <span>保存</span>
        </section>
      </section>
      <transition name="toggle-cart">
        <section class="cart_food_list" v-show="showCartList&&total>0">
          <section class="cart_food_details" id="cartFood">
            <ul>
              <li
                v-for="(item, index) in goodsAllList"
                v-if="item.number>0"
                :key="index"
                class="cart_food_li"
              >
                <div class="cart_list_num">
                  <p class="ellipsis">{{item.type+item.stockGoodsName}}</p>
                  <p class="ellipsis">{{item.spec}}</p>
                </div>
                <div class="cart_list_price">
                  <span>¥</span>
                  <span>{{item.stockGoodsPrice}}</span>
                </div>

                <section class="cart_list_control">
                  <x-number v-model="item.number" style="margin:0;padding:0"></x-number>
                  <!--
                  <span
                    class="cart_num"
                    v-html="item.number+'(件)'+(item.weight?(item.weight+'(斤)'):'')"
                  ></span>-->
                </section>
              </li>
            </ul>
          </section>
          <header>
            <h4>购物车</h4>
            <div @click="clearCart">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove" />
              </svg>
              <span class="clear_cart">清空</span>
            </div>
          </header>
        </section>
      </transition>
      <group style="margin-top:-50px">
        <div
          solt="title"
          style="position:fixed;color:red;z-index:100;background:#C0C0C0"
        >说明：价格仅供参考，以实际交易为准；产品左滑可查看历史和溯源。</div>
        <div style="width:30%;float:left;margin-top:30px;overflow:auto;height:600px">
          <group>
            <cell
              :class="[currentTypeIndex==0?'activeType':'nomalType']"
              @click.native="typeCilck(0,'全部')"
            >
              <span :class="[currentTypeIndex==0?'activeType':'nomalType']">全部</span>
            </cell>
            <cell
              :class="[currentTypeIndex==(index+1)?'activeType':'nomalType']"
              @click.native="typeCilck(index+1,item.type)"
              v-for="(item,index) in categoryDetail"
              v-bind:key="index+1"
            >
              <span :class="[currentTypeIndex==(index+1)?'activeType':'nomalType']">{{item.type}}</span>
            </cell>
          </group>
        </div>
        <div style="width:70%;float:left;overflow:auto;height:500px">
          <goods-list
            :list="goodslist"
            @on-click-item="itemclick($event)"
            @on-swap-click1="showSourceGoods($event)"
            @on-swap-click="history($event)"
            :showImg="showImg"
            :showPrice="showPrice"
            　
            class="goodslist"
          ></goods-list>
        </div>
      </group>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <form-preview
          header-label="金额"
          class="formpreview"
          :header-value="'¥'+totalPrice"
          :body-items="showlist"
        ></form-preview>
        <div class="weui-form-preview__ft">
          <a
            class="weui-form-preview__btn weui-form-preview__btn_default"
            @click="showToast=false"
          >取消</a>
          <a class="weui-form-preview__btn weui-form-preview__btn_primary" @click="saveOrder">确定</a>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showHistory" class="dialog-demo">
        <group style="height:500px;overflow:auto">
          <group-title slot="title">
            最近一周收货历史
            <span @click="showHistory=false" style="float:right;" class="vux-close"></span>
          </group-title>
          <chart :options="polar"></chart>

          <table style="width:100%">
            <tr class="tablehead">
              <th style="width: 30%;">日期</th>
              <th style="width: 30%;">数量</th>
              <th style="width: 30%;">单价</th>
            </tr>

            <tr v-for="(item,index ) in historyList" :class="{odd:index%2==1}" :key="index">
              <td>{{item.defineNine}}</td>
              <td>{{item.stockGoodsNum}}</td>
              <td>{{item.stockGoodsPrice}}</td>
            </tr>
          </table>
        </group>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showModify">
        <group title="数量录入" label-width="4.5em" label-margin-right="1em" label-align="justify">
          <div>
            {{modifyGoods.stockGoodsName}}
            <badge :text="modifyGoods.stockGoodsPrice+'元/'+modifyGoods.unit"></badge>
            <badge v-show="modifyGoods.spec" :text="modifyGoods.spec"></badge>
          </div>
          <x-input title="数量" type="number" v-model="modifyGoods.number" ref="number"></x-input>
          <x-input
            title="金额"
            readonly
            type="number"
            :value="modifyGoods.weight?modifyGoods.weight*modifyGoods.stockGoodsPrice:modifyGoods.number*modifyGoods.stockGoodsPrice"
          ></x-input>

          <x-input title="备注" v-model="modifyGoods.remark"></x-input>
        </group>

        <div class="weui-form-preview__ft">
          <a class="weui-form-preview__btn weui-form-preview__btn_default" @click="mondifyCancel">取消</a>
          <a class="weui-form-preview__btn weui-form-preview__btn_primary" @click="modifyOk">确定</a>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showSource">
        <group label-width="4.5em" label-margin-right="1em" label-align="justify">
          <group-title slot="title">
            溯源
            <span @click="showSource=false" style="float:right;" class="vux-close"></span>
          </group-title>
          <x-input title="供应商" readonly :value="sourceGoods.company"></x-input>
          <x-input title="产地" readonly :value="sourceGoods.area"></x-input>
          <x-input title="到货日期" readonly :value="sourceGoods.goodsDate"></x-input>

          <x-input title="销售单位" readonly :value="sourceGoods.sellCompany"></x-input>
        </group>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import {
  Tabbar,
  TabbarItem,
  Group,
  Cell,
  XHeader,
  CellBox,
  Panel,
  AjaxPlugin,
  TransferDom,
  Previewer,
  XButton,
  XInput,
  XTextarea,
  XDialog,
  FormPreview,
  Flexbox,
  FlexboxItem,
  Msg,
  Tab,
  TabItem,
  GroupTitle,
  XNumber,
  Scroller,
  Badge
} from "vux";
import GoodsList from "./GoodsList";
import HttpUtil from "../util/HttpUtil";
import MyUtil from "../util/MyUtil";

export default {
  directives: {
    TransferDom
  },
  data() {
    let data = [];

    return {
      show: true,
      type: "5",
      showImg: false, //是否显示图片
      showModify: false,
      modifyGoods: {},
      modifyNumber: "",
      modifyWeight: 0,
      goodslist: [],
      goodsAllList: [],
      imglist: [],
      buylist: [],
      number: "",
      name: "",
      memo: "",
      showPrice: true,
      currentTypeIndex: 0,
      showToast: false,
      sum: "",
      showlist: [],
      billdate: "",
      unRegister: true,
      wxid: "",
      receiveInCart: false,
      totalPrice: 0,
      showCartList: false,
      card: "",
      password: "",
      message:
        "您好！要完成网络订货请先与供应商确认，谢谢！把该序列号发给供应商",
      buttons: [
        {
          type: "primary",
          text: "复制序列号",
          onClick: this.copyWxid.bind(this)
        }
      ],
      sortBy: "",
      foodTitle: "全部物品",
      headTitle: "全部物品",
      category: null,
      restaurant_category_ids: "001",
      categoryDetail: this.getGoodsTypeList(),
      showHistory: false,
      historyList: [],
      showSource: false,
      sourceGoods: {
        company: "",
        area: "",
        goodsDate: "",
        sellCompany: ""
      },
      polar: {
        title: {
          text: ""
        },
        legend: {
          data: ["销量"]
        },

        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20]
          }
        ],
        animationDuration: 2000
      }
    };
  },
  Destroyed() {
    console.log("aaaa");

    localStorage.setItem("goodsList", JSON.stringify(this.goodsAllList));
  },
  mounted() {
    let _this = this;

    if (!this.$store.state.vux.snsUserInfo.username) {
      if (this.$store.state.vux.snsUserInfo.openId) {
        _this.unRegister = true;
        _this.wxid = _this.$store.state.vux.snsUserInfo.openId;
        return;
      }
      let code = _this.$geturlpara.getUrlKey("code");
      let state = _this.$geturlpara.getUrlKey("state");
      let username = _this.$geturlpara.getUrlKey("username");
      this.$store.commit("updateTenant", { tenant: username });
      HttpUtil.get(
        "wechat/clientLogin.do",
        { code: code, state: state },
        function(data) {
          console.log(data);
          _this.wxid = data.openId;
          if (data.username != "null") {
            _this.unRegister = false;
            _this.getGoodsList();
            _this.getShowPrice();
            _this.name = data.name;
            _this.number = data.tel;
          }
          _this.$store.commit("updateSnsUserInfo", data);
        }
      );

      /*
      HttpUtil.get('wechat/getWechatUser',{},function(data){

      })
      */
    } else {
      console.log(_this.$store.state.vux.snsUserInfo.username != "null");
      if (_this.$store.state.vux.snsUserInfo.username != "null") {
        _this.unRegister = false;
        _this.wxid = _this.$store.state.vux.snsUserInfo.openId;
        _this.getGoodsList();
        _this.getShowPrice();
        _this.name = _this.$store.state.vux.snsUserInfo.name;
        _this.number = _this.$store.state.vux.snsUserInfo.tel;
      }
    }
  },
  methods: {
    onInput(value) {},
    onDelete() {},
    typeCilck(index, type) {
      this.currentTypeIndex = index;
      this.foodTitle = type;
      this.filterType();
    },
    numberChange() {
      console.log(123);
      this.modifyGoods.number = parseFloat(this.modifyGoods.number);
      console.log(this.modifyGoods.number);
    },
    getGoodsList: function() {
      let _this = this;
      let templist = [];
      let localList = JSON.parse(localStorage.getItem("goodsList"));
      console.log(localList);
      if (this.$route.query.billcode) {
        HttpUtil.get(
          "bill/getBillByBillcode.do",
          { billCode: this.$route.query.billcode },
          function(data) {
            data.forEach(function(item) {
              item.weight = 0;
              item.id = item.goodsid;
              item.goodsname = item.goodsName;
              item.number = item.stockGoodsNum;
              if (item.remark) {
                _this.memo = item.remark;
              }
              if (item.billdate) {
                _this.billdate = item.billdate;
              }

              templist.push(item);
            });
            _this.goodslist = templist;
            _this.goodsAllList = templist;
          }
        );
      } else {
        HttpUtil.get("goods/getSellGoodsList.do", {}, function(data) {
          data.forEach(function(item, index) {
            item.weight = 0;
            if (localList[index]) {
              item.number = localList[index].number;
            } else {
              item.number = 0;
            }

            templist.push(item);
          });
          _this.goodslist = templist;
          _this.goodsAllList = templist;
        });
      }
    },
    getShowPrice() {
      let _this = this;
      HttpUtil.get(
        "wechat/getMemValue.do",
        { memName: "订货公众号不显示价格" },
        function(data) {
          _this.showPrice = data.result != "是";
        }
      );
    },
    getHistoryList(goodCode) {
      let _this = this;
      HttpUtil.get(
        "bill/getLastWeekSellList.do",
        {
          client: this.$store.state.vux.snsUserInfo.username,
          goodCode: goodCode
        },
        function(data) {
          _this.historyList = data;
          if (_this.historyList.length == 0) {
            _this.$vux.toast.show({
              text: "该产品最近没有购买记录",
              type: "text"
            });
          } else {
            let xdata = [];
            let ydata = [];
            data.forEach(function(item) {
              xdata.push(item.defineNine);
              ydata.push(item.stockGoodsNum);
            });
            _this.polar.xAxis.data = xdata;
            _this.polar.series[0].data = ydata;
            _this.showHistory = true;
            console.log(_this.showHistory);
          }
        }
      );
    },
    getGoodsTypeList() {
      let _this = this;
      HttpUtil.get("goods/getSellGoodsType.do", {}, function(data) {
        _this.categoryDetail = data;
      });
    },
    filterType() {
      let _this = this;
      this.goodslist = this.goodsAllList.filter(function(item) {
        return (
          _this.foodTitle.trim() == "全部" ||
          item.type == _this.foodTitle.trim()
        );
      });
      console.log(this.goodslist);
    },
    chooseType(type) {
      if (this.sortBy !== type) {
        this.sortBy = type;
        //food选项中头部标题发生改变，需要特殊处理
        if (type == "food") {
          this.foodTitle = "分类";
        } else {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      } else {
        //再次点击相同选项时收回列表
        this.sortBy = "";
        if (type == "food") {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      }
    },
    selectCategoryName() {},
    clearCart() {
      this.goodsAllList.forEach(function(item) {
        item.number = 0;
      });
      this.showCartList = false;
    },
    addToCart(item) {
      item.number++;
    },
    removeOutCart(item) {
      if (item.number) {
        item.number--;
      }
    },
    toggleCartList() {
      this.total > 0 ? (this.showCartList = !this.showCartList) : true;
    },
    getCategoryIds(id, name) {
      this.restaurant_category_ids = id;
      this.sortBy = "";
      this.foodTitle = this.headTitle = name;
      this.filterType();
    },
    getImgPath() {},
    copyWxid() {
      this.$copyText(this.wxid).then(function(e) {}, function(e) {});
    },
    showLoading() {
      this.$vux.loading.show({
        text: "正在保存"
      });
    },
    hideLoading() {
      this.$vux.loading.hide();
    },
    itemclick(e) {
      console.log(e);
      this.modifyGoods = e;
      this.modifyNumber = e.number;
      if (this.modifyGoods.number == 0) {
        this.modifyGoods.number = "";
      }

      this.modifyWeight = e.weight;
      this.showModify = true;
      this.$nextTick(() => {
        this.$refs.number.focus;
      });
    },
    mondifyCancel() {
      this.modifyGoods.number = this.modifyNumber;
      this.modifyGoods.weight = this.modifyWeight;
      this.showModify = false;
    },
    modifyOk() {
      if (!this.modifyGoods.number && this.modifyGoods.weight) {
        this.$vux.toast.show({
          text: "数量不能为0",
          type: "warn"
        });
        return;
      }
      this.showModify = false;
    },
    history(e) {
      console.log(e);
      this.getHistoryList(e);
    },
    showSourceGoods(e) {
      let _this = this;
      HttpUtil.get("goods/getGoodsSource.do", { goodsCode: e }, function(data) {
        _this.sourceGoods = data;
        _this.showSource = true;
      });
    },
    buy() {
      if (this.total == 0) {
        return;
      }
      let nums = 0;
      let goodsinfo = [];
      let isum = 0;
      this.showlist = [];
      var _this = this;
      this.goodsAllList.forEach(function(a) {
        if (a.number > 0) {
          _this.showlist.push({
            label: a.type + a.stockGoodsName,
            value: a.number
          });
        }
      });

      this.showToast = true;
    },
    showMoveDotFun(showMoveDot, elLeft, elBottom) {
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      this.elLeft = elLeft;
      this.elBottom = elBottom;
    },
    beforeEnter(el) {
      el.style.transform = `translate3d(0,${37 +
        this.elBottom -
        this.windowHeight}px,0)`;
      el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
      el.children[0].style.opacity = 0;
    },
    afterEnter(el) {
      el.style.transform = `translate3d(0,0,0)`;
      el.children[0].style.transform = `translate3d(0,0,0)`;
      el.style.transition =
        "transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.children[0].style.transition = "transform .55s linear";
      this.showMoveDot = this.showMoveDot.map(item => false);
      el.children[0].style.opacity = 1;
      el.children[0].addEventListener("transitionend", () => {
        this.listenInCart();
      });
      el.children[0].addEventListener("webkitAnimationEnd", () => {
        this.listenInCart();
      });
    },

    addClient() {
      if (!this.card) {
        this.$vux.alert.show({
          title: "提示",
          content: "请输入卡号"
        });
        return;
      }

      if (!this.wxid) {
        this.$vux.alert.show({
          title: "提示",
          content: "页面状态不对，请关闭重新进入"
        });
        return;
      }
      let _this = this;
      console.log(this.birthday);

      HttpUtil.post(
        "wechat/login.do",
        {
          username: this.card,
          password: this.password,
          openid: this.wxid
        },
        function(data) {
          console.log(data);
          _this.hideLoading();
          if (data.result == "success") {
            _this.$store.commit("updateUsername", { username: data.result1 });

            // _this.client = data.result1;
            _this.client = data.result1;
            _this.unRegister = false;
            _this.getGoodsList();
          } else if (data.result == "notUser") {
            _this.$vux.toast.show({
              text: "用户名不存在",
              type: "warn"
            });
          } else if (data.result == "notClient") {
            _this.$vux.toast.show({
              text: "您不是客户",
              type: "warn"
            });
          } else if (data.result == "failed") {
            _this.$vux.toast.show({
              text: "密码错误",
              type: "warn"
            });
          }
        },
        function(error) {
          _this.hideLoading();
        }
      );
    },
    saveOrder() {
      this.showToast = false;
      let goodsinfo = [];
      this.goodsAllList.forEach(function(a) {
        if (a.number > 0) {
          console.log(a);
          goodsinfo.push({
            goodsCode: a.goodCode,
            number: a.number,
            price: a.stockGoodsPrice,
            unit: a.unit,
            weight: a.weight,
            remark: a.remark
          });
        }
      });
      let _this = this;
      let postData = {
        client: _this.$store.state.vux.snsUserInfo.username,
        sum: _this.totalPrice,
        goods: goodsinfo,
        billDate: _this.billdate,
        billCode: this.$route.query.billcode,
        notPay: true
      };
      this.showLoading();

      if (this.$route.query.billcode) {
        HttpUtil.post(
          "bill/editOrder.do",
          {
            jsonstr: JSON.stringify(postData)
          },
          function(data) {
            if (data.result == "success") {
              _this.$vux.toast.show({
                text: "修改成功",
                type: "success"
              });
              _this.clear();
              _this.$router.push("/order");
            } else {
              _this.$vux.toast.show({
                text: "修改失败",
                type: "warn"
              });
            }

            _this.hideLoading();
          },
          function(error) {
            _this.hideLoading();
            _this.$vux.toast.show({
              text: "修改失败",
              type: "warn"
            });
          }
        );
      } else {
        HttpUtil.post(
          "bill/saveOrder.do",
          {
            jsonstr: JSON.stringify(postData)
          },
          function(data) {
            if (data.state == "success") {
              _this.$vux.toast.show({
                text: "保存成功",
                type: "success"
              });
              _this.clear();
              _this.$router.push("/order");
            } else {
              _this.$vux.toast.show({
                text: "保存失败",
                type: "warn"
              });
            }

            _this.hideLoading();
          },
          function(error) {
            _this.hideLoading();
            _this.$vux.toast.show({
              text: "保存失败",
              type: "warn"
            });
          }
        );
      }
    },
    clear() {
      localStorage.setItem("goodsList", "{}");
    }
  },
  computed: {
    total: function() {
      let sum = 0;
      let sumPrice = 0;
      this.goodsAllList.forEach(function(item) {
        sum += parseFloat(item.number);
        sumPrice += item.number * item.stockGoodsPrice;
      });
      localStorage.setItem("goodsList", JSON.stringify(this.goodsAllList));
      this.totalPrice = sumPrice.toFixed(2);
      if (!sum) {
        this.showCartList = false;
      }
      return sum;
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
    Flexbox,
    FlexboxItem,
    Msg,
    Tab,
    TabItem,
    GroupTitle,
    XNumber,
    Scroller,
    Badge
  }
};
</script>
<style lang="scss" scoped>
.echarts {
  height: 300px;
  width: 300px;
}
.odd {
  background: #c9c9cc;
}
.tablehead {
  background: #555555;
  color: #f0f0f0;
}
.tablehead th {
  padding: 2px;
}
td {
  text-align: center;
  padding: 2px;
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
.formpreview {
  font-size: 0.8rem;
}
.iconfont {
  font-size: 1.3rem;
  color: #fff;
  font-weight: bold;
  background-color: #535356;
  width: 5rem;
  height: 1.9rem;
  line-height: 1.9rem;
  text-align: center;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 20;
}
.buyActive {
  background-color: #4cd964;
}
.header {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 2rem;
  background-color: #3d3d3f;
}
.goodslist {
  margin-top: 1.8rem;
}
.info {
  margin-left: 10px;
}
@import "src/styles/mixin";
.food_container {
  padding-top: 3.6rem;
}
.sort_container {
  background-color: #fff;
  border-bottom: 0.025rem solid #f1f1f1;
  position: fixed;
  top: 1.95rem;
  right: 0;
  width: 100%;
  display: flex;
  z-index: 13;
  box-sizing: border-box;
  .sort_item {
    @include sc(0.7rem, #9e9e9e);
    @include wh(33.3%, 1.6rem);
    text-align: center;
    line-height: 1rem;
    .sort_item_container {
      @include wh(100%, 100%);
      position: relative;
      z-index: 14;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 0.3rem;
      .sort_item_border {
        height: 1rem;
        border-right: 0.025rem solid $bc;
      }
    }
    .sort_icon {
      vertical-align: middle;
      transition: all 0.3s;
      fill: #666;
    }
  }
  .choose_type {
    .sort_item_container {
      .category_title {
        color: $blue;
      }
      .sort_icon {
        transform: rotate(180deg);
        fill: $blue;
      }
    }
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .sort_detail_type {
    width: 100%;
    position: absolute;
    display: flex;
    top: 1.9rem;
    left: 0;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
  }
  .category_container {
    .category_left {
      flex: 1;
      background-color: #f1f1f1;
      height: 16rem;
      overflow-y: auto;
      span {
        @include sc(0.5rem, #666);
        line-height: 1.8rem;
      }
      .category_left_li {
        @include fj;
        padding: 0 0.5rem;
        .category_icon {
          @include wh(0.8rem, 0.8rem);
          vertical-align: middle;
          margin-right: 0.2rem;
        }
        .category_count {
          background-color: #ccc;
          @include sc(0.4rem, #fff);
          padding: 0 0.1rem;
          border: 0.025rem solid #ccc;
          border-radius: 0.8rem;
          vertical-align: middle;
          margin-right: 0.25rem;
        }
        .category_arrow {
          vertical-align: middle;
        }
      }
      .category_active {
        background-color: #fff;
      }
    }
    .category_right {
      flex: 1;
      background-color: #fff;
      padding-left: 0.5rem;
      height: 10rem;
      overflow-y: auto;
      .category_right_li {
        @include sc(0.7rem, #9e9e9e);
        display: block;
        list-style: none;
        width: 33%;
        height: 2rem;
        float: left;
        border-bottom: 0.15rem solid white;
        line-height: 2rem;
        text-align: center;
      }
      .category_right_choosed {
        color: #ec1c43;
        border-bottom: 0.15rem solid #ec1c43;
      }
    }
  }
  .sort_list_container {
    width: 100%;
    .sort_list_li {
      height: 2.5rem;
      display: flex;
      align-items: center;
      svg {
        @include wh(0.7rem, 0.7rem);
        margin: 0 0.3rem 0 0.8rem;
      }
      p {
        line-height: 2.5rem;
        flex: auto;
        text-align: left;
        text-indent: 0.25rem;
        border-bottom: 0.025rem solid $bc;
        @include fj;
        align-items: center;
        span {
          color: #666;
        }
      }
      .sort_select {
        span {
          color: $blue;
        }
      }
    }
  }
  .filter_container {
    flex-direction: column;
    align-items: flex-start;
    min-height: 10.6rem;
    background-color: #f1f1f1;
    .filter_header_style {
      @include sc(0.4rem, #333);
      line-height: 1.5rem;
      height: 1.5rem;
      text-align: left;
      padding-left: 0.5rem;
      background-color: #fff;
    }
    .filter_ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.5rem;
      background-color: #fff;
      .filter_li {
        display: flex;
        align-items: center;
        border: 0.025rem solid #eee;
        @include wh(4.7rem, 1.4rem);
        margin-right: 0.25rem;
        border-radius: 0.125rem;
        padding: 0 0.25rem;
        margin-bottom: 0.25rem;
        svg {
          @include wh(0.8rem, 0.8rem);
          margin-right: 0.125rem;
        }
        span {
          @include sc(0.4rem, #333);
        }
        .filter_icon {
          @include wh(0.8rem, 0.8rem);
          font-size: 0.5rem;
          border: 0.025rem solid $bc;
          border-radius: 0.15rem;
          margin-right: 0.25rem;
          line-height: 0.8rem;
          text-align: center;
        }
        .activity_svg {
          margin-right: 0.25rem;
        }
        .selected_filter {
          color: $blue;
        }
      }
    }
    .confirm_filter {
      display: flex;
      background-color: #f1f1f1;
      width: 100%;
      padding: 0.3rem 0.2rem;
      .filter_button_style {
        @include wh(50%, 1.8rem);
        font-size: 0.8rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
      }
      .clear_all {
        background-color: #fff;
        margin-right: 0.5rem;
        border: 0.025rem solid #fff;
      }
      .confirm_select {
        background-color: #56d176;
        color: #fff;
        border: 0.025rem solid #56d176;
        span {
          color: #fff;
        }
      }
    }
  }
}
.showcover-enter-active,
.showcover-leave-active {
  transition: opacity 0.3s;
}
.showcover-enter,
.showcover-leave-active {
  opacity: 0;
}
.back_cover {
  position: fixed;
  @include wh(100%, 100%);
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}

.buy_cart_container {
  position: fixed;
  background: linear-gradient(90deg, #1a961a, #6bc2f7);
  top: 0rem;
  left: 0;
  z-index: 130;
  display: flex;
  @include wh(100%, 2rem);
  .cart_icon_num {
    flex: 1;
    .cart_icon_container {
      display: flex;
      background: linear-gradient(90deg, #1a961a, #6bc2f7);
      position: absolute;
      padding: 0.4rem;
      border: 0.18rem solid #444;
      border-radius: 50%;
      left: 0.5rem;
      top: 0.1rem;
      .cart_icon {
        @include wh(1.2rem, 1.2rem);
      }
      .cart_list_length {
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        background-color: #ff461d;
        line-height: 0.7rem;
        text-align: center;
        border-radius: 50%;
        border: 0.025rem solid #ff461d;
        min-width: 0.7rem;
        height: 0.7rem;
        @include sc(0.5rem, #fff);
        font-family: Helvetica Neue, Tahoma, Arial;
      }
    }
    .move_in_cart {
      animation: mymove 0.5s ease-in-out;
    }
    .cart_icon_activity {
      background-color: #3190e8;
    }
    .cart_num {
      @include ct;
      left: 3.5rem;

      div {
        color: #fff;
      }
      div:nth-of-type(1) {
        font-size: 0.8rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
      }
      div:nth-of-type(2) {
        font-size: 0.4rem;
      }
    }
  }
  .gotopay {
    position: absolute;
    right: 0;
    background: linear-gradient(90deg, #1a961a, #6bc2f7);
    @include wh(4rem, 100%);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .gotopay_button_style {
      @include sc(0.7rem, #fff);
      font-weight: bold;
    }
  }
  .gotopay_acitvity {
    background-color: #4cd964;
    font-size: 0.7rem;
    color: #fff;
    font-weight: bold;
  }
}
.cart_food_list {
  position: fixed;
  width: 100%;
  padding-bottom: 0rem;
  z-index: 112;
  top: 2rem;
  left: 0;
  background-color: #fff;
  header {
    @include fj;
    align-items: center;
    padding: 0.3rem 0.6rem;
    background-color: #eceff1;
    svg {
      @include wh(0.6rem, 0.6rem);
      vertical-align: middle;
    }
    h4 {
      @include sc(0.7rem, #666);
    }
    .clear_cart {
      @include sc(0.6rem, #666);
    }
  }
  .cart_food_details {
    background-color: #fff;
    max-height: 20rem;
    overflow-y: auto;
    .cart_food_li {
      @include fj;
      padding: 0.6rem 0.5rem;
      .cart_list_num {
        width: 45%;
        p:nth-of-type(1) {
          @include sc(0.7rem, #666);
          font-weight: bold;
        }
        p:nth-of-type(2) {
          @include sc(0.4rem, #666);
        }
      }
      .cart_list_price {
        font-size: 0;
        span:nth-of-type(1) {
          @include sc(0.6rem, #f60);
          font-family: Helvetica Neue, Tahoma;
        }
        span:nth-of-type(2) {
          @include sc(0.7rem, #f60);
          font-family: Helvetica Neue, Tahoma;
          font-weight: bold;
        }
      }
      .cart_list_control {
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        svg {
          @include wh(0.9rem, 0.9rem);
          fill: #3190e8;
        }
        .specs_reduce_icon {
          fill: #999;
        }
        .cart_num {
          @include sc(0.65rem, #666);
          min-width: 1rem;
          text-align: center;
          font-family: Helvetica Neue, Tahoma;
        }
      }
    }
  }
}

.toggle-cart-enter-active,
.toggle-cart-leave-active {
  transition: all 0.3s ease-out;
}
.toggle-cart-enter,
.toggle-cart-leave-active {
  transform: translateY(-100%);
}
.showlist-enter-active,
.showlist-leave-active {
  transition: all 0.3s;
  transform: translateY(0);
}
.showlist-enter,
.showlist-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}
.dialog-demo {
  height: 500px;
}
.activeType {
  background: #fff;
  color: #1a961a;
}
.nomalType {
  background: #eee5de;
}
</style>
