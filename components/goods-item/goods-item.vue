<template>
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
</template>

<script>
	export default {
		name:"goods-item",
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
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
