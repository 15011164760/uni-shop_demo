<!-- demo.vue -->

<template>
	<view>
		<view>
			版本号为：{{vuex_version}}
		</view>
		<view>
			<<琵琶行>>的作者为{{vuex_user.name}}
		</view>
		<u-button @click="modifyVuex">修改变量</u-button>
	</view>
</template>

<script>
	export default {
		methods: {
			modifyVuex() {
				this.$u.vuex('vuex_version', '1.0.2'+"==="+new Date()*1);
				// 修改对象的形式，中间用"."分隔
				this.$u.vuex('vuex_user.name', '诗圣'+"==="+new Date()*1);
			}
		}
	}
</script>