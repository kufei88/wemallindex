<template>
  <div>

    <divider>tab组件</divider>
    <div class="food_container">
    <section class="sort_container">
    <div class="sort_item" :class="{choose_type:sortBy == 'food'}" >
    			<div class="sort_item_container" @click="chooseType('food')">
    				<div class="sort_item_border">
    					<span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
		    			<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			    			<polygon points="0,3 10,3 5,8"/>
			    		</svg>
    				</div>
    			</div>
	    		<transition name="showlist" v-show="category">
	    			<section v-show="sortBy == 'food'" class="category_container sort_detail_type">

	    				<section class="category_right">
	    					<ul>
	    						<li v-for="(item,index) in categoryDetail"  :key="item.id"
                  class="category_right_li" @click="getCategoryIds(item.id, item.name)"
                  :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}">
	    							{{item.name}}

	    						</li>
	    					</ul>
	    				</section>
	    			</section>
	    		</transition>
    		</div>
    </section>
    </div>
    <section class="buy_cart_container">
          <section @click="toggleCartList" class="cart_icon_num">
              <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                  <span v-if="totalNum" class="cart_list_length">
                      {{totalNum}}
                  </span>
                  <svg class="cart_icon">
                      <symbol viewBox="0 0 58 58" id="cart-icon">
                      <defs>
                        <filter id="a" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"/><feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="SourceGraphic"/></feMerge></filter><path id="b" d="M7.614 4.051c-1.066.086-1.452-.398-1.752-1.584C5.562 1.28.33 5.88.33 5.88l3.71 19.476c0 .148-1.56 7.515-1.56 7.515-.489 2.19.292 4.27 3.56 4.32 0 0 36.917.017 36.92.047 1.979-.012 2.981-.995 3.013-3.039.03-2.043-1.045-2.978-2.987-2.993L8.83 31.192s.86-3.865 1.077-3.865c0 0-5.788.122 32.065-1.956.606-.033 2.018-.764 2.298-1.848 1.113-4.317 4.008-13.26 4.458-15.64.932-4.925 2.061-8.558-4.28-7.405 0 0-35.768 3.487-36.833 3.573z"/>
                      </defs>
                      <g fill="none" fill-rule="evenodd" filter="url(#a)" transform="translate(3 2)">
                        <g transform="translate(5.038 7.808)"><mask id="c" fill="#fff"><use xlink:href="#b"/></mask><use fill="#FFF" xlink:href="#b"/><path fill="#2073C1" d="M53.962 7.774l-5.701 19.305-40.78 1.574z" opacity=".1" mask="url(#c)"/></g><path stroke="#FFF" stroke-width="6" d="M9.374 18.722S7.868 11.283 7.323 8.71C6.778 6.136 5.86 5.33 3.978 4.52 2.096 3.713.367 2.286.367 2.286" stroke-linecap="round"/><circle cx="46" cy="51" r="4" fill="#FFF"/><circle cx="12" cy="51" r="4" fill="#FFF"/>
                      </g>
                      </symbol>
                      <symbol viewBox="0 0 50 50" id="cart-minus">
                      <path fill-rule="evenodd" stroke-width="4" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clip-rule="evenodd"></path>
                      <path fill-rule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clip-rule="evenodd"></path>
                      </symbol>
                      <symbol viewBox="0 0 50 50" id="cart-add">
                      <path fill="none" d="M0 0h44v44H0z"></path>
                      <path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path>
                      </symbol>
                      <symbol viewBox="0 0 24 32" id="cart-remove">
                      <path fill="#bbb" fill-rule="evenodd" d="M21.5 10h-19c-1.1 0-1.918.896-1.819 1.992l1.638 18.016C2.419 31.104 3.4 32 4.5 32h15c1.1 0 2.081-.896 2.182-1.992l1.637-18.016A1.798 1.798 0 0 0 21.5 10zM8 28H5L4 14h4v14zm6 0h-4V14h4v14zm5 0h-3V14h4l-1 14zm2-24h-2.941l-.353-2.514C17.592.669 16.823 0 15.998 0H8c-.825 0-1.593.668-1.708 1.486L5.94 4H3a3 3 0 0 0-3 3v1h24V7a3 3 0 0 0-3-3zM8.24 2h7.52l.279 2H7.96l.28-2z"></path>
                      </symbol>
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chuangkou"></use>
                  </svg>
              </div>
              <div class="cart_num">
                  <div>¥ {{totalPrice}}</div>
                  <div>配送费¥</div>
              </div>
          </section>
          <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
              <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
              <router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay_button_style" v-else >去结算</router-link>
          </section>
      </section>
      <transition name="toggle-cart">
      <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
          <header>
              <h4>购物车</h4>
              <div @click="clearCart">
                  <svg>
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                  </svg>
                  <span class="clear_cart">清空</span>
              </div>
          </header>
          <section class="cart_food_details" id="cartFood">
              <ul>
                  <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                      <div class="cart_list_num">
                          <p class="ellipsis">{{item.name}}</p>
                          <p class="ellipsis">{{item.specs}}</p>
                      </div>
                      <div class="cart_list_price">
                          <span>¥</span>
                          <span>{{item.price}}</span>
                      </div>
                      <section class="cart_list_control">
                          <span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                              <svg>
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                              </svg>
                          </span>
                          <span class="cart_num">{{item.num}}</span>
                          <svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                          </svg>
                      </section>
                  </li>
              </ul>
          </section>
      </section>
  </transition>
  </div>

</template>

<script>
  import { Tab, TabItem, Divider, XButton } from 'vux'
  import svgIcon from './svg.vue'

  export default {
    data(){
      return {
        geohash: '',
        shopId:'',
        sortBy:'',
        foodTitle:'全部',
        headTitle: '全部',
        category:null,
        restaurant_category_ids:'1',
        categoryDetail:[{'name':'全部','id':'1'},{'name':'服装服饰','id':'2'}
        ,{'name':'箱包手袋','id':'3'},{'name':'时尚鞋履','id':'4'},{'name':'美妆护肤','id':'5'},
        {'name':'数码家电','id':'6'},{'name':'母婴家居','id':'7'}],
        receiveInCart: false,
        totalPrice:10,
        totalNum:2,
        minimumOrderAmount:0,
        cartFoodList: [{'name':'001','spec':'xxx','num':'10','price':'5'}], //购物车商品列表
        showCartList: false,//显示购物车列表
      }
    },
    components:{
      Tab, TabItem, Divider, XButton,svgIcon
    },
    methods:{
      toggleCartList(){
        this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
      },
      clearCart(){

      },
      chooseType(type){
        if (this.sortBy !== type) {
    			this.sortBy = type;
    			//food选项中头部标题发生改变，需要特殊处理
    			if (type == 'food') {
					this.foodTitle = '分类';
    			}else{
    				//将foodTitle 和 headTitle 进行同步
    				this.foodTitle = this.headTitle;
    			}
    		}else{
    			//再次点击相同选项时收回列表
    			this.sortBy = '';
    			if (type == 'food') {
    				//将foodTitle 和 headTitle 进行同步
    				this.foodTitle = this.headTitle;
    			}
    		}
      },
      selectCategoryName(){

      },
      getCategoryIds(id, name){
        this.restaurant_category_ids = id;
        this.sortBy = '';
        this.foodTitle = this.headTitle = name;

      },
      getImgPath(){

      }
    }
  }
</script>


<style lang="scss" scoped>
@import 'src/styles/mixin';
.buy_cart_container{
        position: absolute;
        background-color: #3d3d3f;
        bottom: 100px;
        left: 0;
        z-index: 13;
        display: flex;
        @include wh(100%, 2rem);
        .cart_icon_num{
            flex: 1;
            .cart_icon_container{
                display: flex;
                background-color: #3d3d3f;
                position: absolute;
                padding: .4rem;
                border: 0.18rem solid #444;
                border-radius: 50%;
                left: .5rem;
                top: -.7rem;
                .cart_icon{
                    @include wh(1.2rem, 1.2rem);
                }
                .cart_list_length{
                    position: absolute;
                    top: -.25rem;
                    right: -.25rem;
                    background-color: #ff461d;
                    line-height: .7rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .7rem;
                    height: .7rem;
                    @include sc(.5rem, #fff);
                    font-family: Helvetica Neue,Tahoma,Arial;
                }
            }
            .move_in_cart{
                animation: mymove .5s ease-in-out;
            }
            .cart_icon_activity{
                 background-color: #3190e8;
            }
            .cart_num{
                @include ct;
                left: 3.5rem;

                div{
                    color: #fff;
                }
                div:nth-of-type(1){
                    font-size: .8rem;
                    font-weight: bold;
                    margin-bottom: .1rem;
                }
                div:nth-of-type(2){
                    font-size: .4rem;
                }
            }
        }
        .gotopay{
            position: absolute;
            right: 0;
            background-color: #535356;
            @include wh(5rem, 100%);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            .gotopay_button_style{
                @include sc(.7rem, #fff);
                font-weight: bold;
            }
        }
        .gotopay_acitvity{
            background-color: #4cd964;
        }
    }
    .cart_food_list{
        position: fixed;
        width: 100%;
        padding-bottom: 2rem;
        z-index: 12;
        bottom: 6rem;
        left: 0;
        background-color: #fff;
        header{
            @include fj;
            align-items: center;
            padding: .3rem .6rem;
            background-color: #eceff1;
            svg{
                @include wh(.6rem,.6rem);
                vertical-align: middle;
            }
            h4{
                @include sc(.7rem, #666);
            }
            .clear_cart{
                @include sc(.6rem, #666);
            }
        }
        .cart_food_details{
            background-color: #fff;
            max-height: 20rem;
            overflow-y: auto;
            .cart_food_li{
                @include fj;
                padding: .6rem .5rem;
                .cart_list_num{
                    width: 55%;
                    p:nth-of-type(1){
                        @include sc(.7rem, #666);
                        font-weight: bold;
                    }
                    p:nth-of-type(2){
                        @include sc(.4rem, #666);
                    }
                }
                .cart_list_price{
                    font-size: 0;
                    span:nth-of-type(1){
                        @include sc(.6rem, #f60);
                        font-family: Helvetica Neue,Tahoma;

                    }
                    span:nth-of-type(2){
                        @include sc(.7rem, #f60);
                        font-family: Helvetica Neue,Tahoma;
                        font-weight: bold;
                    }
                }
                .cart_list_control{
                    display: flex;
                    align-items: center;
                    span{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    svg{
                        @include wh(.9rem, .9rem);
                        fill: #3190e8;
                    }
                    .specs_reduce_icon{
                        fill: #999;
                    }
                    .cart_num{
                        @include sc(.65rem, #666);
                        min-width: 1rem;
                        text-align: center;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
            }
        }
    }
.food_container{
    padding-top: 3.6rem;

	}
	.sort_container{
		background-color: #fff;
		border-bottom: 0.025rem solid #f1f1f1;
		position: fixed;
		top: 1.95rem;
		right: 0;
		width: 100%;
		display: flex;
		z-index: 13;
		box-sizing: border-box;
		.sort_item{
			@include sc(0.7rem, #9e9e9e);
			@include wh(33.3%, 1.6rem);
			text-align: center;
			line-height: 1rem;
			.sort_item_container{
				@include wh(100%, 100%);
				position: relative;
				z-index: 14;
				background-color: #fff;
				box-sizing: border-box;
				padding-top: .3rem;
				.sort_item_border{
					height: 1rem;
					border-right: 0.025rem solid $bc;
				}
			}
			.sort_icon{
				vertical-align: middle;
				transition: all .3s;
				fill:#666;
			}

		}
		.choose_type{
			.sort_item_container{

				.category_title{
					color: $blue;
				}
				.sort_icon{
					transform: rotate(180deg);
					fill:$blue;
				}
			}
		}
		.showlist-enter-active, .showlist-leave-active {
			transition: all .3s;
			transform: translateY(0);
		}
		.showlist-enter, .showlist-leave-active {
			opacity: 0;
			transform: translateY(-100%);
		}
		.sort_detail_type{
			width: 100%;
			position: absolute;
			display:flex;
			top: 1.6rem;
			left: 0;
			border-top: 0.025rem solid $bc;
			background-color: #fff;
		}
		.category_container{
			.category_left{
				flex: 1;
				background-color: #f1f1f1;
				height: 16rem;
				overflow-y: auto;
				span{
					@include sc(0.5rem, #666);
					line-height: 1.8rem;
				}
				.category_left_li{
					@include fj;
					padding:0 0.5rem;
					.category_icon{
						@include wh(.8rem, .8rem);
						vertical-align: middle;
						margin-right: .2rem;
					}
					.category_count{
						background-color: #ccc;
						@include sc(.4rem, #fff);
						padding: 0 .1rem;
						border: 0.025rem solid #ccc;
						border-radius: 0.8rem;
						vertical-align: middle;
						margin-right: 0.25rem;
					}
					.category_arrow{
						vertical-align: middle;
					}
				}
				.category_active{
					background-color: #fff;
				}
			}
			.category_right{
				flex: 1;
				background-color: #fff;
				padding-left: 0.5rem;
				height: 16rem;
				overflow-y: auto;
				.category_right_li{
              @include sc(1rem, #9e9e9e);
              display: block;
              list-style: none;
              width: 33%;
              height: 3rem;
              float: left;
              border-bottom: .15rem solid white;
              line-height: 3rem;
              text-align: center;

				}
				.category_right_choosed{
              color: #ec1c43;
              border-bottom: 0.15rem solid #ec1c43;
				}
			}
		}
		.sort_list_container{
			width: 100%;
			.sort_list_li{
				height: 2.5rem;
				display: flex;
				align-items: center;
				svg{
					@include wh(0.7rem, 0.7rem);
					margin:0 .3rem 0 .8rem;
				}
				p{
					line-height: 2.5rem;
					flex: auto;
					text-align: left;
					text-indent: 0.25rem;
					border-bottom: 0.025rem solid $bc;
					@include fj;
					align-items: center;
					span{
						color: #666;
					}
				}
				.sort_select{
					span{
						color: $blue;
					}
				}
			}
		}
		.filter_container{
			flex-direction: column;
			align-items: flex-start;
			min-height: 10.6rem;
			background-color: #f1f1f1;
			.filter_header_style{
				@include sc(0.4rem, #333);
				line-height: 1.5rem;
				height: 1.5rem;
				text-align: left;
				padding-left: .5rem;
				background-color: #fff;
			}
			.filter_ul{
				display: flex;
				flex-wrap: wrap;
				padding: 0 0.5rem;
				background-color: #fff;
				.filter_li{
					display: flex;
					align-items: center;
					border: 0.025rem solid #eee;
					@include wh(4.7rem, 1.4rem);
					margin-right: 0.25rem;
					border-radius: 0.125rem;
					padding: 0 0.25rem;
					margin-bottom: 0.25rem;
					svg{
						@include wh(.8rem, .8rem);
						margin-right: 0.125rem;
					}
					span{
						@include sc(0.4rem, #333);
					}
					.filter_icon{
						@include wh(.8rem, .8rem);
						font-size: 0.5rem;
						border: 0.025rem solid $bc;
						border-radius: 0.15rem;
						margin-right: 0.25rem;
						line-height: .8rem;
						text-align: center;
					}
					.activity_svg{
						margin-right: .25rem;
					}
					.selected_filter{
						color: $blue;
					}
				}
			}
			.confirm_filter{
				display: flex;
				background-color: #f1f1f1;
				width: 100%;
				padding: .3rem .2rem;
				.filter_button_style{
					@include wh(50%, 1.8rem);
					font-size: 0.8rem;
					line-height: 1.8rem;
					border-radius: 0.2rem;
				}
				.clear_all{
					background-color: #fff;
					margin-right: .5rem;
					border: 0.025rem solid #fff;
				}
				.confirm_select{
					background-color: #56d176;
					color: #fff;
					border: 0.025rem solid #56d176;
					span{
						color: #fff;
					}
				}
			}
		}
	}
	.showcover-enter-active, .showcover-leave-active {
		transition: opacity .3s
	}
	.showcover-enter, .showcover-leave-active {
		opacity: 0
	}
	.back_cover{
		position: fixed;
		@include wh(100%, 100%);
		z-index: 10;
		background-color: rgba(0,0,0,0.3);
	}
</style>
