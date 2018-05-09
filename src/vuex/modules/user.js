import { allget } from '../../api/api';
import md5 from '../../public_js/md5';

const user = {
    state: {
        user: '',
        name: '',
        status: '',
        roles: [],
        router: [],
        channelid: '',
        channelname: '',
        token: "",
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_ROUTER: (state, router) => {
            state.router = router;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_CHANNELID: (state, channelid) => {
            state.channelid = channelid;
        },
        SET_CHANNELNAME: (state, channelname) => {
            state.channelname = channelname;
        }
    },
    actions: {
        // 获取用户信息，请求接口数据，将信息保存在user中
        GetInfo({ commit }, ueserInfo) {
            return new Promise((resolve, reject) => {
                var url = '/NewLoginTpl/loginCheck';
                try {
                    allget({ user_name: ueserInfo.username, pass_word: md5(ueserInfo.password), }, url)
                    .then((res) => {
                        if (res.data.ret) {
                            // 定义出现的权限判断
                            //T1->所有页面
                            //T2->除去运营支撑-财务管理-提现审核、货币申请审核、充值配置列表
                            //P1->所有页面
                            //P2->除去运营支撑-财务管理-提现审核、货币申请审核、充值配置列表；系统设置-账号管理、全局参数、图片上传
                            //O1->除去系统设置-账号管理、全局参数、图片上传
                            //O2->除去运营支撑-财务管理-提现审核、货币申请审核、充值配置列表；系统设置-账号管理、全局参数、图片上传
                            /*
                            M ->
                                运营数据-所有页面
                                用户管理-用户信息管理-用户信息查询
                                用户管理-代理推广管理所有页面
                                运营支撑-运营工具-版本更新管理
                                运营支撑-财务管理-充值流水查询、提现记录
                                系统设置-修改密码
                            */
                            /*
                            C ->
                                用户管理-用户信息管理下所有页面
                                用户管理-家族管理-除解散家族、修改家族等级、家族后台账号管理之外的所有页面
                                用户管理-代理推广管理-除代理绑定查询之外的所有页面
                                运营支撑-财务管理-充值流水查询、提现记录
                                运营支撑-通话日志、录音日志下所有页面
                                系统设置-修改密码
                            */ 
                            /*
                            G ->
                                运营数据-渠道数据-分渠道数据
                                系统设置-修改密码
                            */ 
                            // 页面的权限
                            /*
                                page_auth_code
                                0->无页面的操作权限
                                1->有页面的操作权限
                            */  
                            var arr = [];
                            if(res.data.data.auth_code==0) { 
                                // 无权限，不进行处理 
                            } 
                            else if(res.data.data.auth_code==1) { arr.push('T1'); }
                            else if(res.data.data.auth_code==2) { arr.push('T2'); }
                            else if(res.data.data.auth_code==3) { arr.push('P1'); }
                            else if(res.data.data.auth_code==4) { arr.push('P2'); }
                            else if(res.data.data.auth_code==5) { arr.push('O1'); }
                            else if(res.data.data.auth_code==6) { arr.push('O2'); }
                            else if(res.data.data.auth_code==7) { arr.push('M'); }
                            else if(res.data.data.auth_code==8) { arr.push('C'); }
                            else if(res.data.data.auth_code==9) { arr.push('G'); }
                            // commit('SET_ROLES', ['T1']);// 测试设置不同的权限
                            commit('SET_ROLES', arr);
                            commit('SET_USER', res.data.data.user_name);
                            commit('SET_NAME', res.data.data.real_name);
                            commit('SET_CHANNELID', res.data.data.channel_id_list);
                            commit('SET_CHANNELNAME', res.data.data.channel_name_list);
                            commit('SET_TOKEN', '1248jsug1245875');
                            resolve(res);
                        } else {
                            resolve(res);
                        }
                    });
                } catch (e) {
                    console.log(e);
                } finally {

                }
            }).catch(e => {
                reject(e);
            });
        },
        // 证明
        GetInfoId({ commit, state }) {
            commit('SET_TOKEN', '1248jsug1245875');
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_ROLES', []);
                    Cookies.remove('Admin-Token');
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('Admin-Token');
                resolve();
            });
        },
        // 动态修改权限
        ChangeRole({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role]);
                Cookies.set('Admin-Token', role);
                resolve();
            });
        }
    }
};
export default user;