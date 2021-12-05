<template>
	<view class="u-rela u-skeleton">
		<!-- 商品信息 -->
		<view class="goods-items">
			<u-image class="u-skeleton-rect" width="100%" height="500rpx" :src="goodsInfo.cover_url"></u-image>
			<view class="name u-line-1 u-p-t-20 u-p-b-20 u-skeleton-rect">{{goodsInfo.title}}</view>
			<view class="u-flex u-row-between">
				<view class="price u-skeleton-rect">￥ {{goodsInfo.price}}</view>
				<view class="sales u-skeleton-rect">销量: {{goodsInfo.sales}}</view>
			</view>
		</view>

		<!-- tab组件 -->
		<u-tabs  class="u-m-l-20 u-m-r-20 u-skeleton-rect" :list="list" :is-scroll="false" :current="current" @change="changeTabs"></u-tabs>
		<view class="content u-m-l-20 u-m-r-20 u-p-b-80 u-skeleton-rect">
			<!-- 商品详情 -->
			<template v-if="current === 0">
				<u-parse :html="goodsInfo.details"></u-parse>
			</template>

			<!-- 商品评论 -->
			<template v-if="current === 1">
				<view class="comment" v-for="(res, index) in commentList" :key="res.id">
					<view class="left">
						<image :src="res.user.avatar_url" mode="aspectFill" class='img'></image>
					</view>
					<view class="right">
						<view class="top">
							<view class="name">{{ res.user.name }}</view>
						</view>
						<view class="content">{{ res.content }}</view>
						<view class="timeText">{{ res.updated_at }}</view>
					</view>
				</view>
			</template>

			<!-- 推荐商品 -->
			<template v-if="current === 2">
				<u-row gutter="16" class="">
					<u-col span="6" v-for="(item,index) in like_goodsList" :key="index">
						<goods-item :item="item"></goods-item>
					</u-col>
				</u-row>
			</template>
		</view>

		<view class="navigation u-absolute">
			<view class="left">
				<view class="item u-flex-col" @click="goodsCollectFn()" style="align-items: center;">
					<u-icon name="star-fill" :size="40" :color="isCollect === 1 ? '#ed3f14' : ''"></u-icon>
					<view class="text u-line-1">{{isCollect === 1 ?'取消收藏':'收藏'}}</view>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addCart">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {}, // 商品信息
				list: [{
					name: '商品详情'
				}, {
					name: '商品评论'
				}, {
					name: '推荐商品'
				}], // tab列表
				current: 0, //当前选中的tab选项
				commentList: [], // 评论列表
				isCollect: 0, // 是否收藏
				like_goodsList: [], // 推荐商品列表
				loading: false, // 信息加载
				cartCount: 0,// 购物车数量
				goodsId:null
			}
		},
		onLoad(options) {
			this.goodsId=options.id;
			console.log(options);
			this.getGoodsDetail(this.goodsId)
		},
		methods: {
			// // 点击收藏取消
			async goodsCollectFn(){
				if (!this.$u.utils.isLogin()) return;
				await this.$u.api.goodsCollect(this.goodsInfo.id);
				// console.log(res);
				if (this.isCollect === 0) {
					this.isCollect = 1
					this.$u.toast('收藏成功')
				} else {
					this.isCollect = 0
					this.$u.toast('取消收藏成功')
				}
			},
			async getGoodsDetail(id){
				let res=await this.$u.api.goodsInfo(id);
				console.log(res);
				this.goodsInfo=res.goods;
				this.isCollect=res.goods.is_collect;
				this.commentList = res.goods.comments;
				this.like_goodsList=res.like_goods;
			},
			changeTabs(index) {
				this.current = index
			}
			
			// // 加入购物车
			// async addCart(){
			// 	const params = {
			// 		goods_id: this.goodsInfo.id
			// 	}
				
			// 	await this.$u.api.cartsAdd(params)
			// 	// 更新购物车数量
			// 	this.getCartsCount()
			// 	this.$u.toast('添加成功')
			// },
			// // 获取购物车数量
			// async getCartsCount(){
			// 	if(this.$u.utils.isLogin()){
			// 		const res = await this.$u.api.cartsList()
			// 		console.log(res)
			// 		this.cartCount = res.data.length
			// 	}
			// },
			
			// // 跳转到购物车页面
			// toCart(){
			// 	this.$u.route({
			// 		type: 'switchTab',
			// 		url:'pages/cart/cart'
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.u-rela{
		padding-bottom: 50rpx;
	}
	// 商品信息
	.goods-items {
		padding: 20rpx;
		margin-bottom: 20rpx;
		// box-shadow: 0 12rpx 20rpx rgba(0, 0, 0, .1);

		// 标题
		.name {
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			width: 100%;
		}

		// 价格
		.price {
			width: 40%;
			color: red;
			padding-left: 20rpx;
			font-weight: bold;
			font-size: 32rpx;
		}

		// 销量
		.sales {
			width: 40%;
			color: #888;
			font-weight: bold;
			font-size: 32rpx;
			padding-right: 20rpx;
		}
	}

	.content {
		// min-height: 360rpx;
		// padding-bottom: 200rpx;
	}
    .comment{
		display: flex;
		align-items: center;
    	.left{
			.img{
				width:100rpx;
				height: 100rpx;
				border:1px solid #ddd;
				border-radius: 50%;
				background-color: #ddd;
			}
			padding-bottom:10rpx;
    	}
		.right{
			margin-left: 10rpx;
			flex:1;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			.top .name{
				color:#2d8cf0;
			}
			.timeText{
				color:#ccc;
			}
			// align-items: center;
		}
    }
	// 底部
	.navigation {
		display: flex;
		// margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		.left {
			display: flex;
			font-size: 20rpx;
			margin-right: 80rpx;
			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
