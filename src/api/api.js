/* 配置基础的一些请求路径 */
import axios from 'axios';
// 配置为日常的请求的域名,后台数据的请求路径配置
let base = 'http://test-manage.dianliaoapp.com/ydlManage/server/index.php';
// let base = 'https://manage.dianliaoapp.com/ydlManage/server/index.php';
// 检测判断是否在正式服上面，修改相应对应的正式服路径
if (location.href.indexOf('https://manage.dianliaoapp.com')=='0') {
    base = 'https://manage.dianliaoapp.com/ydlManage/server/index.php';
} else {
	// 不进行处理
}
// 一些常用请求
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
// 公共的请求方法，剩下的所有的allget请求
export const allget = (params, url) => {return axios.get(`${base}`+url, { params: params });};