import { allget } from '../../api/api';
import md5 from '../../public_js/md5';

const user = {
    state: {
        user: '',
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

        // 获取用户信息
        GetInfo({ commit }, ueserInfo) {
            // commit('SET_ROLES', ['editor']);
            // commit('SET_NAME', '超级管理员');
            // commit('SET_ROUTER', 'data');
            return new Promise((resolve, reject) => {
                let url = '/loginTpl/login';
                let pwd = md5(ueserInfo.password);
                try {
                    allget({ userid: ueserInfo.username, userpwd: pwd }, url).then(data => {
                        //console.log(data.data.data);
                        //console.log('获取用户信息');
                        if (data.data.ret) {
                            commit('SET_ROLES', ['testP1']);
                            commit('SET_NAME', data.data.username);
                            commit('SET_ROUTER', data.data.data);
                            commit('SET_CHANNELID', data.data.channelid);
                            commit('SET_CHANNELNAME', data.data.au_channelname);
                            commit('SET_TOKEN', '1248jsug1245875');
                            resolve(data);
                        } else {
                            resolve(data);
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