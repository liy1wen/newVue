// 引用vue 和vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';
// 大板块的引用
import Home from '../components/Home/home.vue';//总的页面
import operationData from '../components/Home/operationData.vue';//运营数据
import operationSupport from '../components/Home/operationSupport.vue';//运营支撑
import userManager from '../components/Home/userManager.vue';//主播管理
import activityManagement from '../components/Home/activityManagement.vue';//系统管理
import systemManagement from '../components/Home/systemManagement.vue';//系统设置
import Login from '../components/rootGlobal/login.vue';//登陆页面
// 图形的页面
import graphic from '../components/graphic/dataSynthesis.vue';
// 运营工具
// 开始*****
import randomSignature from '../components/operationSupport/operatingTools/randomSignature.vue';//随机签名页面
import randomNickname from '../components/operationSupport/operatingTools/randomNickname.vue';//随机昵称页面
import randomLabel from '../components/operationSupport/operatingTools/randomLabel.vue';//随机标签页面
import imageUpload from '../components/operationSupport/operatingTools/imageUpload.vue';//图片上传页面->功能
import registeredUserGreeting from '../components/operationSupport/operatingTools/registeredUserGreeting.vue';//注册语设置
import newUsersMatchFriends from '../components/operationSupport/operatingTools/newUsersMatchFriends.vue';//新用户匹配好友
import autoMaticCodeSealRule from '../components/operationSupport/operatingTools/autoMaticCodeSealRule.vue';//自动封号规则
import revenueSuspensionWindow from '../components/operationSupport/operatingTools/revenueSuspensionWindow.vue';//收益悬浮窗
import channelManagement from '../components/operationSupport/operatingTools/channelManagement.vue';//渠道管理
import giftManagement from '../components/operationSupport/operatingTools/giftManagement.vue';//礼物管理
// 完成*****
// 消息管理
// 开始*****
import bannerManagement from '../components/operationSupport/messageManagement/bannerManagement.vue';//banner条管理
import barrageTopicManagement from '../components/operationSupport/messageManagement/barrageTopicManagement.vue';//弹幕话题管理
import marqueeManagement from '../components/operationSupport/messageManagement/marqueeManagement.vue';//跑马灯管理
import sendSystemNotification from '../components/operationSupport/messageManagement/sendSystemNotification.vue';//发送系统通知
import activityNotificationManagement from '../components/operationSupport/messageManagement/activityNotificationManagement.vue';//活动通知管理
import sendMessageNotifications from '../components/operationSupport/messageManagement/sendMessageNotifications.vue';//发送短信通知

// 完成*****

import user from '../components/User/richText.vue';//文章编辑
import userQuery from '../components/User/userQuery.vue';//用户查询
import userComplaints from '../components/User/userComplaints.vue';//用户查询
// 页面的基本架构
import Hello from '../components/Home/hello.vue';//欢迎界面
import Err401 from '../components/rootGlobal/401.vue';//错误界面
// 基础数据
import channelDataManagement from '../components/basicData/channelDataManagement'; //总渠道基础数据
import subChannel from '../components/basicData/subChannel'; //分渠道数据
import heldOutData from '../components/basicData/heldOutData'; //留存数据
import liveOnlineDetails from '../components/basicData/liveOnlineDetails'; //实时在线详情
import realTimeMatching from '../components/basicData/realTimeMatching'; //实时匹配详情

// 录音管理
import dailyAdditions from '../components/operationSupport/recordingManagement/DailyAdditions.vue'; // 每日新增录音明细

// 系统设置 
import empty from '../components/rootGlobal/empty.vue';//空组建进行页面进行刷新时使用

// 把router 引用进入vue
Vue.use(VueRouter);

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公共页面
export const constantRouterMap = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true, //hidden为自定义属性，如果hidden为true则不显示在sidebar侧边栏中
    },
    {
        path: '/home',
        component: Home,
        name: '',
        hidden: true,
        children: [
            { path: '/hello', component: Hello, name: '欢迎', hidden: true },
            { path: '/401', component: Err401, name: '401' },
        ],
    },
    {
        path: '/empty',
        component: empty,
        name: '',
        hidden: true,
    },
];
// 实例化vue的时候只挂载constantRouterMap
export default new VueRouter({
    routes: constantRouterMap,
});
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
    // 运营数据
    {
        path: '/operationData',
        component: Home,
        name: '运营数据',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/operationData',
                component: operationData,
                name: '综合概况',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '总渠道数据', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '每日总数据大全', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '激活与注册',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '激活注册详情', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '留存与流失',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '留存数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '活跃与在线',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '实时在线详情', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '日活用户行为', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '通话数据统计',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '实时匹配详情', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '实时通话次数', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '通话数据汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '随机通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '网红通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '好友通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '偷听汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '抢聊通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: 'IM消息统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '每日新增录音统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '运营数据统计',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '分享页每日数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '充值与消费',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '每日充值明细', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '每日实时充值', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '每月充值明细', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '三日充值数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '聊币统计汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '聊票统计汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '每月礼物数据汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '聊票流入流出汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '聊币流入流出汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '渠道数据',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '分渠道数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: 'CPS数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '分渠道CPA数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '分渠道实时注册数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '分渠道数据累计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupportOne/user', component: user, name: '单日分渠道数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
        ],
    },
    // 用户管理
    {
        path: '/userManager',
        component: Home,
        name: '用户管理',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/userManager',
                component: userManager,
                name: '用户管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '用户查询', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '用户投诉处理', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '封号解封操作记录', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '用户货币明细查询', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: 'VIP用户数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '女性魅力值', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '真人认证审核', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '置顶网红管理', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                ],
            },
            {
                path: '/userManager',
                component: userManager,
                name: '代理管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '代理总览', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '代理推广查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '代理排行榜', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '代理首次通话查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/userManager',
                component: userManager,
                name: '主播管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '主播每日数据汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '主播个人数据汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '主播每日行为数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/userManager',
                component: userManager,
                name: '家族管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '家族查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '房间数据和记录', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/registeredUserGreeting', component: registeredUserGreeting, name: '房间流水', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
        ],
    },
    // 运营支撑
    {
        path: '/operationSupport',
        component: Home,
        name: '运营支撑',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '运营支撑一',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '文章编辑', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/imageUpload', component: imageUpload, name: '图片上传', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/userQuery', component: userQuery, name: '用户查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/userComplaints', component: userComplaints, name: '用户投诉处理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '运营工具',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/operatingTools/newUsersMatchFriends', component: newUsersMatchFriends, name: '新用户匹配好友', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/registeredUserGreeting', component: registeredUserGreeting, name: '注册用户招呼语', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/giftManagement', component: giftManagement, name: '礼物管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/revenueSuspensionWindow', component: revenueSuspensionWindow, name: '收益悬浮窗', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/channelManagement', component: channelManagement, name: '渠道管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/randomSignature', component: randomSignature, name: '随机签名', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/randomNickname', component: randomNickname, name: '随机昵称', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/randomLabel', component: randomLabel, name: '随机标签', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/autoMaticCodeSealRule', component: autoMaticCodeSealRule, name: '自动封号规则', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/imageUpload', component: imageUpload, name: '图片上传', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '消息管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/messageManagement/barrageTopicManagement', component: barrageTopicManagement, name: '弹幕话题管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/messageManagement/sendSystemNotification', component: sendSystemNotification, name: '发送系统通知', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/messageManagement/bannerManagement', component: bannerManagement, name: 'banner条管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/messageManagement/user', component: user, name: '文章管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/messageManagement/activityNotificationManagement', component: activityNotificationManagement, name: '活动通知管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/messageManagement/sendMessageNotifications', component: sendMessageNotifications, name: '发送短信通知', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/messageManagement/marqueeManagement', component: marqueeManagement, name: '跑马灯管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '财务管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '充值促销管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '充值流水查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '提现审核', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '提现流水查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '货币赠送申请及查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '充值操作记录', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '充值列表', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '通话管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '通话记录明细', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '公开通话中管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '抢聊通话详情', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '偷听列表', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '录音管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '录播管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/recordingManagement/dailyAdditions', component: dailyAdditions, name: '每日新增录音明细', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '录音精彩内容', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '分享页推荐列表管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '录音页面投诉管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '录音下榜名单', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '录音标签管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '录音分享卡片', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '全局参数',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/operationSupportOne/user', component: user, name: '全局参数', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
        ],
    },
    // 活动专区
    {
        path: '/activityManagement',
        component: Home,
        name: '活动专区',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/activityManagement',
                component: activityManagement,
                name: '活动专区',
                hidden: false,
                children: [
                    { path: '/operationSupportOne/user', component: user, name: '新年活动', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '公众号关注', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '新浪统计', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '老司机统计', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '代理活动', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '用户群抽奖', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '翻牌红包', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '杂货店', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '漂流瓶', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '万圣节', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '代理邀请活动', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '家族争霸', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '超级转盘', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '娃娃机', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '圆蛋', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '心愿墙', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '声音邂逅心动', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '微信大转盘后台', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupportOne/user', component: user, name: '恋爱誓约后台', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
        ],
    },
    // 系统管理
    {
        path: '/systemManagement',
        component: Home,
        name: '系统管理',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/systemManagement',
                component: systemManagement,
                name: '系统管理',
                hidden: false,
                children: [
                    { path: '/systemManagement/dataSynthesis', component: graphic, name: '账号管理', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin'] } },
                    { path: '/systemManagement/channelDataManagement', component: channelDataManagement, name: '修改密码', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin'] } },
                ],
            },
        ],
    },
    { path: '*', redirect: '/401', hidden: true, },
];
