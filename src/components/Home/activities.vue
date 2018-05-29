<!-- 系统管理的总体的框架 -->
<template lang="html">
    <el-row>
        <!-- 左侧的导航栏 -->
        <div class="left_active" ref="leftnav">
            <!-- 循环相应的路由表生成左侧的路由表一级路由表 -->
            <el-menu :default-active="indexPath" class="el-menu-vertical-demo " @open="handleOpen" @close="handleClose" router>
                <!-- 判断进行设置了为hidden: true;不进行展示 -->                
                <el-menu-item v-for="(item, indexs) in dataView" :key="indexs" :index="item.path" v-show="!item.hidden">
                    <i :class="item.iconCls"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
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
            indexPath: '',
        };
    },
    computed: {
        dataView() {
            let thatDdta = store.getters.addRouters;
            let data =  thatDdta.filter(data => {
                if(data.name=='活动专区'){
                    return  data;
                }
            }) 
            return data[0].children[0].children;
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
