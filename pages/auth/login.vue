<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<input class="u-border-bottom"  v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">密码登录</view>
				<view class="issue" @click="registerFn">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.email)&&this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	async onLoad(){
	// let userInfo=await this.$u.api.userInfo();
	// console.log(userInfo);	
	},
	methods: {
		registerFn(){
				this.$u.route({
							url: 'pages/auth/register',
						})
			// let params={
			// 	name:'yangdx',
			// 	email:'1152@qq.com',
			// 	password:'123123',
			// 	password_confirmation:'123123'
			// }
			// this.$u.api.authRegister(params);
			// this.$u.$util.updataUser()
		},
		async submit() {
			if(this.$u.test.email(this.email)&&this.password) {
				// this.$u.route({
				// 	url: 'pages/template/login/code'
				// })
				let paramLogin={
					email:this.email,
					password:this.password
				}
				let loginRes=await this.$u.api.authLogin(paramLogin)
				this.$u.vuex('vuex_token',loginRes.access_token);
				this.$u.toast('登录成功');
				console.log(loginRes);
				this.$u.utils.updataUser()
				//登录之后跳转到来源页面
				const back_url=uni.getStorageSync('back_url')||'pages/index/index'
				setTimeout(()=>{
					this.$u.route({
						type:'reLaunch',
						url:back_url
					})  
				},1500)
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;
        .u-border-bottom{
			margin-bottom: 40rpx;
		}
		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>
