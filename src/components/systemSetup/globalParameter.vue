<template>
	<!-- 全局参数 -->
	<!-- dom结构内容 -->
	<section>
		<!-- 工具条/头部的搜索条件搜索 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" style="overflow: hidden;">
                <el-form-item>
					<el-button type="primary" @click="formTwo.dialogVisible=true;">添加新参数</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--用户的数据展示列表-->
		<template>
			<el-table ref="tableHeight" :data="onePageTabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
				<el-table-column prop="id" label="ID" width="80" sortable ></el-table-column>
				<el-table-column prop="g_key" label="键" width="150"></el-table-column>
				<el-table-column prop="value" label="值" min-width="400"></el-table-column>
				<el-table-column prop="desc" label="描述" width="250"></el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="primary" @click.native.prevent="changeOneUserData(scope.$index, scope.row)" size="small">编辑</el-button>
						<!-- <el-button type="primary" @click.native.prevent="deleteOneUserData(scope.$index, scope.row)" size="small">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev,pager,next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="totalpage" style="float:right;"></el-pagination>
			</el-col>
			<!-- 编辑修改--对应的dialog -->
			<el-dialog title="编辑修改" :visible.sync="formOne.dialogVisible">
				<el-form :model="formOne">
					<el-form-item label="ID" :label-width="formLabelWidth">
						<el-input disabled v-model="formOne.id" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="键" :label-width="formLabelWidth">
						<el-input v-model="formOne.g_key" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="formOne.id!=37" label="值" :label-width="formLabelWidth">
						<el-input v-model="formOne.value" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="formOne.id==37" label="图片地址" :label-width="formLabelWidth">
						<el-input v-model="formOne.values.home_h5_img" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="formOne.id==37" label="跳转地址" :label-width="formLabelWidth">
						<el-input v-model="formOne.values.home_h5_jump_url" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="formOne.id==37" label="跳转方式" :label-width="formLabelWidth">
						<el-input v-model="formOne.values.home_h5_jump_type" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="formOne.id==37" label="标题" :label-width="formLabelWidth">
						<el-input v-model="formOne.values.home_h5_jump_title" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="formOne.id==37" label="分享内容" :label-width="formLabelWidth">
						<el-input v-model="formOne.values.home_h5_share_content" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="formOne.id==37" label="是否显示" :label-width="formLabelWidth">
						<el-input v-model="formOne.values.home_h5_is_show" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="描述" :label-width="formLabelWidth">
						<el-input type="textarea" autosize v-model="formOne.desc" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="editorSure(0)">取 消</el-button>
					<el-button type="primary" @click="editorSure(1)">确 定</el-button>
				</div>
			</el-dialog>
			<!-- 新增修改--对应的dialog -->
			<el-dialog title="添加新参数" :visible.sync="formTwo.dialogVisible">
				<el-form :model="formTwo">
					<el-form-item label="键" :label-width="formLabelWidth">
						<el-input v-model="formTwo.g_key" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="值" :label-width="formLabelWidth">
						<el-input v-model="formTwo.value" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="描述" :label-width="formLabelWidth">
						<el-input type="textarea" autosize v-model="formTwo.desc" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="addSure(0)">取 消</el-button>
					<el-button type="primary" @click="addSure(1)">确 定</el-button>
				</div>
			</el-dialog>
		</template>
	</section>
</template>

<script>
/* 逻辑交互js内容 */
import Event from '../../public_js/event.js';
import { allget } from '../../api/api';
import store from '../../vuex/store';
import axios from 'axios';
export default {
	data() {
		return {
			tableHeight: null, // table展示的页面的高度多少
			formOne: { // 编辑
				dialogVisible: false,
				id: '',
				g_key: '',
				value: '',
				desc: '',
				values: {
					home_h5_img: '',
					home_h5_jump_url: '',
					home_h5_jump_type: '',
					home_h5_jump_title: '',
					home_h5_share_content: '',
					home_h5_is_show: '',
				},
			},
			formTwo: { // 新增
				dialogVisible: false,			
				g_key: '',
				value: '',
				desc: '',
			},
			listLoading: false, //动画加载时显示的动画
			tabData: [], //列表的所有数据，移除删除的功能用全部的数据进行移除
			totalpage: null, //下方工具条的总页数 
			page: 1, //现在数据展示的页数，当返回的是全部的数据时，设置默认的页面为1
			star: '0', //每一页的开始数据
			end: '20', //每一页的结束数据
			formLabelWidth: '120px', // 设置dialog弹框的宽度
		};
	},
	computed:{
		// 对某一页码展示某一页的数据，对返回的所有的数据进行切割处理，对当前的页码显示20条当前页码的数据
		onePageTabData() {
			var _this = this;
			return _this.tabData.slice(_this.star, _this.end);
		},
	},
	methods: {
		// 下方页数进行翻页的页码时，返回的是全部的数据，配合onePageTabData展示需要展示当前页面的数据
		handleCurrentChange(val) {
			// val指的是当前点击是第一页
			var _this = this;
			_this.page = val;
			_this.star = (_this.page-1)*20;
			_this.end = _this.star+20;
		},
		// 获取数据列表
		getTableData() {
			var _this = this ;
			_this.listLoading = true;
			var url = '/GlobalSet/getGlobalSet';
			// 进行get请求，(请求参数params, 请求地址url)
			allget('', url).then(res => {
				// 数据请求成功
				_this.listLoading = false;
				if(res.data.ret) {
					// 正常数据
					_this.totalpage = res.data.data.length;
					_this.tabData = res.data.data;
				} else {
					// 返回ret==0，非正常数据
					baseConfig.errorTipMsg(_this, res.data.msg);
				}
			}).catch(function(error){
				console.log(error);
			})
		},
		// 编辑修改某一条渠道号名称
		changeOneUserData(index, rows){
			var _this = this;
			index = index + (_this.page-1)*20;
			_this.formOne.id = rows.id;
			_this.formOne.g_key = rows.g_key;
			_this.formOne.desc = rows.desc;
			if(_this.formOne.id==37) {
				var aa = JSON.parse(rows.value);
				_this.formOne.values.home_h5_img = aa.home_h5_img;
				_this.formOne.values.home_h5_jump_url = aa.home_h5_jump_url;
				_this.formOne.values.home_h5_jump_type = aa.home_h5_jump_type;
				_this.formOne.values.home_h5_jump_title = aa.home_h5_jump_title;
				_this.formOne.values.home_h5_share_content = aa.home_h5_share_content;
				_this.formOne.values.home_h5_is_show = aa.home_h5_is_show;
			} else {
				_this.formOne.value = rows.value;
				_this.formOne.values.home_h5_img = '';
				_this.formOne.values.home_h5_jump_url = '';
				_this.formOne.values.home_h5_jump_type = '';
				_this.formOne.values.home_h5_jump_title = '';
				_this.formOne.values.home_h5_share_content = '';
				_this.formOne.values.home_h5_is_show = '';
			}
			_this.formOne.dialogVisible = true; // 点击了编辑修改显示dialog框
		},
		// 编辑修改确定
		editorSure(type) {
			var _this = this;
			if(type==0) {
				_this.formOne.dialogVisible = false;
			} else if(type==1) {
				_this.listLoading = true;
				let formData = new FormData();
			  	formData.append('id', _this.formOne.id);
			  	formData.append('g_key', _this.formOne.g_key);
			  	formData.append('desc', _this.formOne.desc);
				if(_this.formOne.id==37) {
					_this.formOne.value = JSON.stringify(_this.formOne.values);
				} else {}
			  	formData.append('value', _this.formOne.value);				
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};		
				axios.post(baseConfig.server+baseConfig.requestUrl+'/GlobalSet/editGlobalSet', formData, config)
				.then((res) => {
					_this.listLoading = false;	
					_this.formOne.dialogVisible = false;									
					if(res.data.ret) {	
						baseConfig.successTipMsg(_this, '编辑修改成功！');
						_this.getTableData();
					} else {
						baseConfig.errorTipMsg(_this, res.data.msg);						
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		// 添加新的活动通知操作
		addSure(type) {
			var _this = this;
			if(type==0) {
				_this.formTwo.dialogVisible = false;
			} else if(type==1) {
				_this.listLoading = true;
				let formData = new FormData();
			  	formData.append('g_key', _this.formTwo.g_key);
			  	formData.append('value', _this.formTwo.value);
			  	formData.append('desc', _this.formTwo.desc);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};		
				axios.post(baseConfig.server+baseConfig.requestUrl+'/GlobalSet/addGlobalSet', formData, config)
				.then((res) => {
					_this.listLoading = false;	
					_this.formTwo.dialogVisible = false;									
					if(res.data.ret) {	
						baseConfig.successTipMsg(_this, '新增成功！');
						_this.getTableData();
					} else {
						baseConfig.errorTipMsg(_this, res.data.msg);						
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		// 删除某一条活动通知记录
		// deleteOneUserData(index, rows) {
		// 	var _this = this;
		// 	index = index + (_this.page-1)*20;
		// 	var id = rows.id;
		// 	_this.listLoading = true;
		// 	let formData = new FormData();
		//   	formData.append('id', id);
		// 	let config = {
		// 		headers: {
		// 			'Content-Type': 'multipart/form-data'
		// 		}
		// 	};		
		// 	axios.post(baseConfig.server+baseConfig.requestUrl+'/GlobalSet/delGlobalSet', formData, config)
		// 	.then((res) => {
		// 		_this.listLoading = false;
		// 		if(res.data.ret) {
		// 			baseConfig.successTipMsg(_this, '删除成功');
		// 			_this.getTableData();
		// 		} else {
		// 			baseConfig.errorTipMsg(_this, res.data.msg);
		// 		}
		// 	}).catch((error) => {
		// 		console.log(error);
		// 	});
		// },
	},
	mounted() {
		var _this = this;
		_this.$nextTick(function() {
			_this.tableHeight = baseConfig.lineNumber(searchPageHeight); // 固定table的自适应的高度
			_this.getTableData(); // 一开始加载table表的数据
		})
	}
};
</script>

<style lang="css" scoped>
/* 页面样式css内容 */
.excelBox{
	width: 500px; height: 190px; margin-left: -150px; background: #f1f7ff;
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
</style>
