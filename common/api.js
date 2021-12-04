const http = uni.$u.http
let indexUrl='/api/index';


// /common/http.interceptor.js

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	vm.$u.api={};
	// post请求，获取菜单
	vm.$u.api.postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)
	//首页
	// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
	vm.$u.api.index = (data) => http.get('/api/index', data)
	// post请求，认证相关的
	vm.$u.api.authLogin = (params, config = {}) => http.post('/api/auth/login', params, config)//登陆
	vm.$u.api.authRegister = (params, config = {}) => http.post('/api/auth/register', params, config)//注册
	//用户相关的信息
	vm.$u.api.userInfo = (params, config = {}) => http.get('/api/user', params, config)//用户详情
	//更新用户个人信息
	vm.$u.api.userInfoUpdate = (params, config = {}) => http.put('/api/user', params, config)
	
}

export default {
	install
}