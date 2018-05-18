<template>
    <!-- 用户信息查询 -->
    <!-- dom结构内容 -->
    <section>
        <!-- 工具条/头部的搜索条件搜索 -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <div class="block">
                        <span class="registerTime">注册日期</span>
                        <el-date-picker style="width: 300px;" v-model="formOne.startDate" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="block">
                        <span class="registerTime">登陆日期</span>
                        <el-date-picker style="width: 300px;" v-model="formTwo.startDate" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <span>渠道</span>
                    <el-select v-model="channelId" multiple filterable collapse-tags style="margin-left: 20px;" placeholder="请选择">
                        <el-option v-for="(item, key) of channelData" :key="item" :label="item" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>UID:</span>
                    <el-input style="width:120px;" v-model="uid" placeholder="请输入UID" clearable></el-input>
                </el-form-item>
                <el-form-item class="search-span" style="float:right;">
                    <el-button id="searchBtn" type="primary" @click="getData(0)">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!-- 用户的数据展示列表 -->
        <template>
            <el-table :data="listData" v-loading="listLoading" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
                <el-table-column prop="addtime" label="注册时间"></el-table-column>
                <el-table-column prop="channel" label="渠道"></el-table-column>
                <el-table-column prop="uid" label="UID"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="icon" label="用户头像">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="left">
                            <img :src="scope.row.icon" alt="" style="width:300px;height:300px;">
                            <div slot="reference" class="name-wrapper">
                                <img :src="scope.row.icon" alt="" style="width:100px;height:100px;">
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" :formatter="judgeSex" label="性别"></el-table-column>
                <el-table-column prop="address" label="城市"></el-table-column>
                <el-table-column prop="lasttime" label="最近登录时间"></el-table-column>
                <el-table-column prop="status" :formatter="judgeStatus" label="状态"></el-table-column>
                <el-table-column prop="is_online" :formatter="judgeOnline" label="是否在线"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="6">
                                <el-button size="mini" type="primary" @click="userDetail(scope.$index, scope.row)">用户详情</el-button>
                            </el-col>
                            <el-col :span="6" v-if="scope.row.status == 0">
                                <el-button size="mini" type="primary" @click="userDetail(scope.$index, scope.row)">封号</el-button>
                            </el-col>
                            <el-col :span="6" v-if="scope.row.status == 0">
                                <el-button size="mini" type="primary" @click="userDetail(scope.$index, scope.row)">踢下线</el-button>
                            </el-col>
                            <el-col :span="6" v-else-if="scope.row.status == 1">
                                <el-button size="mini" type="warning" @click="userDetail(scope.$index, scope.row)">解封</el-button>
                            </el-col>
                            <el-col :span="6" v-if="scope.row.is_up_list == 0">
                                <el-button size="mini" type="primary" @click="userDetail(scope.$index, scope.row)">上榜</el-button>
                            </el-col>
                            <el-col :span="6" v-else-if="scope.row.is_up_list == 1">
                                <el-button size="mini" type="primary" @click="userDetail(scope.$index, scope.row)">下榜</el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total,prev, pager, next,jumper" :page-size="20" @current-change="handleCurrentChange" :current-page="page+1" :total=totalpage style="float:right; ">
                </el-pagination>
            </el-col>
        </template>
    </section>
</template>

<script>
import { allget } from "../../../api/api";
import store from "../../../vuex/store";
export default {
    data() {
        return {
            tableHeight: null, 
            formOne: {
                startDate: [new Date() - 7 * 24 * 60 * 60 * 1000, new Date()] 
            },
            formTwo: {
                startDate: [new Date() - 7 * 24 * 60 * 60 * 1000, new Date()] 
            },
            recordStatus: "",
            listData: [],
            formLabelWidth: "120px",
            listLoading: false,
            uid: "",
            operate_user: null,
            page: 0,            // 分页
            totalpage: 1000,
            channelData: {},    // 渠道数据
            channelId: null,
        };
    },
    methods: {
        judgeSex(row) {
            if (row.sex == 1) {
                return "男";
            } else if (row.sex == 2) {
                return "女";
            }
        },
        judgeStatus(row) {
            if (row.status == 1) {
                return "封号";
            } else if (row.status == 0) {
                return "正常";
            }
        },
        judgeOnline(row) {
            if (row.is_online == 1) {
                return "在线";
            } else if (row.is_online == 0) {
                return "离线";
            }
        },
        handleCurrentChange(val) {
            this.page = val - 1;
            this.getData();
        },
        // 获取数据
        getData(type) {
            var _this = this;
            _this.listLoading = true;
            let url = "/User/getUser";
            if(type == 0){
                _this.page = 0;
            }
            let param = {
                date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
                date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
                date_ls: baseConfig.changeDateTime(this.formTwo.startDate[0], 0),
                date_le: baseConfig.changeDateTime(this.formTwo.startDate[1], 0),
                uid: _this.uid,
                page: _this.page,
            };
            allget(param, url)
                .then(res => {
                    _this.listLoading = false;
                    if (res.data.ret) {
                        this.listData = res.data.data;
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
        var id = store.state.user.channelid.split(",");
        var name = store.state.user.channelname.split(","); 
        for(var i = 0; i<id.length; i++){
            this.channelData[id[i]] = name[i];
        }
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
