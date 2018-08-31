<template>
	<!-- 砸金蛋 -->
	<section>
		<el-tabs 
		v-model="tabActiveName" 
		type="border-card" 
		@tab-click="handleClick">
			<el-tab-pane 
			label="砸金蛋数据" 
			name="one" 
			:style="{height:tabHeight+'px'}">
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" style="overflow:hidden;" :model="formOne">
						<el-form-item label="UID">
							<el-input v-model="formOne.params.uid" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getOneData">查询</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<template>
					<el-table 
					ref="tabSearchPageHeight" 
					:data="formOne.tabData" 
					border fit highlight-current-row 
					style="width:100%;" 
					:height="tabSearchPageHeight">
						<el-table-column prop="uid" label="用户UID"></el-table-column>
						<el-table-column prop="one" label="一锤次数"></el-table-column>
						<el-table-column prop="ten" label="十锤次数"></el-table-column>
						<el-table-column prop="hundred" label="百锤次数"></el-table-column>
						<el-table-column prop="left" label="剩余锤子数"></el-table-column>
						<el-table-column prop="reward" label="奖励豆币"></el-table-column>
						<el-table-column prop="use" label="使用锤子数"></el-table-column>
						<el-table-column prop="cost" label="消耗豆币"></el-table-column>
					</el-table>
					<el-col
					:span="24"
					class="toolbar">
						<el-pagination
						layout="total, prev, pager, next, jumper"
						@current-change="oneHandleCurrentChange"
						:page-size="20"
						:total="formOne.totalPage"
						style="float:right;">
						</el-pagination>
					</el-col>
				</template>
			</el-tab-pane>
			<el-tab-pane 
			label="作弊后台" 
			name="two" 
			:style="{height:tabHeight+'px'}">
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" style="overflow:hidden;">
						<el-form-item>
							<el-button 
							type="primary" 
							@click="addDialog.dialogShow=true;">添加</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<template>
					<el-table 
					ref="tabSearchPageHeight" 
					:data="twoPageData" 
					border fit highlight-current-row 
					style="width:100%;" 
					:height="tabSearchPageHeight">
						<el-table-column prop="uid" label="用户UID"></el-table-column>
						<el-table-column prop="num" label="作弊豆币数"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button 
								type="warning" 
								@click.native.prevent="deleteSure(scope.row)" 
								size="small">删除</el-button>								
							</template>
						</el-table-column>
					</el-table>
					<el-col :span="24" class="toolbar">
						<el-pagination 
						layout="total,prev,pager,next,jumper" 
						@current-change="twoHandleCurrentChange" 
						:page-size="20" 
						:total="formTwo.totalPage" 
						style="float:right;"></el-pagination>
					</el-col>
				</template>
			</el-tab-pane>
			<el-tab-pane 
			label="作弊操作日志" 
			name="three" 
			:style="{height:tabHeight+'px'}">
				<template>
					<el-table 
					ref="tabPageHeight" 
					:data="formThree.tabData" 
					border fit highlight-current-row 
					style="width:100%;" 
					:height="tabPageHeight">
						<el-table-column type="index" width="100"></el-table-column>
						<el-table-column prop="content" label="内容"></el-table-column>
					</el-table>
					<el-col :span="24" class="toolbar">
						<el-pagination 
						layout="total,prev,pager,next,jumper" 
						@current-change="threeHandleCurrentChange" 
						:page-size="20" 
						:total="formThree.totalPage" 
						style="float:right;"></el-pagination>
					</el-col>
				</template>
			</el-tab-pane>
			<el-dialog
			title="作弊添加"
			:visible.sync="addDialog.dialogShow">
				<el-form :model="addDialog">
					<el-form-item label="用户UID" :label-width="formLabelWidth">
						<el-input v-model="addDialog.uid"></el-input>
					</el-form-item>
					<el-form-item label="作弊的豆币数" :label-width="formLabelWidth">
						<el-input v-model="addDialog.cheat"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button 
					@click.native.prevent="twoAddBtn(0)">取 消</el-button>
					<el-button 
					type="primary" 
					@click.native.prevent="twoAddBtn(1)">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog
			title="作弊删除"
			:visible.sync="deleteDialog.dialogShow">
				<el-form :model="deleteDialog">
					<p style="width:100%;text-align:center;font-size:16px;color:red;">请确定删除掉该次作弊~</p>
					<p style="width:100%;text-align:center;font-size:20px;color:#000000;">删除掉{{deleteDialog.uid}}的作弊记录{{deleteDialog.num}}</p>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button 
					@click.native.prevent="twoDeleteBtn(0)">取 消</el-button>
					<el-button 
					type="primary" 
					@click.native.prevent="twoDeleteBtn(1)">确 定</el-button>
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
			tabHeight: null,
			tabPageHeight: null,
			tabSearchPageHeight: null,
			operate_user: '',
			formOne: {
				params: {
					uid: '',
				},
				tabData: [],
				totalPage: 1000, 
				page: 0,
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
				totalPage: 1000,
				page: 0,
			},
			addDialog: {
				dialogShow: false,
				uid: '',
				cheat: '',
			},
			deleteDialog: {
				dialogShow: false,
				uid: '',
				num: '',
			},
			tabActiveName: 'two', //(one、two、three)
			formLabelWidth: '130px', 
		};
	},
	computed:{
		twoPageData() {
			var _this = this;
			return _this.formTwo.tabData.slice(_this.formTwo.star, _this.formTwo.end);
		},
	},
	methods: {
		oneHandleCurrentChange(val) {
			var _this = this;
			_this.formOne.page = val-1;
			_this.getOneData();
		},
		twoHandleCurrentChange(val) {
			var _this = this;
			_this.formTwo.page = val-1;
			_this.formTwo.star = _this.formTwo.page*20;
			_this.formTwo.end = _this.formTwo.star+20;
		},
		threeHandleCurrentChange(val) {
			var _this = this;
			_this.formThree.page = val-1;
			_this.getThreeData();
		},
		getOneData() {
			var _this = this ;
			var url = baseConfig.server+baseConfig.requestUrl+'/NewActivity/getGoldEggData';
			var params = {
				uid: _this.formOne.params.uid,
				page: _this.formOne.page,
			};
			axios.get(url, {params: params})
			.then((res) => {
				if(res.data.ret) {
					console.log(res.data.data);
					_this.formOne.tabData = res.data.data;
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg);
				}
			})
			.catch((err) => {
				console.log(err);
			})
		},
		getTwoData() {
			var _this = this ;
			var url = baseConfig.server+baseConfig.requestUrl+'/NewActivity/getGoldEggCheat';
			var params = {};
			axios.get(url, {params: params})
			.then((res) => {
				if(res.data.ret) {
					console.log(res.data);
					// _this.formTwo.tabData = res.data.data;
					// _this.formTwo.totalPage = res.data.data.length;
					var arr = [];
					for(var key in res.data.data) {
						var obj = {};
						obj.uid = key;
						obj.num = res.data.data[key];
						arr.push(obj);
					}
					_this.formTwo.tabData = arr;
					_this.formTwo.totalPage = arr.length;
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg);
				}
			})
			.catch((err) => {
				console.log(err);
			})
		},
		getThreeData() {
			var _this = this ;
			var url = baseConfig.server+baseConfig.requestUrl+'/NewActivity/getGoldEggCheatLog';
			var params = {
				page: _this.formThree.page,
			};
			axios.get(url, {params: params})
			.then((res) => {
				if(res.data.ret) {
					console.log(res.data);
					var arr = [];
					for(var i=0; i<res.data.data.length; i++) {
						var obj = {};
						obj.content = res.data.data[i];
						arr.push(obj);
					}
					_this.formThree.tabData = arr;
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg);
				}
			})
			.catch((err) => {
				console.log(err);
			})
		},
		twoAddBtn(type) {
			var _this = this ;
			var url = baseConfig.server+baseConfig.requestUrl+'/NewActivity/addGoldEggCheat';
			var params = {
				uid: _this.addDialog.uid,
				cheat: _this.addDialog.cheat,
				operate_user: _this.operate_user,
			};
			if(type==0) {
				_this.addDialog.uid = '';
				_this.addDialog.cheat = '';
			} else if(type==1) {
				axios.get(url, {params: params})
				.then((res) => {
					if(res.data.ret) {
						baseConfig.successTipMsg(_this, '添加成功~');
						_this.getTwoData();
					} else {
						baseConfig.errorTipMsg(_this, res.data.msg);
					}
				})
				.catch((err) => {
					console.log(err);
				})
			}
			_this.addDialog.dialogShow = false;
		},
		deleteSure(obj) {
			var _this = this;
			_this.deleteDialog.dialogShow = true;
			_this.deleteDialog.uid = obj.uid;
			_this.deleteDialog.num = obj.num;
		},
		twoDeleteBtn(type) {
			var _this = this ;
			var url = baseConfig.server+baseConfig.requestUrl+'/NewActivity/delGoldEggCheat';
			var params = {
				uid: _this.deleteDialog.uid,
				operate_user: _this.operate_user,
			};
			if(type==0) {
				_this.deleteDialog.uid = '';
				_this.deleteDialog.num = '';
			} else if(type==1) {
				axios.get(url, {params: params})
				.then((res) => {
					if(res.data.ret) {
						baseConfig.successTipMsg(_this, '删除成功~');
						_this.getTwoData();
					} else {
						baseConfig.errorTipMsg(_this, res.data.msg);
					}
				})
				.catch((err) => {
					console.log(err);
				})
			}
			_this.deleteDialog.dialogShow = false;
		},
		handleClick(tab, event) {
			var _this = this;
			console.log(tab.label);
		},
	},
	mounted() {
		var _this = this;
		this.$nextTick(function() {
			_this.tabHeight = baseConfig.lineNumber(tabHeight);
			_this.tabPageHeight = baseConfig.lineNumber(tabPageHeight);
			_this.tabSearchPageHeight = baseConfig.lineNumber(tabSearchPageHeight);
			_this.operate_user = store.state.user.name;
			_this.getOneData();
			_this.getTwoData();
			_this.getThreeData();
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
