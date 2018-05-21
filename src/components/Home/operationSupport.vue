<!-- 运营支撑的总体的框架 -->
<template lang="html">
    <!-- 左侧的导航栏 -->
    <el-row>
        <div class="left_active" ref="leftnav">
            <!-- 循环相应的路由表生成左侧的路由表二级路由表 -->
            <el-menu :default-active="indexPath" class="el-menu-vertical-demo " @open="handleOpen" @close="handleClose" theme="dark" unique-opened router>
                <div v-for="(item, indexs) in dataView">
                    <el-submenu :index="indexs+''">
                        <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                        <template v-for="child in item.children">
                            <el-menu-item-group >
                                <!-- 判断进行设置了为hidden: true;不进行展示 -->
                                <el-menu-item :index="child.path" v-show="!child.hidden">{{child.name}}</el-menu-item>
                            </el-menu-item-group>
                        </template>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
        <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-col>
    </el-row>
</template>

<script>
import store from '../../vuex/store';
export default {
    data() {
        return {
            indexPath: '', // 页面刷新时，直接页面路由的跳转，设置默认打开的页面 
        };
    },
    computed: {
        dataView() {
            // 拿取store中的路由表的相应内容
            let thatDdta = store.getters.addRouters;
            let data =  thatDdta.filter(data => {
                if(data.name=='运营支撑'){
                    return  data;
                }
            }) 
            //console.log(data[0].children);
            return data[0].children;
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            //console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            //console.log(key, keyPath);
        }
    },
    mounted() {
        var _this = this;
        this.$nextTick(function() {
            _this.$refs.leftnav.style.height = leftNavHeight +'px';
            var strPath = location.href;
            if(strPath.indexOf('http://')==0) {
                strPath = strPath.substring(strPath.indexOf('http://')+7, strPath.length);
            }
            var index = strPath.indexOf('/');
            strPath = strPath.substring(index, strPath.length);
            _this.indexPath = strPath;
		})
    },
}
</script>

<style lang="css">

</style>
