<template>
	<!-- 砸金蛋 -->
	<!-- dom结构内容 -->
	<section>
		<el-tabs 
		v-model="tabActiveName" 
		type="border-card" 
		@tab-click="handleClick">
			<el-tab-pane 
			label="家族活动数据统计" 
			name="first" 
			:style="{height:tabSearchHeight+'px'}">
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" style="overflow:hidden;" :model="formOne">
						<el-form-item label="UID">
							<el-input v-model="formOne.params.uid" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getTableFind">查询</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<!--数据展示列表-->
				<template>
					<el-table ref="tableHeight" :data="onePageData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
						<el-table-column prop="start_time" label="开始时间" width="200"></el-table-column>
						<el-table-column prop="end_time" label="结束时间" width="200"></el-table-column>
						<el-table-column prop="family_id" label="家族ID" width="200"></el-table-column>
						<el-table-column prop="theme" label="活动主题" width="200"></el-table-column>
						<el-table-column prop="money" label="活动期间房间流水" min-width="200"></el-table-column>
						<el-table-column prop="num" label="最高在线人数" width="200"></el-table-column>
					</el-table>
					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-pagination layout="total,prev,pager,next,jumper" @current-change="oneHandleCurrentChange" :page-size="20" :total="formOne.TotalPage" style="float:right;"></el-pagination>
					</el-col>
				</template>
			</el-tab-pane>
			<!-- 家族活动列表 -->
			<el-tab-pane label="家族活动列表" name="second" :style="{ height: tabSearchHeight+'px' }">
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" style="overflow: hidden;" :model="formTwo">
						<el-form-item>
							<div class="block">
								<span class="registerTime">日期</span>
								<el-date-picker v-model="formTwo.choiceDate" type="daterange" range-separator=" 至 " placeholder="选择日期范围"></el-date-picker>
							</div>
						</el-form-item>
						<el-form-item label="房间ID">
							<el-input v-model="formTwo.family_id" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="bannerNewloading.dialogShow = true;">新增活动</el-button>							
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getTableManage">查询</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<!--数据展示列表-->
				<template>
					<el-table ref="tableHeight" :data="twoPageData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
						<el-table-column prop="id" label="ID" width="80"></el-table-column>
						<el-table-column prop="start_time" label="开始时间" width="80"></el-table-column>
						<el-table-column prop="end_time" label="结束时间" width="80"></el-table-column>
						<el-table-column prop="family_name" label="家族名称" width="80"></el-table-column>
						<el-table-column prop="family_id" label="家族ID" width="80"></el-table-column>
						<el-table-column label="主活动顶部图片" width="150">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<img :src="scope.row.banner" style="width: 100px; height: auto;">
								</div>
							</template>
						</el-table-column>
						<el-table-column label="弹窗图片" width="150">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<img :src="scope.row.pop_banner" style="width: 100px; height: auto;">
								</div>
							</template>
						</el-table-column>
						<el-table-column label="消息banner图片" width="150">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<img :src="scope.row.message_banner" style="width: 100px; height: auto;">
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="theme" label="活动主题" width="50"></el-table-column>
						<el-table-column prop="content" label="活动内容" min-width="200"></el-table-column>
						<el-table-column prop="status" label="状态" width="100">
							<template slot-scope="scope">
								<p v-if="scope.row.status=='0'">下架中</p>
								<p v-else-if="scope.row.status=='1'">上架中</p>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="150">
							<template slot-scope="scope">
								<el-button v-if="scope.row.status=='0'" type="primary" @click.native.prevent="grounding(scope.$index, formTwo.TabData)" size="small">上架</el-button>								
								<el-button v-else-if="scope.row.status=='1'" type="warning" @click.native.prevent="undercarriage(scope.$index, formTwo.TabData)" size="small">下架</el-button>								
							</template>
						</el-table-column>
					</el-table>
					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-pagination layout="total,prev,pager,next,jumper" @current-change="twoHandleCurrentChange" :page-size="20" :total="formTwo.TotalPage" style="float:right;"></el-pagination>
					</el-col>
				</template>
			</el-tab-pane>
			<!-- banner条新增 -->
			<el-dialog title="活动新增" :visible.sync="bannerNewloading.dialogShow">
				<el-form :model="bannerNewloading.params">
					<el-form-item label="活动时间" :label-width="formLabelWidth">
						<div class="block">
							<el-date-picker v-model="bannerNewloading.params.choiceDate" type="datetimerange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="家族ID" :label-width="formLabelWidth">
						<el-input v-model="bannerNewloading.params.family_id" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="活动主题" :label-width="formLabelWidth">
						<el-input v-model="bannerNewloading.params.theme" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="弹窗图片" :label-width="formLabelWidth">
						<el-input v-model="bannerNewloading.params.pop_banner" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="消息banner图片" :label-width="formLabelWidth">
						<el-input v-model="bannerNewloading.params.message_banner" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="主活动顶部图片" :label-width="formLabelWidth">
						<el-input v-model="bannerNewloading.params.banner" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="活动详情" :label-width="formLabelWidth">
						<el-input v-model="bannerNewloading.params.content[0]" auto-complete="off" placeholder="活动详情1"></el-input>
						<el-input v-model="bannerNewloading.params.content[1]" auto-complete="off" placeholder="活动详情2"></el-input>
						<el-input v-model="bannerNewloading.params.content[2]" auto-complete="off" placeholder="活动详情3"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native.prevent="addBannerSure(0)">取 消</el-button>
					<el-button type="primary" @click.native.prevent="addBannerSure(1)">确 定</el-button>
				</div>
			</el-dialog>
		</el-tabs>
	</section>
</template>

<script>
/* 逻辑交互js内容 */
import Event from './../../public_js/event.js';
import { allget } from '../../api/api';
import store from '../../vuex/store';
import axios from 'axios';
export default {
	data() {
		return {
			tableHeight: null,
			tabSearchHeight: null,
			formOne: {
				params: {
					uid: '',
				},
				tabData: [],
				totalPage: null, 
				page: 1,
				star: '0',
				end: '20',
			},
			formTwo: {
				tabData: [], 
				totalPage: null, 
				page: 1, 
				star: '0',
				end: '20',
			},
			formThree: {
				tabData: [],
				totalPage: null,
				page: 1,
				star: '0',
				end: '20',
			},
			addDialog: {
				dialogShow: false,
				uid: '',
				cheat: '',
				operate_user: '',
			},
			deleteDialog: {
				dialogShow: false,
				uid: '',
				operate_user: '',
			},
			tabActiveName: 'one', //(one、two、three)
			formLabelWidth: '130px', 
		};
	},
	computed:{
		onePageData() {
			var _this = this;
			return _this.formOne.tabData.slice(_this.formOne.star, _this.formOne.end);
		},
	},
	methods: {
		oneHandleCurrentChange(val) {
			var _this = this;
			_this.formOne.page = val;
			_this.getOneData();
		},
		twoHandleCurrentChange(val) {
			var _this = this;
			_this.formTwo.page = val;
			_this.formTwo.star = (_this.formTwo.Page-1)*20;
			_this.formTwo.end = _this.formTwo.star+20;
		},
		threeHandleCurrentChange(val) {
			var _this = this;
			_this.formTwo.Page = val;
			_this.getThreeData();
		},
		// 获取家族数据统计的数据
		getOneData() {
			var _this = this ;
			var url = baseConfig.server+baseConfig.requestUrl+'/NewActivity/getGoldEggData';
			var parmas = {
				uid: _this.formOne.params.uid,
			};
			axios.get(url, {params: params})
			.then((res) => {
				if(res.data.ret) {
					console.log(res.data.data);
					_this.formOne.
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			var params = _this.searchConditionFind();
			if(params==null) { // 如果得到的搜索为null，表示存在搜索条件为空，不进行数据请求
				_this.listLoading = false; // 不进行数据请求,直接关闭掉加载的图层
			} else {
				axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })
				.then((res) => {
					// console.log(res.data);
					_this.listLoading = false;	
					if(res.data.ret) {
						_this.formOne.TotalPage = res.data.data.length; // 正常数据
						_this.formOne.TabData = res.data.data;
					} else {
						baseConfig.errorTipMsg(_this, res.data.msg); // 返回ret==0，非正常数据
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		// 在列表中进行搜索条件
		searchConditionManage() {
			var _this = this;
			var obj = {};
			obj.date_s = baseConfig.changeDateTime(_this.formTwo.choiceDate[0], 0);
			obj.date_e = baseConfig.changeDateTime(_this.formTwo.choiceDate[1], 0);
			obj.family_id = _this.formTwo.family_id;
			for(var key in obj) { // 对需要判断搜索值是否为空进行判断提示
				if(key=='family_id') {
					// 位置的参数可以进行为空
				} else {
					if(obj[key]=='') {
						baseConfig.warningTipMsg(_this, '搜索条件值不能为空！');
						return null;
					}
				}
			}
			return obj; // return出组装好的搜索条件
		},
		// 获取banner管理的数据
		getTableManage() {
			var _this = this ;
			_this.listLoading = true;
			var url = '/Activity/getFamilyThemeActivityInfoList';
			var params = _this.searchConditionManage();
			if(params==null) { // 如果得到的搜索为null，表示存在搜索条件为空，不进行数据请求
				_this.listLoading = false; // 不进行数据请求,直接关闭掉加载的图层
			} else {
				axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })
				.then((res) => {
					_this.listLoading = false;	
					if(res.data.ret) {
						for(var i=0; i<res.data.data.length; i++) {
							res.data.data[i].content = JSON.parse(res.data.data[i].content);
							res.data.data[i].content = JSON.parse(res.data.data[i].content);
							for(var j=0; j<res.data.data[i].content.length; j++) {
								res.data.data[i].content[j] = (j+1)+'、'+decodeURI(res.data.data[i].content[j]);
							}
						}
						_this.formTwo.TotalPage = res.data.data.length; // 正常数据
						_this.formTwo.TabData = res.data.data;
					} else {
						baseConfig.errorTipMsg(_this, res.data.msg); // 返回ret==0，非正常数据
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		// banner条新增
		addBannerSure(type) {
			var _this = this;
			if(type==0) {
				// console.log('点击了取消按钮');
				_this.bannerNewloading.dialogShow = false;
			} else if(type==1) {
				// console.log('点击了确认按钮');
				_this.listLoading = true;
				// 进行添加操作
				let formData = new FormData();
				var start_time = baseConfig.changeDateTime(_this.bannerNewloading.params.choiceDate[0], 1);
				var end_time = baseConfig.changeDateTime(_this.bannerNewloading.params.choiceDate[1], 1);
				for(var i=0; i<_this.bannerNewloading.params.content.length; i++) {
					_this.bannerNewloading.params.content[i] = encodeURI(_this.bannerNewloading.params.content[i]);
				}
				var content = JSON.stringify(_this.bannerNewloading.params.content);
				formData.append('start_time', start_time);
				formData.append('end_time', end_time);
				formData.append('theme', _this.bannerNewloading.params.theme);
				formData.append('family_id', _this.bannerNewloading.params.family_id);
				formData.append('content', content);
				formData.append('banner', _this.bannerNewloading.params.banner);
				formData.append('pop_banner', _this.bannerNewloading.params.pop_banner);
				formData.append('message_banner', _this.bannerNewloading.params.message_banner);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};	
				axios.post(baseConfig.server+baseConfig.requestUrl+'/Activity/addFamilyThemeActivity', formData, config)
				.then((res) => {
					console.log(res.data);
					_this.listLoading = false;	
					_this.bannerNewloading.dialogShow = false;								
					if(res.data.ret) {	
						baseConfig.successTipMsg(_this, '新增成功！');
						_this.getTableFind();
						_this.getTableManage();
					} else {
						baseConfig.errorTipMsg(_this, res.data.msg);						
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		// 上架的操作
		grounding(index, rows) {
			var _this = this;
			index = index + (_this.formTwo.Page-1)*20;
			var id = rows[index].id;
			_this.listLoading = true;
			var url = 'Activity/upDownFamilyThemeActivity';
			var params = {
				id: id,
				status: 1,
			};
			axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })
			.then((res) => {
				_this.listLoading = false;	
				if(res.data.ret) {
					baseConfig.successTipMsg(_this, '上架成功！');
					_this.getTableFind();
					_this.getTableManage();
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg); // 返回ret==0，非正常数据
				}
			}).catch((error) => {
				console.log(error);
			});
		},
		// 下架的操作
		undercarriage(index, rows) {
			var _this = this;
			index = index + (_this.formTwo.Page-1)*20;
			var id = rows[index].id;
			_this.listLoading = true;
			var url = 'Activity/upDownFamilyThemeActivity';
			var params = {
				id: id,
				status: 0,
			};
			axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })
			.then((res) => {
				_this.listLoading = false;	
				if(res.data.ret) {
					baseConfig.successTipMsg(_this, '下架成功！');
					_this.getTableFind();
					_this.getTableManage();
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg); // 返回ret==0，非正常数据
				}
			}).catch((error) => {
				console.log(error);
			});
		},
		// 顶部tab进行页面的切换
		handleClick(tab, event) {
			var _this = this;
			// console.log(tab.label);
		},
	},
	mounted() {
		var _this = this;
		this.$nextTick(function() {
			_this.tableHeight = baseConfig.lineNumber(tabSearchPageHeight);
			_this.tabSearchHeight = baseConfig.lineNumber(tabSearchHeight);
			_this.getTableFind();
			_this.getTableManage();
		})
	}
};
</script>

<style lang="css" scoped>
/* 引入的图片展示样式 */
.fileinput{
	float: left;
	margin-top: 8px;
}
/* 页面样式css内容 */
.excelBox{
	width: 500px; height: 270px; margin-left: -150px; background: #f1f7ff;
	position: absolute; left: 50%; top: 15%; z-index: 1000;
}
p{ margin: 0; }
.excelBox>p{
	width: 100%; height: 50px; line-height: 50px; font-weight: bold;
	background: #e3efff; text-align: center;
}
.excelBox .excelInput{
	width: 100%; height: 60px;
}
.excelBox .select{
	width: 100%; height: 80px;
}
.excelBox .excelInput p,
.excelBox .select p{
	width: 100%; height: 36px; text-indent: 20px; line-height: 36px;
}
.excelBox .excelInput input{
    width: 300px; display: block; margin: 0 auto;
}
.excelBox .select>div{
	width: 300px; display: block; margin: 0 auto;
}
.btns{
    width: 100%; height: 50px;
}
.btns button{
    width: 80px; height: 40px; text-align: center; line-height: 40px;
    border: none; border-radius: 5px;
    background-color: #78B2FF; margin-top: 20px; color: #fff;
}
.btns button:nth-of-type(1){
    margin-left: 150px; cursor: pointer;
}
.btns button:nth-of-type(2){
    margin-left: 50px; cursor: pointer;
}
.demo-ruleForm{
	width: 500px;
}
.el-tab-pane{
	height: 800px;
}
</style>
