<template>
    <!-- 代理绑定操作记录(正式服) -->
    <!-- dom结构内容 -->
	<section>
        <!-- 工具条/头部的搜索条件搜索 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<div class="block">
						<span class="registerTime">日期</span>
						<el-date-picker v-model="formOne.startDate" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
                <el-form-item style="margin-left: 100px;">
					<span>操作类型</span>
					<el-select style="width: 150px;" v-model="searchType">
						<el-option label="全部" value=""></el-option>
						<el-option label="绑定" value="0"></el-option>
						<el-option label="解绑" value="1"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item class="search-span" style="float:right;">
					<el-button id="searchBtn" type="primary" @click="getData(0)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 用户的数据展示列表 -->
		<template>
			<el-table :data="listData" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
				<el-table-column prop="operate_time" label="操作日期"></el-table-column>
				<el-table-column prop="uid"  label="UID"></el-table-column>
				<el-table-column prop="change_uid_list" label="被操作的uid"></el-table-column>
				<el-table-column prop="type" label="类型" :formatter="judgeType"></el-table-column>
				<el-table-column prop="operate_user" label="操作人"></el-table-column>
			</el-table>
			<!-- 工具条 -->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="20" :total=1000 :current-page="page+1" style="float:right; ">
				</el-pagination>
			</el-col>
		</template>
    </section>
</template>

<script>
	import { allget, officialAllet} from '../../../api/api';
	import axios from 'axios';
    export default {
        data() {
            return {
				tableHeight: null, // table展示的页面的高度多少，第二页中对应高度
                formOne: {
                    startDate: [new Date()-1*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
				},
				page: 0,
				listData: [],
				totalpage:null,
				formLabelWidth: '120px',
                listLoading: false,
                searchType: null,
            }
        },
		methods: {
			//页面的页数
			handleCurrentChange(val) {
				//服务器的第一页是0 所以 这里要 -1
				this.page = val-1;
				this.getData();
			},
			// 获取数据
			getData(type) {
				var _this = this;
				if(type==0){
					_this.page = 0;
				}
				let url = '/Agent/getAgentChangeRecord';
				let param ={
					page: this.page,
					date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
                    date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
                    type: this.searchType,
                }
                // 正式服 后台还没上传  可能会报500 不要在意
				officialAllet(param, url).then(res => {
					this.listData = res.data.data;
				}).catch(err => {
					console.log(err)
				})
            },
            judgeType(row){
                return row.type==0 ? "绑定" : "解绑";
            }
		},
		mounted() {
			var _this = this;
			_this.tableHeight = searchPageHeight;
			_this.getData();
		},
    }

</script>

<style lang="css" scoped>
    .search-span{
        float: right;
    }
    #searchBtn{
        margin-right: 50px;
    }
</style>
