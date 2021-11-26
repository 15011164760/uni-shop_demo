<template>
	<view class="wrap">
	   <u-swiper :list="list"></u-swiper>
	   <view class="u-text-center u-m-t-20">
		   <u-tabs :list="tabList" bar-width="100" item-width="160" :current="current" @change="change"></u-tabs>
	   </view>
	   <u-row gutter="16">
	   			<u-col span="6" v-for="i in 10">
						<navigator class="goods-item">
							<u-image width="100%" height="300rpx" src="https://oss.shop.eduwork.cn/product/2020-0820-5f3e152e57d13.png"></u-image>
						    <view class="title">
								区块链
							</view>
							<view class="u-flex u-row-between">
								<view class="price">$99</view>
								<view class="sales">销量:10</view>
							</view>
						</navigator>
	   			</u-col>
	   		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					'https://cdn.uviewui.com/uview/swiper/1.jpg',
					'https://cdn.uviewui.com/uview/swiper/2.jpg',
					'https://cdn.uviewui.com/uview/swiper/3.jpg',
				],
				tabList: [{
									name: '默认'
								}, {
									name: '推荐'
								}, {
									name: '销量',
									// count: 5
								},
								{
									name: '最新',
									// count: 5
								}
								],
								current: 0
			}
		},
		async onLoad() {
		   // const res=await this.$u.get('/api/index');
		    // const res=await this.$u.post('/api/auth/wx/bind');
			// console.log(111);
		 //   const res=await this.$u.post('/api/auth/login');
		 //   console.log(222);
		 //   console.log(res);
		 // const res=await this.$u.patch('/api/orders/1/confirm',{name:'Tom'});
		 // console.log(res);
		 // 假设不需要在响应拦截器中自动弹出的toast，以及不想写catch(如果promise中进行reject，但是却没有catch的话会报错)
		 // this.$u.api.getMenu({ custome: { auth: true, toast: false, catch: false }}).then(() => {
		 // 	console.log(111)
		 // }).catch(()=>{
			//  console.log(222)
		 // })
		 /*this.$u.api.authLogin({ custome: { auth: true, toast: false, catch: false }}).then(() => {
		 	console.log(111)
		 }).catch(()=>{
		 			 console.log(222)
		 }) */
		},
		methods: {
			change(index) {
							this.current = index;
						}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
			padding: 24rpx;
		}
		.goods-item{
			padding: 40rpx;
			margin-top: 30rpx;
			box-shadow: 0 12rpx 20rpx 0 rgba(0,0,0,.1);
			.title{
				font-size: 32rpx;
				font-weight: 500;
				margin-top:10rpx 0;
			}
			.price{
				color:red;
			}
			.sales{
				color: #888;
			}
		}
		
</style>
