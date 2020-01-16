<template>
  <div>
    <swipeout>
      <swipeout-item
        class="weui-media-box weui-media-box_text"
        v-for="(item, index) in list"
        transition-mode="follow"
        :key="index"
      >
        <div slot="right-menu">
          <swipeout-button
            type="primary"
            @click.native="onSwapClick(item.goodCode)"
            >历史</swipeout-button
          >
          <swipeout-button
            type="warn"
            @click.native="onSwapClick1(item.goodCode)"
            >溯源</swipeout-button
          >
        </div>
        <div slot="content">
          <div class="weui-media-box_appmsg">
            <div
              class="weui-media-box__bd"
              @click.prevent="onItemClick(item)"
              :class="{ check: item.number }"
            >
              <flexbox>
                <flexbox-item :span="8 / 16">
                  <div class="weui-media-box__desc">
                    {{
                      item.stockGoodsName +
                        (item.spec ? "(" + item.spec + ")" : "")
                    }}
                  </div>
                </flexbox-item>
                <flexbox-item :span="8 / 16">
                  <div class="weui-media-box__desc">
                    {{
                      (showPrice ? item.stockGoodsPrice : "--") +
                        "元/" +
                        item.unit
                    }}
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  XNumber,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton
} from "vux";
export default {
  name: "goodsList",
  components: {
    Flexbox,
    FlexboxItem,
    XNumber,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },

  props: {
    list: Array,
    showImg: Boolean,
    showPrice: Boolean
  },

  methods: {
    onItemClick(item) {
      this.$emit("on-click-item", item);
    },
    onImgClick(src) {
      this.$emit("on-click-img", src);
    },
    findbyindex(currentValue) {
      return (currentValue.index = this.index);
    },
    onSwapClick(goodCode) {
      this.$emit("on-swap-click", goodCode);
    },
    onSwapClick1(goodCode) {
      this.$emit("on-swap-click1", goodCode);
    }
  }
};
</script>
<style scoped>
.weui-cell:before {
  border: none !important;
}
.number {
  position: absolute;
  top: 1.3rem;
  right: 1.3rem;
  font-size: 13px;
  color: #999999;
}
.weight {
  position: absolute;
  top: 2.1rem;
  right: 1.3rem;
  font-size: 13px;
  color: #999999;
}
.check {
  background-color: yellow;
}
.weui-media-box__desc {
  font-size: 16px;
}
</style>
