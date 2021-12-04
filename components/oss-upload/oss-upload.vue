<template>
	<u-upload 
	ref="uploadRef"
	@on-remove="onRemove"
	 :action="action"
	 :max-size="5 * 1024 * 1024" 
	 max-count="1"
	:multiple="false"
	:beforeUpload="beforeUpload"
	@on-success="onSuccess"
	:custom-btn="true"
	:show-progress="false"
	:form-data="formData"
	:show-upload-list="false"
	:deletable="false"
	width="0"
	height="0"
	>
		<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"></u-avatar>
	</u-upload>
</template>

<script>
	let _this=this;
	export default {
		name:"oss-upload",
		data() {
			return {
				action:'http://www.example.com/upload',
				formData:{},
				upFileName:''
			}
		},
		created(){
			_this=this;
		},
		methods: {
			/* 
			 上传前的钩子函数
			 小程序中this可能会丢失
			 */
			async beforeUpload(index, list) {
					let OssToken=await this.$u.api.authOssToken();
					console.log(OssToken,index, list);
					_this.action=OssToken.host;//上传文件的域名
					let {file}=list[0];
					// #ifdef H5 
					const fileName=file.name;
					//  #endif 
					// #ifndef H5
					const fileName=file.path;
					//  #endif 
					//处理唯一文件名
					const suffix=fileName.slice(fileName.lastIndexOf('.'));
					const upFileName=this.$u.guid(20)+suffix;
					this.upFileName=upFileName;
					console.log(upFileName);
					
					this.formData={
						    key : upFileName,//上传之后的文件名
						    policy: OssToken.policy,
						    OSSAccessKeyId: OssToken.accessid, 
						    success_action_status : '200', //让服务端返回200,不然，默认会返回204
						    signature: OssToken.signature,
					}
					// 这里上传文件之间, 发送Ajax, 获取上传需要的token...这里先手动填入 postman 显示的
					    // new_multipart_params = {
					    //     'key' : g_object_name,
					    //     'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0xMlQxMDoxNTozMVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDAwXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0=',
					    //     'OSSAccessKeyId': 'LTAI4G2pmbQ6w2nxZfKsazqe', 
					    //     'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
					    //     'signature': '0qn2Ijelj8IvdHohDRhJqeh9/4w=',
					    // };
					// accessid: "LTAI4GE2cHVdYr73tpSWkmVr"
					// callback: "eyJjYWxsYmFja1VybCI6IiIsImNhbGxiYWNrQm9keSI6ImJ1Y2tldD0ke2J1Y2tldH0mZXRhZz0ke2V0YWd9JmZpbGVuYW1lPSR7b2JqZWN0fSZzaXplPSR7c2l6ZX0mbWltZVR5cGU9JHttaW1lVHlwZX0maGVpZ2h0PSR7aW1hZ2VJbmZvLmhlaWdodH0md2lkdGg9JHtpbWFnZUluZm8ud2lkdGh9JmZvcm1hdD0ke2ltYWdlSW5mby5mb3JtYXR9IiwiY2FsbGJhY2tCb2R5VHlwZSI6ImFwcGxpY2F0aW9uXC94LXd3dy1mb3JtLXVybGVuY29kZWQifQ=="
					// callback-var: []
					// dir: ""
					// expire: 1638612700
					// host: "https://laravel-book-shop.oss-cn-beijing.aliyuncs.com/"
					// policy: "eyJleHBpcmF0aW9uIjoiMjAyMS0xMi0wNFQxMDoxMTo0MFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDAwXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0="
					// signature: "16JZhjN2RzaNVp8UdooqUxCedU0="
					return true
			},
			async onSuccess(){
				this.$refs.uploadRef.remove(0);//手动移除预览区域图片
				//更新头像
				await this.$u.api.userAvatar({avatar:this.upFileName});
				//更新缓存中的数据
				this.$u.utils.updataUser();
				this.$u.toast('更新成功');
			}
		}
	}
</script>

<style>

</style>
