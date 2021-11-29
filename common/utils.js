const install=(Vue,vm)=>{
	const isLogin=()=>{
		const token=vm.vuex_token;
		if(!token){
			let currenPages=getCurrentPages().pop();
			uni.setStorageSync('back_url',currenPages.route);
					 vm.$u.toast('请登录');
					  setTimeout(()=>{
						vm.$u.route({
							type:'redirect',
							url:'pages/auth/login'
						})  
					  },1500)
					  return false
				
		}
		return true
	}
		
	vm.$u.utils={
		isLogin
	}
	
}
export default {
	install
}