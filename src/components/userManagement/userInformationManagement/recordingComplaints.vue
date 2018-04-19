<template>
	<!-- 录音投诉管理 -->
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
				<el-table-column prop="date" label="日期"></el-table-column>
				<el-table-column prop="num" label="被投诉次数"></el-table-column>
				<el-table-column prop="complain_uid" label="投诉人"></el-table-column>
				<el-table-column prop="reason" label="理由"></el-table-column>
				<el-table-column prop="voice_id" label="录音编码"></el-table-column>
				<el-table-column prop="uid" label="录音发布者"></el-table-column>
				<el-table-column prop="warn_num" label="录音内容">
                    <template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<audio controls="controls" :src="scope.row.warn_num"></audio>
						</div>
					</template>
                </el-table-column>
				<el-table-column prop="desc" label="描述"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
                        <el-button size="mini" type="success" @click="ignore(scope.$index, scope.row)">忽视</el-button>
                        <el-button size="mini" type="warning" @click="deleteFun(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<el-dialog title="提示" :visible.sync="ignoreDialog" width="30%">
			<span>确定要忽视吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ignoreDialog = false">取 消</el-button>
				<el-button type="primary" @click="ignoreDialog = false,sureIgnore()">确 定</el-button>
			</span>
		</el-dialog>
        <el-dialog title="提示" :visible.sync="deleteDialog" width="30%">
			<span>确定要删除吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="deleteDialog = false">取 消</el-button>
				<el-button type="primary" @click="deleteDialog = false,sureDeleteFun()">确 定</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
import { allget } from "../../../api/api";
import axios from "axios";
import store from "../../../vuex/store";
import familyBackstageBackstageManageVue from '../../activities/familyBackstageBackstageManage.vue';
export default {
    data() {
        return {
            tableHeight: null, // table展示的页面的高度多少，第二页中对应高度
            formOne: {
                startDate: [new Date() - 100 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
            },
            recordStatus: "",
            listData: [],
            formLabelWidth: "120px",
            listLoading: false,
            formLabelWidth: "120px",
            operate_user: null,
            ignoreDialog: false,
            ignoreId: null,
            deleteDialog: false,
            deleteId: null,
        };
    },
    methods: {
        // 获取数据
        getData() {
            var _this = this;
            let url = "/NewVoice/getVoiceComplain";
            let param = {
                date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
                date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
            };
            allget(param, url)
                .then(res => {
                    if(res.data.ret){
                        this.listData = res.data.data;
                    }else{
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch(err => {
                    baseConfig.errorTipMsg(_this, err.data.msg);
                });
        },
        // 忽视
        ignore(index, row) {
            this.ignoreId = row.voice_id;
            this.ignoreDialog = true;
            
        },
        sureIgnore() {
            var _this = this;
            let url = "/Voice/ignoreVoiceComplain";
            let param = {
                id: this.ignoreId
            };
            allget(param, url)
                .then(res => {
                    if (res.data.ret) {
                        baseConfig.successTipMsg(_this, res.data.msg);
                        _this.getData();
                    } else {
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch(err => {
                    baseConfig.errorTipMsg(_this, err.data.msg);
                });
        },
        // 删除
        deleteFun(index, row) {
            this.deleteId = row.voice_id;
            this.deleteDialog = true;
        },
        sureDeleteFun() {
            var _this = this;
            let url = "/Voice/deleteVoiceComplain";
            let param = {
                id: this.deleteId
            };
            allget(param, url)
                .then(res => {
                    if (res.data.ret) {
                        baseConfig.successTipMsg(_this, res.data.msg);
                        _this.getData();
                    } else {
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch(err => {
                    baseConfig.errorTipMsg(_this, err.data.msg);
                });
        }
    },
    mounted() {
        var _this = this;
        _this.tableHeight = searchPageHeight;
        _this.getData();
        _this.operate_user = store.state.user.name;
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
