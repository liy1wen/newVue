<template>
	<!-- 留存数据 -->
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
				<el-form-item>
					<span>渠道</span>
					<el-select multiple collapse-tags style="margin-left: 20px;" v-model="formOne.channel" placeholder="请选择，默认为全渠道">
						<el-option v-for="item in formOne.options" :key="item.id" :label="item.annotation" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span>性别</span>
					<el-select v-model="formOne.sex">
						<el-option label="全部" value=""></el-option>
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="2"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="getTableData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--用户的数据展示列表-->
		<template>
			<el-table ref="tableHeight" :data="onePageTabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
				<el-table-column prop="create_time" label="添加时间" width="150" sortable ></el-table-column>
				<el-table-column prop="send_time" label="发送时间" width="150" sortable ></el-table-column>
				<el-table-column label="性别" width="50" sortable >
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<p v-if="scope.row.condition_sex==0">女</p>
							<p v-else-if="scope.row.condition_sex==1">男</p>
							<p v-else>全部</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="地址" width="80" sortable >
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<p v-if="scope.row.address==0">全国</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="phone_list" label="手机号列表" min-width="150" sortable ></el-table-column>
				<el-table-column prop="template_id" label="短信模板id" width="100" sortable ></el-table-column>
				<el-table-column prop="parameter" label="短信模板参数" width="150" sortable ></el-table-column>
				<el-table-column label="是否定时" width="100" sortable >
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<p v-if="scope.row.is_timing==0">不定时</p>
							<p v-else-if="scope.row.is_timing==1">定时</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="发送状态" width="150" sortable >
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<p v-if="scope.row.send_status==0">未发送</p>
							<p v-else-if="scope.row.send_status==1">已发送</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="operation_name" label="操作人" width="150" sortable ></el-table-column>				
				<el-table-column label="查看" width="100">
					<template slot-scope="scope">
						<el-button type="primary" @click.native.prevent="lookOneUserData(scope.$index, tabData)" size="small">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev,pager,next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="totalpage" style="float:right;"></el-pagination>
			</el-col>
		</template>

	</section>
</template>

<script>
/* 逻辑交互js内容 */
import Event from './../../../public_js/event.js';
import { allget } from '../../../api/api';
import store from '../../../vuex/store';
import axios from 'axios';
export default {
	data() {
		return {
			tableHeight: null, // table展示的页面的高度多少
			// 搜索条件的组装字段
			formOne: {
				choiceDate: [new Date()-180*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
				channel: [],
				options: [],
				sex: '',
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
		// 搜索条件
		searchCondition() {
			var _this = this;
			var obj = {};
			obj.date_s = baseConfig.changeDateTime(_this.formOne.choiceDate[0], 0);
			obj.date_e = baseConfig.changeDateTime(_this.formOne.choiceDate[1], 0);
			if(_this.formOne.channel.length) {
				for(var i=0; i<_this.formOne.channel.length; i++) {
					if(i==0) {
						obj.channel += _this.formOne.channel[i];
					} else {
						obj.channel += ','+_this.formOne.channel[i];
					}
				}
			} else {
				obj.channel = '';
			}
			obj.sex = _this.formOne.sex;
			return obj;
		},
		// 获取数据列表
		getTableData() {
			var _this = this ;
			_this.listLoading = true;
			var url = '/Base/getRetPlayer';
			var params = _this.searchCondition();
			// 如果得到的搜索为null，表示存在搜索条件为空，不进行数据请求
			if(params==null) {
				// 不进行数据请求,直接关闭掉加载的图层
				_this.listLoading = false;
			} else {
				// 进行get请求，(请求参数params, 请求地址url)
				allget(params, url).then(res => {
					// 数据请求成功
					_this.listLoading = false;
					if(res.data.ret) {
						console.log(res.data.data);
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
		// 得到当前的渠道号
		getChannel() {
			var _this = this;
			_this.listLoading = true;
			var url = '/GlobalSet/getChannel';
			allget('', url).then(res => {
				_this.listLoading = false;
				if(res.data.ret) {
					_this.formOne.options = res.data.data;
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg);
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
			_this.getChannel();
			// _this.getTableData();
		})
	}
};
</script>

<style lang="css" scoped>
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
</style>
