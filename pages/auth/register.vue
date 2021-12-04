<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">注册图书商城账户</view>
			<input class="u-border-bottom"  v-model="name" placeholder="请输入昵称" />
			<input class="u-border-bottom"  v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirmation" placeholder="确认密码" />
			<button @tap="registerFn" :style="[inputStyle]" class="getCaptcha">注册</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			email: '',
			password: '',
			password_confirmation: ''
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.email)&&this.password&&this.password==this.password_confirmation) {
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
			let params={
				name:this.name,
				email:this.email,
				password:this.password,
				password_confirmation:this.password_confirmation
			}
			this.$u.api.authRegister(params);
			this.$u.toast('注册成功');
			setTimeout(()=>{
				this.$u.route({
					type:'reLaunch',
					url:'pages/auth/login'
				}) 
			},1500)
s		},
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
