<template>
	<!-- 文章管理 -->
	<section>
		<el-tabs 
		v-model="activeName" 
		type="border-card" 
		@tab-click="handleClick">
			<el-tab-pane 
			label="文章管理" 
			name="one" 
			:style="{height: tabSearchHeight+'px'}">
				<template>
					<el-table 
					ref="tableHeightAddTab" 
					:data="onePageTabData" 
					border fit highlight-current-row 
					v-loading="listLoading" 
					style="width: 100%;" :height="tableHeight">
						<el-table-column prop="add_time" label="添加时间" width="200"></el-table-column>
						<el-table-column prop="id" label="文章ID" width="100"></el-table-column>
						<el-table-column prop="title" label="标题" width="150"></el-table-column>
						<el-table-column label="封面图" width="150">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<img 
									:src="scope.row.image_url" 
									style="width: 100px; height: 100px;">
								</div>
							</template>
						</el-table-column>
						<el-table-column label="链接" width="300">
							<template slot-scope="scope">
								<el-popover
								placement="top-start"
								trigger="hover"
								content="可直接点击跳转查看页面~">
									<a
									slot="reference" 
									v-if="serverStatus==false" 
									style="color: red;" 
									:href="'http://test-manage.dianliaoapp.com/client/dev/explain/article.php?id='+scope.row.id" 
									target="_blank">{{scope.row.title}}</a>
									<a 
									slot="reference" 
									v-else 
									style="color: red;" 
									:href="'http://manage.dianliaoapp.com/client/dev/explain/article.php?id='+scope.row.id" 
									target="_blank">{{scope.row.title}}</a>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width="100">
							<template slot-scope="scope">
								<el-button 
								type="primary" 
								@click.native.prevent="changeOneUserData(scope.$index, scope.row)" 
								size="small">编辑</el-button>								
								<el-button 
								type="primary" 
								@click.native.prevent="deleteOneUserData(scope.$index, scope.row)" 
								size="small">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!--工具条-->
					<el-col 
					:span="24" 
					class="toolbar">
						<el-pagination 
						layout="total, prev, pager, next, jumper" 
						@current-change="handleCurrentChange" 
						:page-size="20" 
						:total="formOne.totalPage" 
						style="float: right;"></el-pagination>
					</el-col>
				</template>
			</el-tab-pane>
			<el-tab-pane label="编辑修改" name="two" :style="{height: tabHeight+'px'}">
				<el-form :label-position="labelPosition" class="demo-ruleForm" label-width="120px" :model="formTwo" style="padding-left: 30px;">
					<el-form-item label="文章主题" style="padding-top: 30px;">
						<el-input v-model="formTwo.title"></el-input>
					</el-form-item>
					<el-form-item label="封面图">
				        <!--图片文件上传、图片的展示-->
						<input id="fileinput" @change="uploading($event)" type="file">
						<!--  <img :src="src"/> -->
					</el-form-item>
					<el-form-item label="内容">
						<div class="edit_container">
							<quill-editor class="editer" v-model="formTwo.content" ref="myQuillEditor" :options="editorOption" @ready="onEditorReady($event)"></quill-editor>
						</div>
					</el-form-item>
				</el-form>
				<el-button type="primary" style="margin-left: 50px; margin-top: 30px;" @click="sendToTask()">确定发送</el-button>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
/* 逻辑交互js内容 */
import Event from './../../../public_js/event.js';
import store from '../../../vuex/store';
import axios from 'axios';
export default {
	data() {
		return {
			serverStatus: false,
			tabHeight: null,
			tableHeight: null,
			tabSearchHeight: null,
			labelPosition: 'left',
			formOne: {
				tabData: [],
				totalPage: null,
				page: 1,
				star: '0',
				end: '20',
			},
			formTwo: {
				id: '',
				pic: '',
				title: '',
				content: '',
			},
			formThree: {
				pic: '',
				title: '',
				content: '',
			},
			listLoading: false, //动画加载时显示的动画
			activeName: 'one', // 设置为tab切换栏的选中不同的状态(one、two、three)
			editorOption: {},
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
			allget('', url).then(res => { // 进行get请求，(请求参数'', 请求地址url)
				// 数据请求成功
				_this.listLoading = false;
				if(res.data.ret) {
					_this.formData.totalPage = res.data.data.length;
					_this.formData.tabData = res.data.data;
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg); // 返回ret==0，非正常数据
				}
			}).catch(function(error){
				console.log(error);
			})
		},
		// 编辑修改某一条随机昵称
		changeOneUserData(index, rows) {
			var _this = this;
			
		},
		// 删除的操作
		deleteOneUserData(index, rows) {
			var _this = this;
			var id = rows.id;	
			var url = 'Anchor/delArticle';
			var params = {
				id: id,
			};
			allget(params, url).then(res => { // 进行get请求，(请求参数params, 请求地址url)
				// 数据请求成功
				if(res.data.ret) {
					baseConfig.successTipMsg(_this, '删除成功');
					_this.getTableData();
				} else {
					baseConfig.errorTipMsg(_this, res.data.msg); // 返回ret==0，非正常数据
				}
			}).catch(function(error){
				console.log(error);
			})
		},
		// 当tab状态栏切换到tab时候进行id...等信息进行清零
		handleClick(tab, event) {
			var _this = this;
		},
		onEditorReady(editor) {
			// console.log(editor);
		},
	},
	mounted() {
		var _this = this;
		this.$nextTick(function() {
			_this.tabHeight = baseConfig.lineNumber(tabHeight);
			_this.tableHeight = baseConfig.lineNumber(tabPageHeight);
			_this.tabSearchHeight = baseConfig.lineNumber(tabSearchHeight);
			_this.getTableData();
			if(baseConfig.serverStatus==true) {
				_this.serverStatus = true;
			}
		})
	}
};
</script>

<style lang="css" scoped>
.el-tab-pane{
	height: 800px;
}
</style>
