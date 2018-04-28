<template>
    <!-- 家族查询 -->
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
                <el-form-item>
					<span>UID</span>
					<el-input style="width:150px;" placeholder="请输入内容" v-model="searchUid">
					</el-input>
				</el-form-item>
                <!-- <el-form-item style="margin-left: 200px;">
					<el-button id="handBinding" type="primary" @click="dialogFormVisible = true ">手动绑定代理关系</el-button>
				</el-form-item> -->
                <el-form-item class="search-span" style="float:right;">
					<el-button id="searchBtn" type="primary" @click="getData()">查询</el-button>
				</el-form-item>
                
			</el-form>
		</el-col>
		<!-- 用户的数据展示列表 -->
		<template>
			<el-table :data="listData" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
				<el-table-column prop="create_time"  label="创建时间"></el-table-column>
				<el-table-column prop="family_id" label="家族ID"></el-table-column>
				<el-table-column prop="family_name" label="家族名称"></el-table-column>
				<el-table-column prop="owner_uid" label="创建者"></el-table-column>
				<el-table-column prop="nickname" label="创建者昵称"></el-table-column>
				<el-table-column prop="family_icon" label="家族头像">
                    <template slot-scope="scope">
						<el-popover trigger="hover" placement="left">
							<img :src="scope.row.family_icon" alt="" style="width:300px;height:300px;">
							<div slot="reference" class="name-wrapper">
								<img :src="scope.row.family_icon" alt="" style="width:100px;height:100px;">
							</div>
						</el-popover>
					</template>
                </el-table-column>
				<el-table-column prop="level" label="家族等级"></el-table-column>
				<el-table-column prop="yun_xin_room_id" :formatter="judgeAuthority" label="房间权限"></el-table-column>
				<el-table-column prop="member_num" label="成员数量"></el-table-column>
				<el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-col :span="12"><el-button size="mini" type="primary" @click="familydetail(scope.$index, scope.row)">家族详情</el-button></el-col>
                        <el-col :span="12"><el-button size="mini" type="danger" @click="lister(scope.$index, scope.row)">成员列表</el-button></el-col>
					</template>
                </el-table-column>
			</el-table>
		</template>
         <!-- Table -->
        <el-dialog title="明细列表" :visible.sync="dialogTableVisible" center>
            <el-table :data="detialData">
                <el-table-column property="addtime" label="注册时间"></el-table-column>
                <el-table-column property="uid" label="UID"></el-table-column>
                <el-table-column property="username" label="账号"></el-table-column>
                <el-table-column property="nickname" label="昵称"></el-table-column>
                <el-table-column property="is_agent" label="是否为付费代理"></el-table-column>
            </el-table>
        </el-dialog>
    </section>
</template>

<script>
	import { allget,officialAllet } from '../../../api/api';
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
				formLabelWidth: '120px',
                listLoading: false,
                searchUid: null,
                dialogTableVisible: false,
                detialData: null,
            }
        },
		methods: {
			// 获取数据
			getData(type) {
				var _this = this;
                let url = '/Family/getFamilyData';
                if(this.formOne.startDate==null){
                    baseConfig.warningTipMsg(this, "请输入日期");
                    return;
                }
				let param ={
                    date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
					date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
					uid: this.searchUid,
                }
				allget(param, url).then(res => {
                    console.log(res)
                    if(res.data.ret){
                        this.listData = res.data.data;
                    }
				}).catch(err => {
					console.log(err)
				})
            },
            // 判断权限
            judgeAuthority(row) {
                return row.yun_xin_room_id == 0 ? "未开启" : "开启";
            },
            familydetail(index, row) {
                this.dialogTableVisible = true;
                var url = '/Family/getFamilyInfo';
                let param = {
                    family_id: row.family_id,
                }
                allget(param, url).then(res => {
                    console.log(res)
					this.detialData = res.data.data;
				}).catch(err => {
					console.log(err)
				})
            },
            lister() {
                
            }
		},
		mounted() {
			var _this = this;
            _this.tableHeight = searchHeight;
            this.getData();
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
    .bindingTitle{
        margin-left: 130px;
    }
</style>
