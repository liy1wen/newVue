<template>
    <!-- 主播个人数据汇总 -->
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
                <el-form-item class="search-span" style="float:right;">
					<el-button id="searchBtn" type="primary" @click="getData()">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 用户的数据展示列表 -->
		<template>
			<el-table :data="listData" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
				<el-table-column prop="uid" label="用户UID"></el-table-column>
				<el-table-column prop="register_time"  label="注册时间"></el-table-column>
				<el-table-column prop="addtime" label="添加时间"></el-table-column>
				<el-table-column prop="nickname" label="昵称" ></el-table-column>
				<el-table-column prop="lasttime" label="最后登录时间"></el-table-column>
				<el-table-column prop="accumulate_time" label="累积通话时长" sortable></el-table-column>
				<el-table-column prop="total_chat_ticket" label="累积聊票数"></el-table-column>
				<el-table-column prop="total_money" label="累积收入"></el-table-column>
				<el-table-column prop="follow_num" label="关注数"></el-table-column>
				<el-table-column prop="fans_num" label="粉丝数"></el-table-column>
				<el-table-column prop="rand_call_num" label="累积随机通话次数"></el-table-column>
				<el-table-column prop="operate_user" label="操作人"></el-table-column>
			</el-table>
			<!-- 工具条 -->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev, pager, next,jumper" :page-size="20" :total=1000  style="float:right; ">
				</el-pagination>
			</el-col>
		</template>
    </section>
</template>

<script>
	import { allget } from '../../../api/api';
	import axios from 'axios';
    export default {
        data() {
            return {
				tableHeight: '', // table展示的页面的高度多少，第二页中对应高度
                formOne: {
                    startDate: [new Date()-7*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
				},
				listData: [],
				formLabelWidth: '120px',
				listLoading: false,
            }
        },
		methods: {
			// 获取数据
			getData() {
				var _this = this;
				let url = '/Anchor/getAnchorOwnData';
				let param ={
					date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
					date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
				}
				allget(param, url).then(res => {
					this.listData = res.data.data;
				}).catch(err => {
					console.log(err)
				})
			},
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
