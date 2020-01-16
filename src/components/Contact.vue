<template>
  <div>
    <x-header>联系我们</x-header>
    <group title="销售员电话">
      <cell title="李旭君" value="13735665047" @click.native="call('13735665047')"></cell>
      <cell title="蒋彩琼" value="18867917191" @click.native="call('18867917191')"></cell>
      <cell title="曹灵津" value="13868993349" @click.native="call('13868993349')"></cell>
      <cell title="山东货蒋宏伟" value="13857985627" @click.native="call('13857985627')"></cell>
    </group>
    <group title="公司电话">
      <cell title="24小时热线:0579-82119588" @click.native="call('0579-82119588')"></cell>
      <cell title="总经理:18457909588" @click.native="call('18457909588')"></cell>
      <cell title="李灵东:18505795678" @click.native="call('18505795678')"></cell>
    </group>
    <group title="公司地址">
      <cell title="金华市农产品市场18幢A1-4号"></cell>
    </group>
    <group title="营业执照">
      <img src="../assets/license.png" width="100%" />
    </group>
  </div>
</template>
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
export default {
  methods: {
    call(numb) {
      console.log(numb);
      window.location.href = "tel:" + numb;
    }
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
