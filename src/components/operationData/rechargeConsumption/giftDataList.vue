<template>
    <!-- 礼物数据统计 -->
    <!-- dom结构内容 -->
    <section>
        <!-- 工具条/头部的搜索条件搜索 -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" style="overflow: hidden;" :model="formOne">
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
                    <!-- <el-button type="primary" @click="chartLineShow">饼状图</el-button> -->
                    <el-button type="primary" @click="getTableData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--用户的数据展示列表-->
        <template>
            <el-table ref="tableHeight" :data="onePageTabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
                <!-- <el-table-column prop="date" label="日期/月份" w   idth="90" sortable></el-table-column> -->
                <el-table-column prop="id" label="礼物id" min-width="60"></el-table-column>
                <el-table-column prop="name" label="名字" min-width="60"></el-table-column>
                <el-table-column prop="price" label="价格" min-width="60"></el-table-column>
                <el-table-column prop="num" label="送出礼物数量" min-width="60"></el-table-column>
                <el-table-column prop="chat_gold" label="消耗总聊币" min-width="60"></el-table-column>
            </el-table>
            <!-- 折线图 -->
            <!-- <el-dialog title="占比饼状图" :width="dialogWidth" :visible.sync="dialogVisible" @open="show">
                <div class="chartLine" style="width: 100%;height: 500px;"></div>
            </el-dialog> -->
            <!--翻页-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev,pager,next,jumper"  :current-page="page" @current-change="handleCurrentChange" :page-size="20" :total="totalpage" style="float:right;"></el-pagination>
			</el-col>
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
                choiceDate: [new Date() - 15 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
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
            page: 1,
            totalpage: null,
            star: '0',
            end: '20',
            chartLineData: {
                title: {
                    text: "男女占比和各vip占比",
                    subtext: "（搜索日期内)男女人数占比 及 VIP占比",
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
                        "白银",
                        "黄金",
                        "铂金",
                        "钻石",
                        "至尊",
                        "圣尊",
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
                        name: "男女占比",
                        type: "pie",
                        radius: "55%",
                        center: ["25%", "60%"],
                        data: [
                            { value: '', name: "男" },
                            { value: '', name: "女" },
                        ],
                    },
                    {
                        name: "vip占比",
                        type: "pie",
                        radius: "55%",
                        center: ["75%", "60%"],
                        data: [
                            { value: '', name: "白银" },
                            { value: '', name: "黄金" },
                            { value: '', name: "白金" },
                            { value: '', name: "钻石" },
                            { value: '', name: "至尊" },
                            { value: '', name: "圣尊" },
                        ]
                    }
                ]
            }
        };
    },
    computed: {
        onePageTabData() {
			var _this = this;
			return _this.tabData.slice(_this.star, _this.end);
		},
    },
    methods: {
        handleCurrentChange(val) {
            var _this = this;
			_this.page = val;
			_this.star = (_this.page-1)*20;
			_this.end = _this.star+20;
        },
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
            var url = "/Gift/getSendGiftDataNewDetailed";
            var params = _this.searchCondition();
            
            // 进行get请求，(请求参数params, 请求地址url)
            allget(params, url)
                .then(res => {
                    _this.listLoading = false;
                    if (res.data.ret) {
                        _this.tabData = res.data.data;
                        _this.totalpage = res.data.data.length;
                        
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
            _this.tableHeight = baseConfig.lineNumber(searchPageHeight);
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
