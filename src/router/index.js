// 引用vue 和vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';
// 大板块的引用
import Home from '../components/Home/home.vue';//总的页面
import operationData from '../components/Home/operationData.vue';//运营数据
import userManagement from '../components/Home/userManagement.vue';//用户管理
import operationSupport from '../components/Home/operationSupport.vue';//运营支撑
import activities from '../components/Home/activities.vue';//活动专区
import systemSetup from '../components/Home/systemSetup.vue';//系统设置
import Login from '../components/rootGlobal/login.vue';//登陆页面
// 页面的基本架构
import Hello from '../components/Home/hello.vue';//欢迎界面
import Err401 from '../components/rootGlobal/401.vue';//错误界面
import empty from '../components/rootGlobal/empty.vue';//空组建进行页面进行刷新时使用
// 测试的引用查看数据

// 1、运营数据
// 运营数据start
// 1-1综合概述
// 1-2用户分析
import heldOutData from '../components/operationData/userAnalysis/heldOutData.vue';//留存数据
import onlineDistribute from '../components/operationData/userAnalysis/onlineDistribute.vue';//在线时长分布
// 1-3充值与消费
import financialDaily from '../components/operationData/rechargeConsumption/financialDaily.vue';//财务日报
import dailyRealTimeRecharge from '../components/operationData/rechargeConsumption/dailyRealTimeRecharge.vue';//每日实时充值数据
import payUserDataList from '../components/operationData/rechargeConsumption/payUserDataList.vue';//付费用户数据
// 1-4通话数据统计
import callDataSummary from '../components/operationSupport/callLog/CallDataSummary.vue';//通话数据汇总
import timeMatching from '../components/operationSupport/callLog/timeMatching.vue';//实时详情
import realTimeCall from '../components/operationSupport/callLog/realTimeCall.vue';//实时通话次数
import randomCallSummary from '../components/operationSupport/callLog/randomCallSummary';//随机通话汇总
import hotLineSummary from '../components/operationSupport/callLog/hotlineCallSummary.vue';//网红通话汇总
import friendsCallSummary from '../components/operationSupport/callLog/friendsCallSummary.vue';//好友通话汇总
import eavesdroppingSummary from '../components/operationSupport/callLog/eavesdroppingSummary.vue';//偷听汇总
import GrabChatDataSummary from '../components/operationSupport/callLog/GrabChatDataSummary.vue';//抢聊通话汇总
import newRecordingAddList from '../components/operationSupport/callLog/newRecordingAddList.vue';//每日新增录音统计
// 1-5运营数据统计
import imMessageStatistics from '../components/operationData/operationDataStatistics/imMessageStatistics.vue';//IM消息统计
// 1-1渠道数据
import channelManagement from '../components/operationData/channelData/channelManagement.vue';//渠道管理
import channelDataList from '../components/operationData/channelData/channelDataList.vue';//分渠道数据

// 运营数据end

// 2、用户管理
// 用户管理start
// 2-1用户信息管理
import idReview from '../components/userManagement/userInformationManagement/idReview.vue';//用户认证审核(可操作)
import idReviewList from '../components/userManagement/userInformationManagement/idReviewList.vue';//用户认证审核列表
import userComplaintsList from '../components/userManagement/userInformationManagement/userComplaintsList.vue';//用户投诉处理
import openCloseList from '../components/userManagement/userInformationManagement/openCloseList.vue';//账号封禁记录（可封禁）
import recordingComplaints from '../components/userManagement/userInformationManagement/recordingComplaints.vue';//录音投诉管理
import girlsRanking from '../components/userManagement/userInformationManagement/girlsRanking.vue';//女性魅力值
// 2-2家族管理
import liveBroadCast from '../components/userManagement/householdManagement/liveBroadCastManage.vue';//房间数据和记录
import roomConsumptionFlow from '../components/userManagement/householdManagement/roomConsumptionFlowManage.vue';//房间消费流水
// 2-3代理推广管理
import agentTotalView from '../components/userManagement/agentPromotionManagement/agentTotalView.vue';//推广数据总览
import agentPopularize from '../components/userManagement/agentPromotionManagement/agentPopularize.vue';//代理推广查询
import agentRanking from '../components/userManagement/agentPromotionManagement/agentRanking.vue';//代理排行榜
import agentBindingQuery from '../components/userManagement/agentPromotionManagement/agentBindingQuery.vue';//代理绑定查询
import agentBindingQueryTest from '../components/userManagement/agentPromotionManagement/agentBindingQueryTest.vue';//代理绑定查询(测试服)
// 2-4主播管理
import anchorDailyBehaviorDataStatistics from '../components/userManagement/anchorsManagement/anchorDailyBehaviorDataStatistics.vue';//主播每日行为数据统计
import anchorDailyDataCollection from '../components/userManagement/anchorsManagement/anchorDailyDataCollection.vue';//主播每日数据汇总
import anchorPersonalDataCollection from '../components/userManagement/anchorsManagement/anchorPersonalDataCollection.vue';//主播个人数据汇总
// 用户管理end

// 3、运营支撑**
// 运营支撑start
// 3-1、app内容管理
import barrageTopicManagement from '../components/operationSupport/appContentManagement/barrageTopicManagement.vue';//弹幕话题管理
import newUsersMatchFriends from '../components/operationSupport/appContentManagement/newUsersMatchFriends.vue';//新用户匹配好友
import randomLabel from '../components/operationSupport/appContentManagement/randomLabel.vue';//随机标签
import randomNickname from '../components/operationSupport/appContentManagement/randomNickname.vue';//随机昵称
import randomSignature from '../components/operationSupport/appContentManagement/randomSignature.vue';//随机签名
import registeredUserGreeting from '../components/operationSupport/appContentManagement/registeredUserGreeting.vue';//注册用户招呼语
import revenueSuspensionWindow from '../components/operationSupport/appContentManagement/revenueSuspensionWindow.vue';//收益悬浮窗
// 3-2、运营工具
import activityNotificationManagement from '../components/operationSupport/operatingTools/activityNotificationManagement.vue';//活动通知管理
import adRestrictionParameters from '../components/operationSupport/operatingTools/adRestrictionParameters.vue';//广告限制次数
import bannerManagement from '../components/operationSupport/operatingTools/bannerManagement.vue';//banner管理
import giftManagement from '../components/operationSupport/operatingTools/giftManagement.vue';//礼物管理(正式服)
import giftManagementTest from '../components/operationSupport/operatingTools/giftManagementTest.vue';//礼物管理(测试服)
import marqueeManagement from '../components/operationSupport/operatingTools/marqueeManagement.vue';//跑马灯管理
import sendMessageNotifications from '../components/operationSupport/operatingTools/sendMessageNotifications.vue';//发送短信通知
import sendSystemNotification from '../components/operationSupport/operatingTools/sendSystemNotification.vue';//发送系统通知
// 3-3、录音日志
import DailyAdditions from '../components/operationSupport/recordingLog/DailyAdditions.vue';//每日新增录音明细
import recordShareManage from '../components/operationSupport/recordingLog/recordShareManage.vue';//录音分享卡片
import systemRack from '../components/operationSupport/recordingLog/systemRack.vue';//录音下榜列表
import tapeSharingData from '../components/operationSupport/recordingLog/tapeSharingData.vue';//分享页推荐录音列表
import wonderfulRecord from '../components/operationSupport/recordingLog/wonderfulRecord.vue';//录音精彩内容
// 3-4、通话日志
import openCallManage from '../components/operationSupport/callLog/openCallManage.vue';//公开通话管理
// 3-5、财务管理
import presentAuditReview from '../components/operationSupport/financialManagement/presentAuditReview.vue';//提现审核管理
import presentAuditReviewActivity from '../components/operationSupport/financialManagement/presentAuditReviewActivity.vue';//提现审核管理
import monetaryMembershipApplicationAndRecord from '../components/operationSupport/financialManagement/monetaryMembershipApplicationAndRecord.vue';//货币、会员申请管理(测试)
import monetaryMembershipApplicationAndRecordActivity from '../components/operationSupport/financialManagement/monetaryMembershipApplicationAndRecordActivity.vue';//货币、会员申请管理(正式)
import applicationMonyMg from '../components/operationSupport/financialManagement/applicationMonyMg.vue';//货币申请及记录
import applicationMonyMgActivity from '../components/operationSupport/financialManagement/applicationMonyMgActivity.vue';//货币申请及记录（正）
// 运营支撑end

// 4、活动专区
// 活动专区start
import familyBackstageBackstageManage from '../components/activities/familyBackstageBackstageManage.vue';//家族活动正式服后台
import familyBackstageBackstageTest from '../components/activities/familyBackstageBackstageTest.vue';//家族活动测试服后台
import roomTopManagement from '../components/activities/roomTopManagement.vue';//家族置顶管理
import roomTopManagementTest from '../components/activities/roomTopManagementTest.vue';//家族置顶管理(测试服)
import loveActivityManage from '../components/activities/loveActivityManage.vue';//情人节数据统计
import interactionInfo from '../components/activities/interactionInfo.vue';//黑色情人节互动信息
import rechargeTheCrowdManagement from '../components/activities/rechargeTheCrowdManagement.vue';//充值众筹管理
import rechargeTheCrowdManagementTest from '../components/activities/rechargeTheCrowdManagementTest.vue';//充值众筹管理
// 活动专区end
// 5、系统设置
// 系统设置start
import imageUpload from '../components/systemSetup/imageUpload.vue';//图片上传
import globalParameter from '../components/systemSetup/globalParameter.vue';//全局参数
import modifyThePassword from '../components/systemSetup/modifyThePassword.vue';//密码修改
// 系统设置end

// 留存测试填充数据
import user from '../components/User/richText.vue';//文章编辑
import userQuery from '../components/User/userQuery.vue';//用户查询
import userComplaints from '../components/User/userComplaints.vue';//用户查询
import channelDataManagement from '../components/basicData/channelDataManagement'; //总渠道基础数据
import subChannel from '../components/basicData/subChannel'; //分渠道数据
import liveOnlineDetails from '../components/basicData/liveOnlineDetails'; //实时在线详情
import realTimeMatching from '../components/basicData/realTimeMatching'; //实时匹配详情
import graphic from '../components/graphic/dataSynthesis.vue';


// 系统设置 


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
                    { path: '/operationData/comprehensiveOverview/user', component: user, name: '综合数据', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '用户分析',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationData/userAnalysis/user', component: user, name: '激活与注册', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/heldOutData', component: heldOutData, name: '留存数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/user', component: user, name: '活跃用户', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/user', component: user, name: '日活用户行为', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/user', component: user, name: '平台5分钟实时在线', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/user', component: user, name: '每日在线人数', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/user', component: user, name: '人均使用时长', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/user', component: user, name: '使用频率', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/userAnalysis/onlineDistribute', component: onlineDistribute, name: '在线时长分布', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '充值与消费',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationData/rechargeConsumption/financialDaily', component: financialDaily, name: '财务日报', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/rechargeConsumption/dailyRealTimeRecharge', component: dailyRealTimeRecharge, name: '分时充值详情', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/rechargeConsumption/monthRealTimeRecharge', component: dailyRealTimeRecharge, name: '每月充值详情', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/rechargeConsumption/payUserDataList', component: payUserDataList, name: '付费用户数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/rechargeConsumption/user', component: user, name: '聊币数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/rechargeConsumption/user', component: user, name: '聊票数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/rechargeConsumption/user', component: user, name: '礼物数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/rechargeConsumption/user', component: user, name: 'VIP会员充值数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '通话数据统计',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationData/callLog/callDataSummary', component: callDataSummary, name: '通话数据汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/timeMatching', component: timeMatching, name: '实时匹配详情', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/realTimeCall', component: realTimeCall, name: '实时通话次数', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/randomCallSummary', component: randomCallSummary, name: '随机通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/hotLineSummary', component: hotLineSummary, name: '网红通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/friendsCallSummary', component: friendsCallSummary, name: '好友通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/eavesdroppingSummary', component: eavesdroppingSummary, name: '偷听汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/GrabChatDataSummary', component: GrabChatDataSummary, name: '抢聊通话汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/callLog/newRecordingAddList', component: newRecordingAddList, name: '录音数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '运营数据统计',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationData/operationDataStatistics/user', component: user, name: '分享页数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/operationDataStatistics/im', component: imMessageStatistics, name: 'IM消息统计', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
            {
                path: '/operationData',
                component: operationData,
                name: '渠道数据',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationData/channelData/channelDataList', component: channelDataList, name: '分渠道数据', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationData/channelData/channelManagement', component: channelManagement, name: '渠道管理', hidden: false, meta: { role: ['admin', 'testP1'] } },                    
                ],
            },
        ],
    },
    // 用户管理
    {
        path: '/userManagement',
        component: Home,
        name: '用户管理',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/userManagement',
                component: userManagement,
                name: '用户信息管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '用户信息查询', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '置顶网红管理', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/idReview', component: idReview, name: '用户认证审核（可操作）', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/idReviewList', component: idReviewList, name: '用户认证审核列表', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/userComplaintsList', component: userComplaintsList, name: '用户投诉处理', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/openCloseList', component: openCloseList, name: '账号封禁记录（可解禁）', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/recordingComplaints', component: recordingComplaints, name: '录音投诉处理', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '设备及IP封禁管理', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '货币流水查询', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '礼物赠送查询', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '用户登录查询', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '充值排行榜', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/user', component: user, name: '收入排行榜', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                    { path: '/userManagement/userInformationManagement/girlsRanking', component: girlsRanking, name: '女性魅力值', hidden: false, meta: { role: ['admin', 'testP1'] } },                                        
                ],
            },
            {
                path: '/userManagement',
                component: userManagement,
                name: '家族管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/userManagement/householdManagement/user', component: user, name: '家族查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/householdManagement/liveBroadCast', component: liveBroadCast, name: '房间数据和记录', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/householdManagement/roomConsumptionFlow', component: roomConsumptionFlow, name: '房间消费流水', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/householdManagement/user', component: user, name: '解散家族', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/householdManagement/user', component: user, name: '家族后台账号管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/userManagement',
                component: userManagement,
                name: '代理推广管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/userManagement/agentPromotionManagement/agentTotalView', component: agentTotalView, name: '推广数据总览', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/agentPromotionManagement/agentPopularize', component: agentPopularize, name: '代理推广查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/agentPromotionManagement/agentRanking', component: agentRanking, name: '代理排行榜', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/agentPromotionManagement/agentBindingQueryTest', component: agentBindingQueryTest, name: '代理绑定查询（测试服）', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/userManagement',
                component: userManagement,
                name: '主播管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/userManagement/anchorsManagement/anchorDailyBehaviorDataStatistics', component: anchorDailyBehaviorDataStatistics, name: '主播每日行为数据统计', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/anchorsManagement/anchorDailyDataCollection', component: anchorDailyDataCollection, name: '主播每日数据汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/userManagement/anchorsManagement/anchorPersonalDataCollection', component: anchorPersonalDataCollection, name: '主播个人数据汇总', hidden: false, meta: { role: ['admin', 'testP1'] } },
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
                name: '财务管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/financialManagement/presentAuditReview', component: presentAuditReview, name: '提现审核管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/monetaryMembershipApplicationAndRecord', component: monetaryMembershipApplicationAndRecord, name: '货币、会员申请及记录', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/user', component: user, name: '充值流水查询', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/user', component: user, name: '提现审核', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/user', component: user, name: '提现记录', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/user', component: user, name: '货币申请审核', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/applicationMonyMg', component: applicationMonyMg, name: '货币申请及记录', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/user', component: user, name: '充值配置列表', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/financialManagement/user', component: user, name: '充值配置操作记录', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '运营工具',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/operatingTools/giftManagementTest', component: giftManagementTest, name: '礼物管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/bannerManagement', component: bannerManagement, name: 'banner条管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/sendSystemNotification', component: sendSystemNotification, name: '发送系统通知', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/marqueeManagement', component: marqueeManagement, name: '跑马灯管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/activityNotificationManagement', component: activityNotificationManagement, name: '活动通知管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/sendMessageNotifications', component: sendMessageNotifications, name: '发送手机短信', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/adRestrictionParameters', component: adRestrictionParameters, name: '广告限制次数', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '通话日志',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/callLog/user', component: user, name: '通话记录明细', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/callLog/openCallManage', component: openCallManage, name: '公开通话管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/callLog/user', component: user, name: '抢聊通话明细', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: '录音日志',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/recordingLog/DailyAdditions', component: DailyAdditions, name: '每日新增录音明细', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/recordingLog/wonderfulRecord', component: wonderfulRecord, name: '精选录音列表', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/recordingLog/tapeSharingData', component: tapeSharingData, name: '分享页推荐列表管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/recordingLog/systemRack', component: systemRack, name: '录音下榜列表', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/recordingLog/user', component: user, name: '录音标签管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/recordingLog/recordShareManage', component: recordShareManage, name: '录音分享卡片', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
            {
                path: '/operationSupport',
                component: operationSupport,
                name: 'App内容管理',
                iconCls: 'el-icon-menu',
                hidden: false,
                children: [
                    { path: '/operationSupport/appContentManagement/user', component: user, name: '首页标签管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/appContentManagement/revenueSuspensionWindow', component: revenueSuspensionWindow, name: '收益悬浮窗', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/appContentManagement/barrageTopicManagement', component: barrageTopicManagement, name: '弹幕话题管理', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/appContentManagement/registeredUserGreeting', component: registeredUserGreeting, name: '注册用户招呼语', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/appContentManagement/newUsersMatchFriends', component: newUsersMatchFriends, name: '新用户匹配好友', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/appContentManagement/randomLabel', component: randomLabel, name: '随机用户标签', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/appContentManagement/randomNickname', component: randomNickname, name: '随机用户昵称', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/appContentManagement/randomSignature', component: randomSignature, name: '随机用户签名', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
        ],
    },
    // 活动专区
    {
        path: '/activities',
        component: Home,
        name: '活动专区',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/activities',
                component: activities,
                name: '活动专区',
                hidden: false,
                children: [
                    { path: '/activities/familyBackstageBackstageManage', component: familyBackstageBackstageManage, name: '家族嗨场(正)', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/activities/roomTopManagement', component: roomTopManagement, name: '家族置顶(正)', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/activities/rechargeTheCrowdManagement', component: rechargeTheCrowdManagement, name: '充值众筹管理(正)', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/operationSupport/operatingTools/giftManagement', component: giftManagement, name: '礼物管理(正)', hidden: false, iconCls: 'el-icon-menu', meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/operationSupport/financialManagement/monetaryMembershipApplicationAndRecordActivity', component: monetaryMembershipApplicationAndRecordActivity, name: '货币、会员申请及记录(正)', hidden: false, iconCls: 'el-icon-menu', meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/userManagement/agentPromotionManagement/agentBindingQuery', component: agentBindingQuery, name: '代理绑定查询（正）', hidden: false, iconCls: 'el-icon-menu', meta: { role: ['admin', 'testP1'] } },                    
                    { path: '/userManagement/financialManagement/presentAuditReviewActivity', component: presentAuditReviewActivity, name: '提现审核管理（正）', hidden: false, iconCls: 'el-icon-menu', meta: { role: ['admin', 'testP1'] } },                    
                    // { path: '/userManagement/financialManagement/applicationMonyMgActivity', component: applicationMonyMgActivity, name: '货币申请及记录（正）', hidden: false, iconCls: 'el-icon-menu', meta: { role: ['admin', 'testP1'] } },                    
                    // { path: '/activities/familyBackstageBackstageTest', component: familyBackstageBackstageTest, name: '家族嗨场(测)', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    // { path: '/activities/roomTopManagementTest', component: roomTopManagementTest, name: '家族置顶(测)', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    // { path: '/activities/rechargeTheCrowdManagementTest', component: rechargeTheCrowdManagementTest, name: '充值众筹管理(测)', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    // { path: '/activities/loveActivityManage', component: loveActivityManage, name: '情人节活动数据统计', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    // { path: '/activities/interactionInfo', component: interactionInfo, name: '黑色情人节互动信息', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
        ],
    },
    // 系统管理
    {
        path: '/systemSetup',
        component: Home,
        name: '系统设置',
        //iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/systemSetup',
                component: systemSetup,
                name: '系统管理',
                hidden: false,
                children: [
                    { path: '/systemSetup/user', component: user, name: '账号管理', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/systemSetup/modifyThePassword', component: modifyThePassword, name: '修改密码', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/systemSetup/globalParameter', component: globalParameter, name: '全局参数', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                    { path: '/systemSetup/imageUpload', component: imageUpload, name: '图片上传', iconCls: 'el-icon-menu', hidden: false, meta: { role: ['admin', 'testP1'] } },
                ],
            },
        ],
    },
    { path: '*', redirect: '/401', hidden: true, },
];
