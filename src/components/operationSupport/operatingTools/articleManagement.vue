<template>
	<!-- 文章管理，直接实现在文章管理里面进行对应的内容的跳转 -->
	<!-- dom结构内容 -->
	<section>
		<!-- 工具条/头部的搜索条件搜索 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" style="overflow: hidden;">
                <el-form-item>
					<el-button type="primary" @click="dialogAddFormVisible=true;">新增</el-button>
					<el-button type="primary" @click="refreshPage($event)">刷新</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--用户的数据展示列表-->
		<template>
			<el-table ref="tableHeight" :data="onePageTabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
				<el-table-column prop="add_time" label="添加时间" width="100" sortable ></el-table-column>
				<el-table-column prop="id" label="文章ID" width="50"></el-table-column>
				<el-table-column prop="title" label="标题" width="200"></el-table-column>
				<el-table-column label="封面图" width="150">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <img :src="scope.row.image_url" alt="" style="width: 100px; height: auto;">
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="create_time" label="点击跳转链接" width="200">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <a style="color: red;" :href="'http://manage.dianliaoapp.com/client/dev/explain/article.php?id='+scope.row.id" target="_blank">{{scope.row.title}}</a>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button type="primary" @click.native.prevent="changeOneUserData(scope.$index, scope.row)" size="small">编辑</el-button>
						<el-button type="primary" @click.native.prevent="deleteOneUserData(scope.$index, scope.row)" size="small">删除</el-button>
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
			excelBoxActivity: false, // 控制提交Excel的提交框的显示隐藏
			listLoading: false, //动画加载时显示的动画
			tabData: [], //列表的所有数据，移除删除的功能用全部的数据进行移除
			totalpage: null, //下方工具条的总页数 
			page: 1, //现在数据展示的页数，当返回的是全部的数据时，设置默认的页面为1
			star: '0', //每一页的开始数据
			end: '20', //每一页的结束数据
			dialogFormVisible: false, // 控制dialog弹框编辑修改的显示和隐藏
			dialogAddFormVisible: false, // 控制dialog弹框新增的显示和隐藏
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
			var url = '/Anchor/getArticle';
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
		// 编辑修改某一条随机标签
		changeOneUserData(index, rows){
            // 进行跳转到相应的，文本的编辑器
            _this.$router.replace({
                path: '/empty', 
                query: {from: strPath},
            });
		},
		// 新增一条随机标签
		addSure(val) {
			var _this = this;
			if(val==0) {
				// 点击了取消按钮
				_this.dialogFormVisible = false; // 点击了取消、确定按钮都要进行隐藏dialog框
				console.log('点击了取消按钮');
			} else if(val==1) {
				// 点击了确认按钮
				console.log('点击了确认按钮');
				_this.listLoading = true;
				// 进行添加的操作
				var url = '/GlobalSet/addLabels';
				var params = {
					name: _this.formThree.name,
				};
				// 判断必须是要有输入内容和设置性别才能进行新增条件查询
				if(params.name!=''){
					_this.dialogAddFormVisible = false; // 点击了取消、确定按钮都要进行隐藏dialog框
					allget(params, url).then(res => {
						console.log(res);
						if(res.data.ret) {
							// 数据请求成功
							_this.listLoading = false;
							baseConfig.successTipMsg(_this, '新增成功！');
							_this.getTableData();
						} else {
							baseConfig.errorTipMsg(_this, res.data.msg);
						}
					}).catch(function(error){
						console.log(error);
					})
				} else {
					_this.listLoading = false; 
					baseConfig.warningTipMsg(_this, '新增的随机标签内容不能为空');
				}
			} 
		},
		// 删除某一条随机标签
		deleteOneUserData(index, rows) {
            var _this = this;
			var id = rows.id;	
			_this.listLoading = true;
			var url = '/Anchor/delArticle';
			var params = {
				id: id,
			};
			allget(params, url).then(res => {
				_this.listLoading = false;
				if(res.data.ret) {
					baseConfig.successTipMsg(_this, '删除成功');
					_this.getTableData();
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg);
				}
			}).catch(function(error) {
				console.log(error);
			})
		},
		// 进行页面刷新功能
		refreshPage() {
			var _this = this;
			var strPath = location.href;
            if(strPath.indexOf('http://')==0) {
                strPath = strPath.substring(strPath.indexOf('http://')+7, strPath.length);
            }
            var index = strPath.indexOf('/');
			strPath = strPath.substring(index, strPath.length);
            _this.$router.replace({
                path: '/empty', 
                query: {from: strPath},
            });
		},
	},
	mounted() {
		var _this = this;
		this.$nextTick(function() {
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
