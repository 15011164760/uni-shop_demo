<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<u-search placeholder="请输入商品名称" v-model="keyword" @custom="searchGoods" @clear="clearGoods"></u-search>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<block v-for="(items,key) in categories" :key="key">
					<view v-for="(item,index) in items.children" :key="item.id" class="u-tab-item" :class="[current==(item.id) ? 'u-tab-item-active' : '']"
					 :data-current="item.id" @tap.stop="swichMenu(item.id)">
						<text class="u-line-1">{{item.name}}</text>
					</view>
				</block>
				
			</scroll-view>
			<scroll-view scroll-y class="right-box" >
				<view class="item-container">
					<navigator :url="`/pages/shop/detail?id=${item1.id}`" class="thumb-box" v-for="(item1, index1) in goodListData" :key="index1">
						<image class="item-menu-image" :src="item1.cover_url" mode=""></image>
						<view class="item-menu-name">{{item1.title}}</view>
					</navigator>
					<u-empty v-if="goodListData.length==0" text="数据为空" mode="list" class="u-p-t-80 u-p-b-80 u-flex-1"></u-empty>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import classifyData from "@/common/classify.data.js";
	export default {
		data() {
			return {
				keyword:'',
				page:1,
				categories:[],
				goodListData:[],
				tabbar: classifyData,
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		computed: {
			
		},
			
		onLoad(){
			this.goodsList();
		},
		methods: {
			searchGoods(){
				this.page=1;
				this.goodsList();
			},
			clearGoods(){
				this.page=1;
				this.keyword='';
				this.goodsList();
			},
			async goodsList(){
				let params={
					page:this.page,
					title:this.keyword
				}
				if(this.current)params.category_id	=this.current;
				let res=await this.$u.api.goodsList(params);
				console.log(res);
				this.categories=res.categories;
				this.goodListData=res.goods.data;
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(itemId) {
				if(itemId == this.current) return ;
				this.current = itemId;
				this.page=1;
				this.goodsList();
				// // 如果为0，意味着尚未初始化
				// if(this.menuHeight == 0 || this.menuItemHeight == 0) {
				// 	await this.getElRect('menu-scroll-view', 'menuHeight');
				// 	await this.getElRect('u-tab-item', 'menuItemHeight');
				// }
				// 将菜单菜单活动item垂直居中
				// this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
