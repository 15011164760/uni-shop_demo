const install=(Vue,vm)=>{
	const isLogin=()=>{
		const token=vm.vuex_token;
		if(!token){
			//来自哪个页面
			let currenPages=getCurrentPages().pop();
			console.log(currenPages);	
			//获取页面路径和请求参数
			let {route,options}=currenPages;
			//参数中的key
			let ObjectKeys=Object.keys(options);
			let params='';
			if(ObjectKeys.length!=0){
				params=ObjectKeys.reduce((pre,item)=>`${pre}${item}=${options[item]}&`,'?').slice(0,-1);
			}
			//缓存当前页 用于登录或者注册之后的跳转
			uni.setStorageSync('back_url',route+params);
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