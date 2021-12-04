<template>
	<view class="u-p-l-40 u-p-r-40">
		<u-form :model="form" ref="uForm">
			<u-form-item label="姓名" prop="name" required>
				<u-input v-model="form.name" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
				}
			}
		},
		methods: {
           submit() {
           			this.$refs.uForm.validate(async (valid) => {
           				if (valid) {
           					console.log('验证通过');
							await this.$u.api.userInfoUpdate(this.form);
							this.$u.utils.updataUser()
           				} else {
           					console.log('验证失败');
           				}
           			});
           		}
		},
		onReady(){
			this.$refs.uForm.setRules(this.rules);
			this.form.name=this.vuex_user.name;
		}
	}
</script>

<style>

</style>
