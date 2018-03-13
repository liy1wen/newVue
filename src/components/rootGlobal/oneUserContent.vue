<template>
<!-- dom结构内容 -->
	<section>
		<!--用户详情的弹出框  -->
		<el-dialog title="用户详情" :visible.sync="dialogVisible" size="large">
			<el-row  v-loading="isgetuser" element-loading-text="拼命加载中" :gutter="20">
				<el-col :span="12">头像<div class="bg-purple" ></div>
					<div style="width:220px;height:220px;margin:auto">
						<span class="photo_close" @click="deleteAll(2,userinfo.uid)">x</span>					
						<img style="width:200px;height:200px;" :src="userinfo.icon" alt="" >
					</div> 
				</el-col>
				<el-col :span="6"><div class="grid-content bg-purple">用户uid：{{userinfo.uid}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">昵称：{{userinfo.nickname}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">手机号码：{{userinfo.phone}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">微信号：{{userinfo.unionid}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">用户地址：{{userinfo.address}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">性别：{{userinfo.sex}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">生日：{{userinfo.birthday}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">实名认证状态：{{userinfo.realname_aut_status}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">评价分数：{{userinfo.evaluate_score}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">魅力值：{{userinfo.charm_score}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">聊票：{{userinfo.volumes}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">聊币：{{userinfo.chat_gold}}</div></el-col>
				<el-col :span="12" style="height:50px">
					<div class="grid-content " style="height:50px;float:left">
						<audio :src="userinfo.voice_signature" controls="controls" preload="none"></audio>
					</div>
					<el-button type="primary" size="mini" icon="close" v-if="userinfo.voice_signature!=null" @click="deleteAll(3,userinfo.uid)"></el-button>
				</el-col>	
				<el-col :span="6"><div class="grid-content bg-purple">累计充值金额：{{userinfo.money}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">渠道：{{userinfo.channel}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">通话定价：{{userinfo.price}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">个性签名：{{userinfo.signature}}</div></el-col>
				<el-col :span="12" style="height:350px">相册：
					<div class="grid-content" style="overflow:auto;height:350px">
						<el-col :span="6" v-for="(o, index) in allimg" :key="o" style="float:left;margin: 2px 0;">
							<el-card :body-style="{ padding: '0px' }">
							<img :src="o" class="image" style="width:110px;height:110px;">
							<div style="padding: 0px;">															
								<el-button type="text" class="button" @click="deleteAll(1,userinfo.uid,index)">删除</el-button>
							</div>
							</el-card>	
						</el-col>
					</div>
				</el-col>
				<el-col :span="6"><div class="grid-content bg-purple">注册时间：{{userinfo.addtime}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">最后登录时间：{{userinfo.lasttime}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">职业：{{userinfo.occupation}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">收到的礼物数：{{userinfo.gift}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">累积通话时长：{{userinfo.accumulate_time}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">随机通话时间：{{userinfo.totalrandtime}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">随机通话次数：{{userinfo.totalrandcall}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">网红通话次数：{{userinfo.totalredcall}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">网红通话时间：{{userinfo.totalredtime}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">好友数：{{userinfo.friend}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">好友通话次数：{{userinfo.totalfriendcall}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">好友通话时间：{{userinfo.totalfriendtime}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">偷听次数：{{userinfo.totallistencall}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">偷听时间：{{userinfo.totallistentime}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">用户版本：{{userinfo.version_name}}</div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple">账号状态：{{userinfo.status}}</div></el-col>
			</el-row>
		</el-dialog>
	</section>
</template>

<script>
/* 逻辑交互js内容 */
import Event from '../../public_js/event.js';
import { allget } from '../../api/api';
import store from '../../vuex/store';
export default {
	data() {
		return {
			userinfo: [], //用户信息的数据
			dialogVisible: false, //控制弹窗的显示隐藏
			isgetuser: false, //是否获得用户信息的数据
		}
    },
	computed:{
		allimg(){
			return this.userinfo.photo_wall;
		}
	},
	methods: {
		// 获取单个用户的信息 
		getuserinfo(uid){
			let _this =this;
			_this.isgetuser = true;
			let url = '/User/getUserInfo';// /User/getUserInfo
			let data ={ uid: uid, };
			allget(data, url).then(data => {
                // console.log(data.data);
				if (data.data.ret) {
					_this.userinfo = data.data.data[0];
					_this.dialogVisible = true;
					_this.isgetuser = false;
				} else {
					_this.$notify.error({
							title: '错误',
							message: res.data.msg,
							duration: 1000,
							offset: 100
						}); 
					_this.isgetuser=false;
				}
			}).catch(function(err){
				console.log(err);
				_this.isgetuser=false;
				_this.$notify.error({
					title: '错误',
					message: '遇到了未知的问题请联系管理员解决',
					duration: 0
				});
			});
			
		},
    },
	mounted() {
        var _this = this;
        // 在个人信息展示组件，mounted的方法中监听是否点击弹窗用户详情的信息
        Event.$on('show-one-user', function(obj){
            // console.log('监听到了'+obj.uid);   
            // 监听展示事件，进行状态设置为true，然后拉取出用户的个人数据
            // _this.dialogVisible = true;
            _this.getuserinfo(obj.uid);
        });
	},
};
</script>

<style>
/* 页面样式css内容 */
	
</style>
