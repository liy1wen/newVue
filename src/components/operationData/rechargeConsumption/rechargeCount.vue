<template>
    <!-- 充值金额统计 -->
    <!-- dom结构内容 -->
    <section>
        <!-- 工具条/头部的搜索条件搜索 -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formOne">
                <el-form-item>
                    <div class="block">
                        <span class="registerTime">日期</span>
                        <el-date-picker v-model="formOne.choiceDate" type="daterange" range-separator=" 至 " placeholder="选择日期范围"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <span>展示类型</span>
                    <el-select style="width: 150px;" v-model="searchType">
                        <el-option label="按日查询" value="0"></el-option>
                        <el-option label="按月查询" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>渠道</span>
                    <el-select v-model="channelId" multiple filterable collapse-tags style="margin-left: 20px;" placeholder="请选择">
                        <el-option v-for="(item, key) of channelData" :key="item" :label="item" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 100px;">
                    <el-button type="primary" @click="chartLineShow">饼状图</el-button>
                    <el-button type="primary" @click="getTableData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--用户的数据展示列表-->
        <template>
            <el-table ref="tableHeight" :data="tabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
                <el-table-column prop="date" label="日期/月份" sortable></el-table-column>
                <el-table-column  label="总人次（男/女/总）">
                    <template slot-scope="scope">
                        <p>{{+scope.row.man_num+(+scope.row.woman_num)}}</p>   
                    </template>
                </el-table-column>
                <el-table-column prop="silver" label="总人数（男/女/总）">
                    <template slot-scope="scope">
                        <p>{{+scope.row.man_people+(+scope.row.woman_people)}}</p>   
                    </template>
                </el-table-column>
                <el-table-column prop="total" label="总额"></el-table-column>
                <el-table-column prop="ten" label="10元"></el-table-column>
                <el-table-column prop="thirty" label="30元"></el-table-column>
                <el-table-column prop="hundred" label="100元"></el-table-column>
                <el-table-column prop="two_hundred" label="200元"></el-table-column>
                <el-table-column prop="five_hundred" label="500元"></el-table-column>
                <el-table-column prop="thousand" label="1000元"></el-table-column>
                <el-table-column prop="two_thousand" label="2000元"></el-table-column>
                <el-table-column prop="three_thousand" label="3000元"></el-table-column>
                <el-table-column prop="five_thousand" label="5000元"></el-table-column>
                <el-table-column prop="ten_thousand" label="10000元"></el-table-column>
            </el-table>
            <!-- 折线图 -->
            <el-dialog title="占比饼状图" :width="dialogWidth" :visible.sync="dialogVisible" @open="show">
                <div class="chartLine" style="width: 100%;height: 500px;"></div>
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
import echarts from "echarts";
export default {
    data() {
        return {
            tableHeight: null, // table展示的页面的高度多少
            // 搜索条件的组装字段
            formOne: {
                choiceDate: [new Date() - 180 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
            },
            searchType: "0",
            listLoading: false, //动画加载时显示的动画
            tabData: [], //测试模拟数据（可删除）
            formLabelWidth: "120px", // 设置dialog弹框的宽度
            dialogVisible: false,
            dialogWidth: null,
            channelData: {},
            channelId: null,
            chartLine: null,
            chartLineData: {
                title: {
                    text: "男女占比和各充值金额占比",
                    subtext: "男女人数占比 及 各充值金额占比",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "horizontal",
                    x: "center",
                    y: "bottom",
                    data: [
                        "男",
                        "女",
                        "10元",
                        "30元",
                        "100元",
                        "200元",
                        "500元",
                        "1000元",
                        "2000元",
                        "3000元",
                        "5000元",
                        "10000元",
                    ]
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ["pie", "funnel"],
                            option: {
                                funnel: {
                                    x: "25%",
                                    width: "50%",
                                    funnelAlign: "left",
                                    max: 1548
                                }
                            }
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                series: [
                    {
                        name: "男女人次占比",
                        type: "pie",
                        radius: "55%",
                        center: ["25%", "60%"],
                        data: [
                            { value: '', name: "男" },
                            { value: '', name: "女" },
                        ],
                    },
                    {
                        name: "各充值金额占比饼状图",
                        type: "pie",
                        radius: "55%",
                        center: ["75%", "60%"],
                        data: [
                            { value: '', name: "10元" },
                            { value: '', name: "30元" },
                            { value: '', name: "100元" },
                            { value: '', name: "200元" },
                            { value: '', name: "500元" },
                            { value: '', name: "1000元" },
                            { value: '', name: "2000元" },
                            { value: '', name: "3000元" },
                            { value: '', name: "5000元" },
                            { value: '', name: "10000元" },
                        ]
                    }
                ]
            }
        };
    },
    methods: {
        // 搜索条件
        searchCondition() {
            var _this = this;
            var obj = {};
            obj.date_s = baseConfig.changeDateTime(_this.formOne.choiceDate[0],0);
            obj.date_e = baseConfig.changeDateTime(_this.formOne.choiceDate[1],0);
            obj.channel = this.channelId.join(",");
            obj.show_type = this.searchType;
            return obj;
        },
        // 获取数据列表
        getTableData() {
            var _this = this;
            _this.listLoading = true;
            var url = "/NewMoney/getRechargeCountData";
            var params = _this.searchCondition();
            
            // 进行get请求，(请求参数params, 请求地址url)
            allget(params, url)
                .then(res => {
                    _this.listLoading = false;
                    if (res.data.ret) {
                        _this.tabData = res.data.list;
                        //动态加载表格中的数据 男女比例数据加载
                        for(var i = 0; i<res.data.sex.length; i++){
                            if(res.data.sex[i].sex == 2) {
                                _this.chartLineData.series[0].data[1].value = res.data.sex[i].sex_num;
                            }else if(res.data.sex[i].sex == 1) {
                                _this.chartLineData.series[0].data[0].value = res.data.sex[i].sex_num;
                            }
                        }
                        //动态加载表格中的数据 会员比例数据加载
                        for(var i = 0; i<res.data.money.length; i++) {
                            if(res.data.money[i].total_fee == 10) {
                                _this.chartLineData.series[1].data[0].value = res.data.money[i].money_num;// 10元
                            }else if(res.data.money[i].total_fee == 30) {
                                _this.chartLineData.series[1].data[1].value = res.data.money[i].money_num;// 30元
                            }else if(res.data.money[i].total_fee == 100) {
                                _this.chartLineData.series[1].data[2].value = res.data.money[i].money_num;// 100元
                            }else if(res.data.money[i].total_fee == 200) {
                                _this.chartLineData.series[1].data[3].value = res.data.money[i].money_num;// 200元
                            }else if(res.data.money[i].total_fee == 500) {
                                _this.chartLineData.series[1].data[4].value = res.data.money[i].money_num;// 500元
                            }else if(res.data.money[i].total_fee == 1000) {
                                _this.chartLineData.series[1].data[5].value = res.data.money[i].money_num;// 1000元
                            }else if(res.data.money[i].total_fee == 2000) {
                                _this.chartLineData.series[1].data[6].value = res.data.money[i].money_num;// 2000元
                            }else if(res.data.money[i].total_fee == 3000) {
                                _this.chartLineData.series[1].data[7].value = res.data.money[i].money_num;// 3000元
                            }else if(res.data.money[i].total_fee == 5000) {
                                _this.chartLineData.series[1].data[8].value = res.data.money[i].money_num;// 5000元
                            }else if(res.data.money[i].total_fee == 10000) {
                                _this.chartLineData.series[1].data[9].value = res.data.money[i].money_num;// 10000元
                            }
                        }
                    } else {
                        // 返回ret==0，非正常数据
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        show() {
            this.$nextTick(function() {
                this.chartLine = echarts.init(
                    document.querySelector(".chartLine")
                );
                document.querySelector(".chartLine").style.border =
                    "1px solid #4488BB";
                this.chartLine.setOption(this.chartLineData);
            });
        },
        chartLineShow() {
            this.dialogVisible = true;
        }
    },
    mounted() {
        var _this = this;
        this.$nextTick(function() {
            _this.tableHeight = searchHeight;
            _this.getTableData();
        });
        _this.dialogWidth = lookWidth * 0.8 + "px"; //设置进行dialog的宽度进行设置为屏幕的80%
        var id = store.state.user.channelid.split(",");
        for (var i = 0; i < id.length; i++) {
            this.channelData[id[i]] = store.state.user.channelname.split(",")[i];
        }
    }
};
</script>

<style lang="css" scoped>
.infomation {
    width: 100%;
    height: 100%;
}
</style>
