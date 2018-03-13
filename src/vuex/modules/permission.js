/* 
    通过用户的权限和之前在router.js里面asyncRouterMap的每一个页面所需要的权限做匹配，
    最后返回一个该用能够访问路由有哪些
*/
import { asyncRouterMap, constantRouterMap } from '../../router/index';
function hasPermission(roles, route) {
    // console.log(route.meta && route.meta.role);
    console.log(roles);
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0);
    } else if(route.path=='*') {
        return false;
    } else {
        return true;
    }
}
const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
      GenerateRoutes({ commit }, data) {
          // console.log(data);
          return new Promise(resolve => {
              // console.log(data);
              const { roles } = data;
              // console.log(roles);
              const accessedRouters = asyncRouterMap.filter(v => {
                  // console.log(v);
                  if (roles.indexOf('admin') >= 0) return true;
                  if (hasPermission(roles, v)) {
                      // console.log(v.children);
                      if (v.children[0].children && v.children[0].children.length > 0) {
                          v.children[0].children = v.children[0].children.filter(child => {
                              if (hasPermission(roles, child)) {
                                return child;
                              //   console.log(child);
                              }
                              return false;
                          });
                          return v;
                      } else {
                          return v;
                      }
                  }
                  return false;
              });
              commit('SET_ROUTERS', accessedRouters);
              resolve();
          });
      }
    }
};
export default permission;