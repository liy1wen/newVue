<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" style="overflow: hidden;" :model="formOne">
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
                    <el-button type="primary" @click="addDialog.dialogShow=true;">赠送</el-button>
                    <el-button type="primary" @click="getTableData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <template>
            <el-table :data="onePageData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
                <el-table-column prop="time" label="日期" width="80" sortable></el-table-column>
                <el-table-column prop="uid" label="用户uid" width="100" sortable></el-table-column>
                <el-table-column prop="nickname" label="昵称" width="150" sortable></el-table-column>
                <el-table-column label="加减" width="100" sortable>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <p v-if="scope.row.add_sub==0">加</p>
                            <p v-else-if="scope.row.type==1">减</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="数量、月份" width="100" sortable></el-table-column>
                <el-table-column label="类型" width="100" sortable>
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
                <el-table-column prop="operation_reason" label="赠送理由" min-width="200" sortable></el-table-column>
                <el-table-column label="状态" width="100" sortable>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <p v-if="scope.row.status==0">未审核</p>
                            <p v-else-if="scope.row.status==1">通过</p>
                            <p v-else-if="scope.row.status==2">未通过</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="operation_name" label="操作人" width="150" sortable></el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total,prev,pager,next,jumper" @current-change="oneHandleCurrentChange" :page-size="20" :total="formOne.totalPage" style="float: right;"></el-pagination>
            </el-col>
        </template>
        <el-dialog title="赠送申请" :visible.sync="addDialog.dialogShow">
				<el-form :model="addDialog">
					<el-form-item label="uid" :label-width="formLabelWidth">
						<el-input v-model="addDialog.uid" auto-complete="off"></el-input>
					</el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth">
						<el-select v-model="addDialog.type">
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
                    <el-form-item label="加减" :label-width="formLabelWidth">
						<el-select v-model="addDialog.add_sub">
							<el-option label="加" value="0"></el-option>
							<el-option label="减" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="数量" :label-width="formLabelWidth">
						<el-input v-model="addDialog.num" placeholder="聊币聊票为数量，会员为月份" auto-complete="off"></el-input>						
					</el-form-item>
					<el-form-item label="赠送理由" :label-width="formLabelWidth">
						<el-input v-model="addDialog.operation_reason" auto-complete="off"></el-input>						
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native.prevent="sendAdd(0)">取 消</el-button>
					<el-button type="primary" @click.native.prevent="sendAdd(1)">确 定</el-button>
				</div>
			</el-dialog>
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
            tableHeight: null,
            formOne: {
                choiceDate: [new Date()-2*24*60*60*1000,new Date()],                
                type: '0',
                find: '',
                tabData: [],
                totalPage: null,
                page: 0,
                star: '0',
                end: '20',
            },
            addDialog: {
                dialogShow: false,
                uid: '',
                type: '1',
                add_sub: '0',
                num: '',
                operation_name: '',
                operation_reason: '',
            },
            listLoading: false,
            formLabelWidth: '120px',
        }
    }, 
    computed: {
        onePageData() {
            var _this = this;
            return _this.formOne.tabData.slice(_this.formOne.star, _this.formOne.end);
        }
    },
    methods:{
        oneHandleCurrentChange(val) {
            var _this = this;
            _this.formOne.page = val;
            _this.formOne.star = (_this.formOne.page-0)*20;
            _this.formOne.end = _this.formOne.star-0+20;
        },
        searchConditionOne() {
            var _this = this;
            var obj = {};
            obj.date_s = baseConfig.changeDateTime(_this.formOne.choiceDate[0], 0);
            obj.date_e = baseConfig.changeDateTime(_this.formOne.choiceDate[1], 0);
            obj.type = _this.formOne.type;
            obj.find = _this.formOne.find;
            return obj;
        },
        getTableData() {
            var _this = this;
            _this.listLoading = true;
            var url = '/Money/findSendMoneyTo';
            var params = _this.searchConditionOne();
            allget(params, url)
            .then(res => {
                _this.listLoading = false;
                if(res.data.ret) {
                    for(var i=0; i<res.data.data.length; i++) {
                        res.data.data[i].operation_reason = decodeURI(res.data.data[i].operation_reason);
                        res.data.data[i].operation_name = decodeURI(res.data.data[i].operation_name);
                    }
                    _this.formOne.totalPage = res.data.data.length;
                    _this.formOne.tabData = res.data.data;
                } else {
                    baseConfig.errorTipMsg(_this, res.data.msg);
                }
            })
            .catch(function(error) {
                baseConfig.errorTipMsg(_this, error);
            })
        },
        sendAdd(type) {
            var _this = this;
            if(type==0) {
                _this.addDialog.dialogShow= false;
            } else if(type==1) {
                _this.listLoading = true;
                var url = '/NewMoney/SendMoneyToYou';
                let formData = new FormData();
                formData.append('uid', _this.addDialog.uid);
                formData.append('type', _this.addDialog.type);
                formData.append('add_sub', _this.addDialog.add_sub);
                formData.append('num', _this.addDialog.num);
                formData.append('operation_name', _this.addDialog.operation_name);
                formData.append('operation_reason', _this.addDialog.operation_reason);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                axios.post(baseConfig.server+baseConfig.requestUrl+'/NewMoney/SendMoneyToYou', formData, config)
                .then((res) => {
                    _this.addDialog.dialogShow= false;
                    _this.listLoading = false;
                    if(res.data.ret) {
                        baseConfig.successTipMsg(_this, '赠送成功！');                        
                        _this.getTableData();                        
                    } else {
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },
    },
    mounted() {
        var _this = this;
        _this.$nextTick(function() {
            _this.tableHeight = baseConfig.lineNumber(searchPageHeight);
            _this.addDialog.operation_name = store.state.user.name;
            _this.getTableData();
        })
    }
}
</script>
