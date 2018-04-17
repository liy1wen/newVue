<template>
    <!-- 用户认证审核(可操作) -->
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
                    <el-input style="width:100px;" @clear="clearInput" placeholder="请输入UID" v-model="find" clearable>
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
                <el-table-column label="操作" min-width="120">
                    <template slot-scope="scope">
                        <el-row v-if="scope.row.status==1">
                            <el-col :span="8">
                                <el-button size="mini" type="success" @click="pass(scope.$index, scope.row)">通过</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button size="mini" type="danger" @click="refuseBtn(scope.$index, scope.row)">拒绝</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button style="margin-right: 20px;" size="mini" type="info" @click="revamp(scope.$index, scope.row)">修改信息</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" v-else-if="scope.row.status==2">
                            <el-col :span="12">
                                <el-button size="mini" type="success" @click="clearDate(scope.$index, scope.row)">清除认证</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button size="mini" type="info" @click="revamp(scope.$index, scope.row)">修改信息</el-button>
                            </el-col>
                        </el-row>
                        <div v-else-if="scope.row.status==3"></div>
                        <div v-else-if="scope.row.status==4"></div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 确定通过弹窗 -->
            <el-dialog title="提示" :visible.sync="passDialogVisible" width="30%">
                <span>确定要通过吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="passDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="passDialogVisible = false, surePass()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 拒绝弹窗 -->
            <el-dialog title="拒绝" :visible.sync="refuse.DialogVisible">
                <el-form :model="refuse">

                    <el-form-item label="拒绝原因" :label-width="formLabelWidth">
                        <el-input v-model="refuse.reason" placeholder="请输入拒绝原因" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="refuse.DialogVisible = false, refuse.reason=''">取 消</el-button>
                    <el-button type="primary" @click="sureRefuse()">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 提示填写原因弹窗 -->
            <el-dialog title="提示" :visible.sync="refuse.titleDialogVisible" width="30%">
                <span>请填写封号原因</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="refuse.titleDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改信息弹窗 -->
            <el-dialog title="信息修改" style="width:800px; left:30%;" :visible.sync="info.dialogVisible">
                <el-form :model="info">
                    <el-form-item label="真实姓名：" :label-width="formLabelWidth">
                        <el-input style="width: 200px;" v-model="info.name"  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码：" :label-width="formLabelWidth">
                        <el-input style="width: 200px;" v-model="info.identity_card"  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号：" :label-width="formLabelWidth">
                        <el-input style="width: 200px;" v-model="info.pay_account"  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手持身份证照：" :label-width="formLabelWidth">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="left">
                                <img :src="info.aut_icon" alt="" style="width:300px;height:300px;">
                                <div slot="reference" class="name-wrapper">
                                    <img :src="info.aut_icon" alt="" style="width:100px;height:100px;">
                                </div>
                            </el-popover>
                        </template>
                    </el-form-item>
                    <el-form-item label="身份证照：" :label-width="formLabelWidth">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="left">
                                <img :src="info.identity_card_icon" alt="" style="width:300px;height:300px;">
                                <div slot="reference" class="name-wrapper">
                                    <img :src="info.identity_card_icon" alt="" style="width:100px;height:100px;">
                                </div>
                            </el-popover>
                        </template>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="info.dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureRevamp()">确定修改</el-button>
                </div>
            </el-dialog>
            <!-- 清除认证弹窗 -->
            <el-dialog title="提示" :visible.sync="clear.dialogVisible" width="30%">
                <span>确定清除认证</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="clear.dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureClear()">确 定</el-button>
                </span>
            </el-dialog>
        </template>
    </section>
</template>

<script>
import { allget } from "../../../api/api";
import store from "../../../vuex/store";
export default {
    data() {
        return {
            tableHeight: null, // table展示的页面的高度多少，第二页中对应高度
            formOne: {
                startDate: [new Date() - 100 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
            },
            listData: [
                {
                    uid: "11181",
                    aut_icon:
                        "http://img.dianliaoapp.com/DEBUG/11181/picwall/1515464456345.png",
                    status: "1",
                    req_time: "2018-01-09 10:20:56",
                    identity_card_icon: "http://img.dianliaoapp.com/DEBUG/11181/picwall/1515464456345.png",
                    identity_card: "456",
                    name: "cyz",
                    pay_account: "32145678",
                    surplus_num: "0",
                    type: "0",
                    fail_reason: null,
                    auth_time: null,
                    auth_user: null,
                    nickname: "娇羞的大魔王",
                    sex: "1"
                },
                {
                    uid: "11181",
                    aut_icon:
                        "http://img.dianliaoapp.com/DEBUG/11181/picwall/1515464456345.png",
                    status: "2",
                    req_time: "2018-01-09 10:20:56",
                    identity_card_icon: null,
                    identity_card: null,
                    name: null,
                    pay_account: null,
                    surplus_num: "0",
                    type: "0",
                    fail_reason: null,
                    auth_time: null,
                    auth_user: null,
                    nickname: "娇羞的大魔王",
                    sex: "1"
                },
                {
                    uid: "11181",
                    aut_icon:
                        "http://img.dianliaoapp.com/DEBUG/11181/picwall/1515464456345.png",
                    status: "3",
                    req_time: "2018-01-09 10:20:56",
                    identity_card_icon: null,
                    identity_card: null,
                    name: null,
                    pay_account: null,
                    surplus_num: "0",
                    type: "0",
                    fail_reason: null,
                    auth_time: null,
                    auth_user: null,
                    nickname: "娇羞的大魔王",
                    sex: "1"
                },
                {
                    uid: "11181",
                    aut_icon:
                        "http://img.dianliaoapp.com/DEBUG/11181/picwall/1515464456345.png",
                    status: "4",
                    req_time: "2018-01-09 10:20:56",
                    identity_card_icon: null,
                    identity_card: null,
                    name: null,
                    pay_account: null,
                    surplus_num: "0",
                    type: "0",
                    fail_reason: null,
                    auth_time: null,
                    auth_user: null,
                    nickname: "娇羞的大魔王",
                    sex: "1"
                }
            ],
            totalpage: null,
            formLabelWidth: "120px",
            listLoading: false,
            pay_account: null,
            identity_card: null,
            status: null,
            find: null,
            operate_user: null,
            passDialogVisible: false,
            passUid: null, //pass UID
            refuse: {
                DialogVisible: false,
                titleDialogVisible: false,
                reason: null,
                uid: null
            },
            info: {
                dialogVisible: false,
                name: null,
                identity_card: null,
                pay_account: null,
                aut_icon: null,
                identity_card_icon: null,
            },
            clear: {
                dialogVisible: false,
                uid: null,
            }
        };
    },
    methods: {
        // 获取数据
        getData() {
            var _this = this;
            let url = "/NewUser/getRealNameRecord";
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
                    // this.listData = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 性别
        judegSex(row, column) {
            return row.sex == 1 ? "男" : "女";
        },
        clearInput() {
            this.getData();
        },
        // 通过
        pass(index, row) {
            this.passDialogVisible = true;
            this.passUid = row.uid;
        },
        surePass() {
            let url = "/NewUser/passRealName";
            let param = {
                uid: this.passUid,
                auth_user: this.operate_user
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
        // 拒绝
        refuseBtn(index, row) {
            this.refuse.DialogVisible = true;
            this.refuse.uid = row.uid;
        },
        sureRefuse() {
            let url = "/NewUser/failRealName";
            let param = {
                uid: this.refuse.uid,
                auth_user: this.operate_user,
                fail_reason: this.refuse.reason
            };
            if (param.fail_reason == null || param.fail_reason == "") {
                this.refuse.titleDialogVisible = true;
                return;
            }
            allget(param, url)
                .then(res => {
                    if (res.data.ret) {
                        baseConfig.successTipMsg(_this, res.data.msg);
                        _this.refuse.reason = "";
                        _this.getData();
                    } else {
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch(err => {
                    baseConfig.errorTipMsg(_this, err.data.msg);
                });
        },
        // 修改信息
        revamp(index, row) {
            this.info.dialogVisible = true;
            this.info.name = row.name;
            this.info.identity_card = row.identity_card;
            this.info.pay_account = row.pay_account;
            this.info.aut_icon = row.aut_icon;
            this.info.identity_card_icon = row.identity_card_icon;
        },
        sureRevamp() {
            var _this = this;
            let url = "/NewUser/editRealName";
            let param = {
                uid: this.info.uid,
                identity_card_icon: this.info.identity_card_icon,
                identity_card: this.info.identity_card,
                name: this.info.name,
                pay_account: this.info.pay_account,
            };
            allget(param, url)
                .then(res => {
                    if (res.data.ret) {
                        baseConfig.successTipMsg(_this, res.data.msg);
                        _this.info.dialogVisible = false;
                        _this.getData();
                    } else {
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch(err => {
                    baseConfig.errorTipMsg(_this, err.data.msg);
                });
        },
        // 清除认证
        clearDate(index, row) {
            this.clear.dialogVisible = true;
            this.clear.uid = row.uid;
        },
        sureClear() {
            var _this = this;
            let url = "/NewUser/clearRealName";
            let param = {
                uid: this.clear.uid,
                auth_user: this.operate_user,
            };
            allget(param, url)
                .then(res => {
                    if (res.data.ret) {
                        baseConfig.successTipMsg(_this, res.data.msg);
                        _this.info.dialogVisible = false;
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
        _this.tableHeight = searchHeight;
        _this.getData();
        _this.operate_user = store.state.user.name;
    }
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
