const http = uni.$u.http
let indexUrl='/api/index';


// /common/http.interceptor.js

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// post请求，获取菜单
	let postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)
	
	// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
	let getMenu = (data) => http.get(indexUrl, data)
	vm.$u.api={postMenu,getMenu}
}

export default {
	install
}