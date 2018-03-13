<!-- 运营数据的总体的框架 -->
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
        dataView(){
            // 拿取store中的路由表的相应内容
            let thatDdta = store.getters.addRouters;
            let data =  thatDdta.filter(data => {
                if(data.name=='运营数据'){
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
        },
    },
    mounted() {
        var _this = this;
        this.$nextTick(function() {
            _this.$refs.leftnav.style.height = leftNavHeight +'px';
            // 进行页面刷新时，得到地址栏的路径，进行配置默认展示为相应地址栏的的路由页面
            // 将左边的路由表的选中的状态和右边页面刷新的结果的相对应起来
            var strPath = location.href;
            var index = strPath.indexOf('#/');
            strPath = strPath.substring(index+1,strPath.length);
            // console.log(strPath);
            _this.indexPath = strPath;
		})
    },
}
</script>

<style lang="css">

</style>
