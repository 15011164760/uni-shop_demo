<template>
	<view class="wrap">
	   <u-swiper :list="slides" name="img_url" height="320"></u-swiper>
	   <view class="u-text-center u-m-t-20">
		   <u-tabs :list="tabList" bar-width="100" item-width="160" :current="currentSort" @change="changeSort"></u-tabs>
	   </view>
	   <u-row gutter="16" class="u-skeleton">
	   			<u-col span="6" v-for="(item,index) in goods.length!==0?goods:4" :key="index">
						<navigator class="goods-item">
							<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="item.cover_url"></u-image>
						    <view class="title u-line-1 u-skeleton-rect">
								{{item.title?item.title:'商品名称'}}
							</view>
							<view class="u-flex u-row-between">
								<view class="price u-skeleton-rect">${{item.price}}</view>
								<view class="sales u-skeleton-rect">销量:{{item.sales}}</view>
							</view>
						</navigator>
	   			</u-col>
	   	</u-row>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:true,
				slides:[],
				page:1,
				goods:[],
				tabList: [{
									name: '默认'
								}, {
									name: '销量'
								}, {
									name: '推荐',
									// count: 5
								},
								{
									name: '最新',
									// count: 5
								}
								],
								currentSort: 0
			}
		},
		onLoad() {
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
		this.getData();
		},
		methods: {
			async getData(){
				this.loading=true;
				let params={
					 page:this.page
				}
				if(this.currentSort==1)params.sales=1
				if(this.currentSort==2)params.recommend=1
				if(this.currentSort==3)params.new=1
				let res=await this.$u.api.index(params)
				console.log(res);
				this.loading=false;//骨架屏消失
				this.slides=res.slides;
				this.goods=[...this.goods,...res.goods.data];
				
			},
			changeSort(index) {
							this.currentSort = index;
							this.page=1;
							this.goods=[];
							this.getData();
						},
			onReachBottom(){
				console.log('111');
				this.page+=1;
				this.getData();
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
				margin:10rpx 0;
				width: 100%;
			}
			.price{
				color:red;
				min-width: 100rpx;
			}
			.sales{
				color: #888;
				// width: 60%;
				min-width: 100rpx;
			}
		}
		
</style>
