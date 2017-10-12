<template>
  <div>
    <div class="weui-media-box weui-media-box_text" v-for="item in list" >
          <div class="weui-media-box_appmsg">
            <div class="weui-media-box__hd" v-if="item.src">
              <img class="weui-media-box__thumb" :src="item.src" alt="" @click.prevent="onImgClick(item.src)">
            </div>
            <div class="weui-media-box__bd" @click.prevent="onItemClick(item)">
              <h4 class="weui-media-box__title" v-html="item.goodsname"></h4>
              <p class="weui-media-box__desc" style="color:red;margin-bottom: 3px">￥{{item.price}}</p>
              <p class="weui-media-box__desc" v-html="item.spec"></p>
              <x-number style="position:absolute;top:30px;border:none;right:10px" v-model="item.number" :min="0"></x-number>

            </div>
          </div>

        </div>
    </div>
</template>

<script>
    import {XNumber} from 'vux';
    export default {
        name:'goodsList',
        components:{
          XNumber
        },

        props:{
          list: Array,
        },

        methods:{
          onItemClick (item) {
            this.$emit('on-click-item', item)

          },
          onImgClick (src) {

            this.$emit('on-click-img', src)

          },
          findbyindex(currentValue){
            return currentValue.index = this.index;
          }
        }
    }
</script>
<style scoped>




  .weui-cell:before{
    border: none !important;
  }
</style>

