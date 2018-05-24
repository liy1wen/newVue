
<template>
    <!-- 货币申请及记录 -->
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formOne">
                <el-form-item>
                    <div class="block">
                        <span class="dataTime">日期</span>
                        <el-date-picker v-model="formOne.choiceDate" type="daterange" range-separator=" 至 " placeholder="选择日期范围"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <span>类型</span>
                    <el-select v-model="formOne.type">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="聊币" value="1"></el-option>
                        <el-option label="聊票" value="2"></el-option>
                        <el-option label="白银" value="3"></el-option>
                        <el-option label="黄金" value="4"></el-option>
                        <el-option label="铂金" value="5"></el-option>
                        <el-option label="钻石" value="6"></el-option>
                        <el-option label="至尊" value="7"></el-option>
                        <el-option label="圣尊" value="8"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <div class="block">
                        <el-input placeholder="请输入uid查询" v-model="formOne.find"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTableData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <template>
            <el-table :data="onePageData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
                <el-table-column prop="time" label="申请时间"></el-table-column>
                <el-table-column prop="uid" label="UID"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="type" label="货币类型">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <p v-if="scope.row.type==1">聊币</p>
                            <p v-else-if="scope.row.type==2">聊票</p>
                            <p v-else-if="scope.row.type==3">白银</p>
                            <p v-else-if="scope.row.type==4">黄金</p>
                            <p v-else-if="scope.row.type==5">铂金</p>
                            <p v-else-if="scope.row.type==6">钻石</p>
                            <p v-else-if="scope.row.type==7">至尊</p>
                            <p v-else-if="scope.row.type==8">圣尊</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="申请数量"></el-table-column>
                <el-table-column prop="operation_name" label="申请人"></el-table-column>
                <el-table-column prop="operation_reason" label="申请原由"></el-table-column>
                <el-table-column prop="status" label="审核状态">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <p v-if="scope.row.status==0">待审核</p>
                            <p v-else-if="scope.row.status==1">已通过</p>
                            <p v-else-if="scope.row.status==2">已拒绝</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="examine_name" label="审核人"></el-table-column>
                <el-table-column prop="examine_time" label="审核时间"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="pass(scope.$index, onePageData)" size="small">通过</el-button>
                        <el-button type="warning" @click="refuse(scope.$index, onePageData)" size="small">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total,prev,pager,next,jumper" @current-change="oneHandleCurrentChange" :page-size="20" :total="formOne.totalPage" style="float: right;"></el-pagination>
            </el-col>
            <el-dialog title="提示" :visible.sync="passDialogVisible" width="30%">
                <span>确定要通过吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="passDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click=surePass()>确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="refuseDialogVisible" width="30%">
                <span>确定要拒绝吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="refuseDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click=sureRefuse()>确 定</el-button>
                </span>
            </el-dialog>
        </template>
    </section>
</template>

<script>
/* 逻辑交互js内容 */
import Event from "./../../../public_js/event.js";
import { allget } from "../../../api/api";
import store from "../../../vuex/store";
import axios from "axios";
export default {
    data() {
        return {
            tableHeight: null,
            formOne: {
                choiceDate: [
                    new Date() - 2 * 24 * 60 * 60 * 1000,
                    new Date()
                ],
                type: "0",
                find: "",
                tabData: [],
                totalPage: null,
                page: 0,
                star: "0",
                end: "20"
            },
            listLoading: false,
            formLabelWidth: "120px",
            passDialogVisible: false,
            refuseDialogVisible: false,
            passData: {
                uid: null,
                id: null,
                type: null,
                num: null
            }
        };
    },
    computed: {
        onePageData() {
            var _this = this;
            return _this.formOne.tabData.slice(
                _this.formOne.star,
                _this.formOne.end
            );
        }
    },
    methods: {
        oneHandleCurrentChange(val) {
            var _this = this;
            _this.formOne.page = val;
            _this.formOne.star = (_this.formOne.page - 0) * 20;
            _this.formOne.end = _this.formOne.star - 0 + 20;
        },
        searchConditionOne() {
            var _this = this;
            var obj = {};
            obj.date_s = baseConfig.changeDateTime(
                _this.formOne.choiceDate[0],
                0
            );
            obj.date_e = baseConfig.changeDateTime(
                _this.formOne.choiceDate[1],
                0
            );
            obj.type = _this.formOne.type;
            obj.find = _this.formOne.find;
            return obj;
        },
        getTableData() {
            var _this = this;
            _this.listLoading = true;
            var url = "/Money/agreeSendMoneyTo";
            var params = _this.searchConditionOne();
            allget(params, url)
                .then(res => {
                    _this.listLoading = false;
                    if (res.data.ret) {
                        for (var i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].operation_reason = decodeURI(
                                res.data.data[i].operation_reason
                            );
                            res.data.data[i].operation_name = decodeURI(
                                res.data.data[i].operation_name
                            );
                        }
                        _this.formOne.totalPage = res.data.data.length;
                        _this.formOne.tabData = res.data.data;
                    } else {
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch(function(error) {
                    baseConfig.errorTipMsg(_this, error);
                });
        },
        // 通过
        pass(index, row) {
            this.passDialogVisible = true;
            this.passData.uid = row[index].uid;
            this.passData.id = row[index].id;
            this.passData.type = row[index].type;
            this.passData.num = row[index].num;
        },
        surePass() {
            var _this = this;
            var params = {
                uid: this.passData.uid,
                id: this.passData.id,
                type: this.passData.type,
                num: this.passData.num,
            }
            var url = '/Money/sendMoneyToSuccess';
            allget(params, url)
                .then(res=>{
                    if(res.data.ret) {
                        baseConfig.successTipMsg(this, res.data.msg);
                        _this.passDialogVisible = false;
                        _this.getTableData();
                    }else{
                        baseConfig.warningTipMsg(this, res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        refuse(index, row) {
            this.refuseDialogVisible = true;
            this.passData.num = row[index].num;
        },
        sureRefuse() {
            var _this = this;
            var params = {
                num: this.passData.num,
            }
            var url = '/Money/sendMoneyToFail';
            allget(params, url)
                .then(res=>{
                    if(res.data.ret) {
                        baseConfig.successTipMsg(this, res.data.msg);
                        _this.refuseDialogVisible = false;
                        _this.getTableData();
                    }else{
                        baseConfig.warningTipMsg(this, res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },
    mounted() {
        var _this = this;
        _this.$nextTick(function() {
            _this.tableHeight = searchPageHeight;
            _this.getTableData();
        });
    }
};
</script>
