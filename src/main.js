import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import router from './router';
import ElementUI from 'element-ui';
import vueQuillEditor from 'vue-quill-editor';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store';

Vue.use(ElementUI);
Vue.use(vueQuillEditor);

function hasPermission(roles, permissionRoles) {
    if(!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0);
}
const whiteList = ['/login', '/401'];
router.beforeEach((to, from, next) => {
    if(store.getters.token) {
        if(to.path==='/login') {
            next();
            location.reload();
        } else {
            if(store.getters.roles.length===0) {
                store.dispatch('GetInfo').then(res => {
                    const roles = store.state.user.roles;
                    store.dispatch('GenerateRoutes', {
                        roles
                    }).then(() => {
                        router.addRoutes();
                        next(to.path);
                    });
                }).catch(err => {
                    console.log(err);
                });
            } else {
                // 没有动态改变权限的需求可直接next()
                // 加上预处理的过程，判断在最外层的三个的判断，存在多级的不同选择
                var twoParam = null;
                if(to.path=='/operationData' || to.path=='/userManagement' || to.path=='/operationSupport') {
                    for(var i=0; i<store.getters.addRouters.length; i++) {
                        if(store.getters.addRouters[i].path==to.path) {
                            twoParam = store.getters.addRouters[i].meta.role;
                        }
                    }
                } else {
                    twoParam = to.meta.role;                    
                }
                if(hasPermission(store.getters.roles, twoParam)) {
                    // if() {

                    // }
                    next();
                } else {
                    // 跳转返回直接进行返回之前的页面
                    next({ path: '/401' });
                }
            }
        }
    } else {
        // 在免登录白名单，直接进入，否则全部重定向到登录
        if(whiteList.indexOf(to.path) !== -1) { 
            next();
        } else {
            next('/login');
        }
    }
});

/* eslint-disable no-new */
new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app');