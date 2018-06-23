<template>
	<!-- 房间置顶管理（测试服） -->
	<!-- dom结构内容 -->
	<section>
		<!-- 工具条/头部的搜索条件搜索 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="formOne">
				<el-form-item>
					<div class="block">
						<span class="registerTime">日期</span>
						<el-date-picker v-model="formOne.choiceDate" type="daterange" range-separator=" 至 " placeholder="选择日期范围"></el-date-picker>
					</div>
				</el-form-item>
				
                <el-form-item style="float: right;">
					<el-button type="primary" @click="dialogFormVisible1=true;">新建</el-button>
					<el-button type="primary" @click="getTableData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--用户的数据展示列表-->
		<template>
			<el-table ref="tableHeight" :data="tabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
				<el-table-column prop="create_time" label="创建时间" sortable ></el-table-column>
				<el-table-column prop="id" label="比赛阵容" sortable >
					<template slot-scope="scope">
						<div>{{scope.row.team_A}} vs {{scope.row.team_B}} </div>
					</template>
				</el-table-column>
				<el-table-column prop="start_time" label="比赛时间" sortable ></el-table-column>
				<el-table-column prop="grant_rate" label="奖金池发放比例" sortable >
					<template slot-scope="scope">
						<div>{{scope.row.grant_rate*100}}% </div>
					</template>
				</el-table-column>
				<el-table-column prop="bonus_A" label="A队应援数" sortable ></el-table-column>
				<el-table-column prop="bonus_C" label="平局应援数" sortable ></el-table-column>
				<el-table-column prop="bonus_B" label="B队应援数" sortable ></el-table-column>
				<el-table-column prop="total_bonus" label="总应援数" sortable ></el-table-column>
				<el-table-column prop="result" label="比赛结果" sortable >
					<template slot-scope="scope">
						<div v-if="scope.row.result">{{scope.row.result}}</div>
						<div v-else>暂无比赛结果</div>
					</template>
				</el-table-column>
				
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="primary" size='mini' @click="edit(scope.$index,scope.row)">编辑</el-button>
						<el-button type="danger" size='mini'  @click="delete1(scope.$index,scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev,pager,next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="totalpage" :current-page="page+1" style="float:right;"></el-pagination>
			</el-col>
		</template>
		<!-- 编辑对应的dialog -->
		<el-dialog title="比赛内容编辑" :visible.sync="dialogFormVisible">
			<el-form :model="formTwo">
				<div class="team">
					<span class="team_A">A队名称:</span><el-input style="width: 100px;margin:0 50px 0 10px;" :value="formTwo.team_A"></el-input>VS
					<span class="team_B">B队名称:</span><el-input style="width: 100px;margin-left: 10px;" :value="formTwo.team_B"></el-input>
				</div>
				<div class="image_up">
					<div class="image_a">
						<img :src="formTwo.team_A_icon">
						<input class="select_f" type="file"  @change="uploading($event, 1)">
						<!-- <button class="load"  @click="submit(1)">上传</button> -->
					</div>
					<div class="image_b">
						<img :src="formTwo.team_B_icon">
						<input class="select_f" type="file"  @change="uploading($event), 2">
						<!-- <button class="load"  @click="submit(2)">上传</button> -->
					</div>
				</div>
				<el-form-item label="比赛开始时间" :label-width="formLabelWidth">
					<el-input v-model="formTwo.start_time" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="竞猜选项" :label-width="formLabelWidth">
					<el-select v-model="formTwo.option_num" placeholder="请选择">
						<el-option label="有平局" value="3"> </el-option>
						<el-option label="无平局" value="2"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发放比例" :label-width="formLabelWidth">
					<el-input v-model="formTwo.grant_rate" auto-complete="off"></el-input>	
				</el-form-item>
				<el-form-item label="A队比分" :label-width="formLabelWidth">
					<el-input v-model="formTwo.score_A" auto-complete="off"></el-input>	
				</el-form-item>
				<el-form-item label="B队比分" :label-width="formLabelWidth">
					<el-input v-model="formTwo.score_B" auto-complete="off"></el-input>	
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addSure(0)">取 消</el-button>
				<el-button type="primary" @click="addSure(1)">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 新加对应的dialog -->
		<el-dialog title="比赛内容新加" :visible.sync="dialogFormVisible1">
			<el-form :model="newData">
				<div class="team">
					<span class="team_A">A队名称:</span><el-input style="width: 100px;margin:0 50px 0 10px;"></el-input>VS
					<span class="team_B">B队名称:</span><el-input style="width: 100px;margin-left: 10px;"></el-input>
				</div>
				<div class="image_up">
					<div class="image_a">
						<img :src="newData.team_A_icon">
						<input class="select_f" type="file"  @change="uploading($event, 1)">
						<!-- <button class="load"  @click="submit(1)">上传</button> -->
					</div>
					<div class="image_b">
						<img :src="newData.team_B_icon">
						<input class="select_f" type="file"  @change="uploading($event), 2">
						<!-- <button class="load"  @click="submit(2)">上传</button> -->
					</div>
				</div>
				<el-form-item label="比赛开始时间" :label-width="formLabelWidth">
					<el-input v-model="newData.start_time" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="竞猜选项" :label-width="formLabelWidth">
					<el-select v-model="newData.option_num" placeholder="请选择">
						<el-option label="有平局" value="3"> </el-option>
						<el-option label="无平局" value="2"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发放比例" :label-width="formLabelWidth">
					<el-input v-model="newData.grant_rate" auto-complete="off"></el-input>	
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="newAdd()">确 定</el-button>
			</div>
		</el-dialog>
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
			tableHeight: null, // table展示的页面的高度多少
			operate_user: '', // 当前进入的用户
			// 搜索条件的组装字段
			formOne: {
				choiceDate: [new Date()-30*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
			},
			formTwo: {
				id: "",
				team_A: "",
				team_B: "",
				file_A: "",
				file_B: "",
				team_A_icon: "",
				team_B_icon: "",
				start_time: "",
				option_num: "",
				score_A: "",
				score_B: "",
				grant_rate: "",
			},
			newData:{
				team_A: "",
				team_B: "",
				start_time: "",
				grant_rate: "",
				status: "",
				option_num: "",
				team_A_icon: "",
				team_B_icon: "",
			},
			listLoading: false, //动画加载时显示的动画
			tabData: [], //列表的所有数据，移除删除的功能用全部的数据进行移除
			totalpage: null, //下方工具条的总页数 
			page: 0, //现在数据展示的页数
			dialogFormVisible: false, // 控制dialog弹框的显示和隐藏
			dialogFormVisible1: false, // 控制dialog弹框的显示和隐藏
			formLabelWidth: '130px', // 设置dialog弹框的宽度
		};
	},
	methods: {
		// 得到文件
		uploading(event,type) {
			var _this = this;
			if(type == 1){
		  		_this.formTwo.formTwo = event.target.files[0];//获取文件
		  	    var windowURL = window.URL || window.webkitURL;
		        _this.formTwo.file_A = event.target.files[0];
		        //创建图片文件的url
		        _this.formTwo.team_A_icon = windowURL.createObjectURL(event.target.files[0]);
			}else if(type == 2){
				_this.formTwo.file_B = event.target.files[0];//获取文件
		  	    var windowURL = window.URL || window.webkitURL;
		        _this.formTwo.file_B = event.target.files[0];
		        //创建图片文件的url
		        _this.formTwo.team_B_icon = windowURL.createObjectURL(event.target.files[0]);
			}
	  	},
	// 	// 文件上传的功能
	// 	submit(type) {
	// 		var _this = this;
	// 	  	let formData = new FormData();
	// 		if(type == 1){
	// 		  	formData.append('pic', _this.formTwo.file_A);
	// 		}else{
	// 			formData.append('pic', _this.formTwo.file_B);
	// 		}
    //       	let config = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         };
    //         axios.post(baseConfig.server+baseConfig.requestUrl+'/Test/getTestPictureUrl', formData, config)
    //         .then( (res) => {
    //             console.log(res.data);
	// 			baseConfig.successTipMsg(_this, '图片上传成功！');
	// 			if(type == 1){
	// 				_this.formTwo.team_A_icon = res.data;
	// 			}else if(type == 2){
	// 				_this.formTwo.team_B_icon = res.data;
	// 			}
    //             _this.imgAliYunSrc = res.data; 
    //         }).catch((error) =>{
    //             console.log(error);
    //         });
	// 	},
		// 下方页数进行翻页的页码时
		handleCurrentChange(val) {
			var _this = this;
			// val指的是当前点击是第一页
			_this.page = val-1;
			_this.getTableData();
		},
		// 搜索条件
		searchCondition() {
			var _this = this;
			var obj = {};
			obj.date_s = baseConfig.changeDateTime(_this.formOne.choiceDate[0], 0);
			obj.date_e = baseConfig.changeDateTime(_this.formOne.choiceDate[1], 0);
			return obj; // return出组装好的搜索条件
		},
		// 新增世界杯比赛内容
		addSure(val) {
			var _this = this;
			_this.dialogFormVisible1 = true;
		},
		// 编辑世界杯内容
		edit(index, row){
			var _this = this;
			_this.dialogFormVisible = true;
			_this.formTwo.id = row.id;
			_this.formTwo.team_A = row.team_A;
			_this.formTwo.team_B = row.team_B;
			_this.formTwo.team_A_icon = row.team_A_icon;
			_this.formTwo.team_B_icon = row.team_B_icon;
			_this.formTwo.start_time = row.start_time;
			_this.formTwo.option_num = row.option_num;
			_this.formTwo.score_A = row.score_A;
			_this.formTwo.score_B = row.score_B;
			_this.formTwo.grant_rate = row.grant_rate;

		},
		addSure(type){
			if(type == 0){
				_this.dialogFormVisible = false;
				_this.formTwo.id = "";
				_this.formTwo.team_A = "";
				_this.formTwo.team_B = "";
				_this.formTwo.team_A_icon = "";
				_this.formTwo.team_B_icon = "";
				_this.formTwo.start_time = "";
				_this.formTwo.option_num = "";
				_this.formTwo.score_A = "";
				_this.formTwo.score_B = "";
				_this.formTwo.grant_rate = "";
			}else{
				var _this = this; 
				var url = '/Activity/editWorldCup';
				var params = {
					id: _this.formTwo.id,
					team_A: _this.formTwo.team_A,
					team_B: _this.formTwo.team_B,
					start_time: _this.formTwo.start_time,
					grant_rate: _this.formTwo.grant_rate,
					option_num: _this.formTwo.option_num,
					team_A_icon: _this.formTwo.file_A,
					team_B_icon: _this.formTwo.file_B,
					score_A: _this.formTwo.score_A,
					score_B: _this.formTwo.score_B,
				}
				consolo.log(params)
				if(params==null) {
					// 不进行数据请求,直接关闭掉加载的图层
					_this.listLoading = false;
				} else {
					axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })		
					.then(res => {
						// 数据请求成功
						_this.listLoading = false;
						if(res.data.ret) {
							// 正常数据
							_this.getTableData();
							_this.dialogFormVisible = false;
						} else {
							// 返回ret==0，非正常数据
							baseConfig.errorTipMsg(_this, res.data.msg);
						}
					}).catch(function(error){
						console.log(error);
					})
				}
			}
		},
		// 新加比赛内容
		newAdd(){
			var _this = this; 
			var url = '/Activity/addWorldCup';
			var param = {
				team_A: _this.newData.team_A,
				team_B: _this.newData.team_B,
				start_time: _this.newData.start_time,
				grant_rate: _this.newData.grant_rate,
				status: 0,
				option_num: _this.newData.option_num,
				team_A_icon: _this.newData.file_A,
				team_B_icon: _this.newData.file_B,
			}
			if(params==null) {
				// 不进行数据请求,直接关闭掉加载的图层
				_this.listLoading = false;
			} else {
				axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })		
				.then(res => {
					// 数据请求成功
					_this.listLoading = false;
					if(res.data.ret) {
						// 正常数据
						_this.getTableData();
						_this.dialogFormVisible = false;
					} else {
						// 返回ret==0，非正常数据
						baseConfig.errorTipMsg(_this, res.data.msg);
					}
				}).catch(function(error){
					console.log(error);
				})
			}
		},
		// 获取数据列表
		getTableData() {
			var _this = this ;
			_this.listLoading = true;
			var url = '/Activity/getWorldCupList';
			var params = _this.searchCondition();
			// 如果得到的搜索为null，表示存在搜索条件为空，不进行数据请求
			if(params==null) {
				// 不进行数据请求,直接关闭掉加载的图层
				_this.listLoading = false;
			} else {
				axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })		
				.then(res => {
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
			}
		},
		// 取消置顶的方法
		delete1(index, rows) {
			var _this = this;
			var id = rows[index].id;
			var url = '/Activity/delWorldCup';
			var params = {
				id: id,
			};
			axios.get(baseConfig.server+baseConfig.requestUrl+url, { params: params })					
			.then(res => {
				if(res.data.ret) {
					baseConfig.successTipMsg(_this, res.msg);
					_this.getTableData();
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg); // 返回ret==0，非正常数据
				}
			}).catch(function(error){
				console.log(error);
			})
		},
	},
	mounted() {
		var _this = this;
		this.$nextTick(function() {
			_this.tableHeight = searchPageHeight;
			_this.getTableData();
		})
	}
};
</script>

<style lang="css" scoped>
	.team{
		width: 80%;
		margin: 0 auto;
		margin-bottom: 10px;
		/* border: 1px solid red; */
	}
	.team_A{

	}
	.team_A el-input{
		margin-left: 100px;
	}
	.team_B{
		display: inline-block;
		margin-left: 50px;
	}
	.image_up{
		width:100%;
		height: 300px;
		margin-bottom: 10px;

	}
	.image_up .image_a{
		position: relative;
		float: left;
		width: 50%;
		height: 300px;
		text-align: center;
	}
	.image_up .image_a .select_f{
		position: absolute;
		bottom: 20px;
		left: 50px;
	}
	.image_up .image_a .load{
		position: absolute;
		bottom: 20px;
		left: 220px;
	}
	.image_up .image_a img{
		width: 200px;
		height: 200px;
		margin-top: 20px;
	}
	.image_up .image_b{
		position: relative;
		float: right;
		width: 50%;
		height: 300px;
		text-align: center;
	}
	.image_up .image_b .select_f{
		position: absolute;
		bottom: 20px;
		left: 50px;
	}
	.image_up .image_b .load{
		position: absolute;
		bottom: 20px;
		left: 220px;
		
	}
	.image_up .image_b img{
		display: inline-block;
		width: 200px;
		height: 200px;
		margin: 0 auto;
		margin-top: 20px;
	}
</style>
