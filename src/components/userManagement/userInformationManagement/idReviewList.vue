<template>
	<!-- 用户认证审核列表 -->
	<!-- dom结构内容 -->
	<section>
		<!-- 工具条/头部的搜索条件搜索 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<div class="block">
						<span class="registerTime">日期</span>
						<el-date-picker v-model="formOne.startDate" style="width:250px;" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item>
					<span>UID：</span>
					<el-input style="width:100px;"  @clear="clearInput" placeholder="请输入UID" v-model="find" clearable>
					</el-input>
				</el-form-item>
				<el-form-item>
					<span>身份证号码：</span>
					<el-input style="width:145px;" @clear="clearInput" placeholder="请输入身份证号码" v-model="identity_card" clearable>
					</el-input>
				</el-form-item>
				<el-form-item>
					<span>审核状态：</span>
					<el-select style="width: 100px;" v-model="status">
						<el-option label="全部" value=""></el-option>
						<el-option label="待审核" value="1"></el-option>
						<el-option label="已通过" value="2"></el-option>
						<el-option label="已拒绝" value="3"></el-option>
						<el-option label="已清除" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span>支付宝账号：</span>
					<el-input style="width:140px;" @clear="clearInput" placeholder="请输入支付宝账号" v-model="pay_account" clearable>
					</el-input>
				</el-form-item>
				<el-form-item class="search-span" style="float:right;">
					<el-button id="searchBtn" type="primary" @click="getData()">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 用户的数据展示列表 -->
		<template>
			<el-table :data="listData" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
				<el-table-column prop="req_time" label="申请时间"></el-table-column>
				<el-table-column prop="uid" label="UID"></el-table-column>
				<el-table-column prop="nickname" label="昵称"></el-table-column>
				<el-table-column prop="sex" :formatter="judegSex" label="性别"></el-table-column>
				<el-table-column prop="aut_icon" label="手持证件照">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="left">
							<img :src="scope.row.aut_icon" alt="" style="width:300px;height:400px;">
							<div slot="reference" class="name-wrapper">
								<img :src="scope.row.aut_icon" alt="" style="width:100px;height:100px;">
							</div>
						</el-popover>
					</template>
                </el-table-column>
				<el-table-column prop="identity_card_icon" label="身份证照片">
                    <template slot-scope="scope">
						<el-popover trigger="hover" placement="right">
							<img :src="scope.row.identity_card_icon" alt="" style="width:300px;height:400px;">
							<div slot="reference" class="name-wrapper">
								<img :src="scope.row.identity_card_icon" alt="" style="width:100px;height:100px;">
							</div>
						</el-popover>
					</template>
                </el-table-column>
				<el-table-column prop="name" label="真实姓名"></el-table-column>
				<el-table-column prop="identity_card" label="身份证号码"></el-table-column>
				<el-table-column prop="pay_account" label="支付宝账号"></el-table-column>
				<el-table-column prop="status" label="审核状态">
                    <template slot-scope="scope">
						<div v-if="scope.row.status==1">待审核</div>
						<div v-else-if="scope.row.status==2">已通过</div>
						<div v-else-if="scope.row.status==3">已拒绝</div>
						<div v-else-if="scope.row.status==3">已清除</div>
					</template>
                </el-table-column>
				<el-table-column prop="fail_reason" label="拒绝原因"></el-table-column>
				<el-table-column prop="auth_time" label="审核时间"></el-table-column>
				<el-table-column prop="auth_user" label="审核人"></el-table-column>
			</el-table>
		</template>
	</section>
</template>

<script>
import { allget } from "../../../api/api";
export default {
    data() {
        return {
            tableHeight: null, // table展示的页面的高度多少，第二页中对应高度
            formOne: {
                startDate: [new Date() - 100 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
            },
            listData: [],
            totalpage: null,
            formLabelWidth: "120px",
            listLoading: false,
            pay_account: null,
            identity_card: null,
            status: null,
            find: null,
        };
    },
    methods: {
        // 获取数据
        getData() {
            var _this = this;
            let url = "/NewUser/getRealName";
            let param = {
                date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
                date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
                find: this.find,
                pay_account: this.pay_account,
                identity_card: this.identity_card,
                status: this.status
            };
            allget(param, url)
                .then(res => {
                    this.listData = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 性别
        judegSex(row, column) {
            return row.sex == 1 ? "男" : "女";
        },
        clearInput(){
            this.getData();
        }
    },
    mounted() {
        var _this = this;
        _this.tableHeight = searchHeight;
        _this.getData();
    },
};
</script>

<style lang="css" scoped>
.search-span {
    float: right;
}
#searchBtn {
    margin-right: 50px;
}
</style>
