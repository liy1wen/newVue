<template>
    <!-- 每日任务统计 -->
    <!-- dom结构内容 -->
    <section>
        <!-- 工具条/头部的搜索条件搜索 -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" style="overflow: hidden;">
                <el-form-item>
                    <div class="block">
                        <span class="registerTime">日期</span>
                        <el-date-picker v-model="formOne.startDate" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <span>渠道</span>
                    <el-select v-model="channelId" style="width:120px;"   placeholder="请选择">
                        <el-option v-for="(item, key) of channelData" :key="item" :label="item" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>用户类型</span>
                    <el-select v-model="type" style="width:120px;"  placeholder="请选择">
                        <el-option label="全部" value="0"> </el-option>
                        <el-option label="付费" value="1"> </el-option>
                        <el-option label="活跃" value="2"> </el-option>
                        <el-option label="新用户" value="3"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search-span" style="float:right;">
                    <el-button id="searchBtn" type="primary" @click="getData(0)">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!-- 用户的数据展示列表 -->
        <template>
            <table cellspacing="0"    border="1" style="border: 1px solid #EBEEF5;" >
                <thead style="background:#E3EFFF;">
                    <tr v-html="thead_html" style="height:50px;line-height:40px;font-size:14px;color: #909399;">
                    </tr>
                </thead>
                <tbody v-html="tbody_html" class="data_tbody" style="color: #606266;border:1px solid #ebeef5;">
                     
                </tbody>
            </table>
        </template>
       
    </section>
</template>

<script>
import { allget } from "../../../api/api";
import axios from "axios";
import store from "../../../vuex/store";

export default {
    data() {
        return {
            tableHeight: null, // table展示的页面的高度多少，第二页中对应高度
            tableWidth: null,
            formOne: {
                startDate: [new Date() - 7 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
            },
            listData: [],
            formLabelWidth: "120px",
			listLoading: false,
            dialogTableVisible: false,
            dialogTableVisible1: false,
			gradeListData: [],
            taskList: {},   // 总任务id对应name
            task_html:'<el-table-column prop="date" label="日期"></el-table-column>',
			all_ob: null,      //数据对应的所有任务
            thead_html: "<th>日期</th>",
            tbody_html: "",
            channelData: {}, // 渠道数据
            channelId: null, // 渠道数据
            type: null,      // 用户类型
        };
    },
    methods: {
        
        //页面的页数
        handleCurrentChange(val) {
            //服务器的第一页是0 所以 这里要 -1
            this.page = val-1;
            this.getData();
        },
        // 获取数据
        getData(type) {
            var _this = this;
			if(type == 0){
				this.page = 0;
			}
            var _this = this;
            _this.listLoading = true;
            let url = "/NewLevel/getDayTaskData";
            if (this.formOne.startDate == null) {
                baseConfig.warningTipMsg(this, "请输入日期");
                return;
            }
            let param = {
                date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
                date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
                channel: this.channelId,
                type: this.type,
            };
            allget(param, url)
                .then(res => {
                    _this.listLoading = false;
                    if (res.data.ret) {
                        _this.listData = res.data.data;

                        // 将后台拿来的数据进行组装
                        var newData = [];
                        var ob = {};
                        for(var i = 0; i<res.data.data.length;i++){
                            if(i == 0){
                                ob.date = res.data.data[i].date;
                            }
                            var p = res.data.data[i].task_id;
                            if(ob.date == res.data.data[i].date){
                                ob[p] = res.data.data[i].num;
                            }else{
                                newData.push(ob);
                                ob = {};
                                ob.date = res.data.data[i].date;
                                ob[p] = res.data.data[i].num;
                            }
                            if( i == res.data.data.length - 1){
                                newData.push(ob);
                            }
                        }
                        
                        // console.log(newData)
                        // 计算数据内总共用到的 总任务数
                        var all_ob = [];
                        for(var i = 0;i<newData.length;i++){
                            for(var key in newData[i]){
                                if(key != "date"){
                                    if(all_ob.indexOf(key)=="-1"){
                                        all_ob.push(key);    
                                    }
                                }
                            }
                        }
                        _this.all_ob = all_ob.sort();
                        
                        // 动态生成table表头
                        // console.log(all_ob);
                        _this.taskList = JSON.parse(baseConfig.getStorage("taskListLocal", false));
                        this.thead_html = "<th>日期</th>";
                        for(var i = 0;i<this.all_ob.length;i++){
                            this.thead_html += "<th class='d_thead' style='font-size: 20px;'>"+ this.taskList[this.all_ob[i]] +"</th>";
                        }

                        /*根据上一步整合的数据，判断哪些标签没有数值，没有数值的赋值为0*/
                        for(var i = 0; i< newData.length; i++){
                            var newCap = [];
                            for(var key in newData[i]){
                                if(key != "date") {
                                    newCap.push(key);
                                }
                            }
                            // 没有的添加相应的赋值为0
                            for(var k = 0; k < all_ob.length;k++){
                                if(newCap.indexOf(all_ob[k]) == "-1"){
                                    var cap_p = all_ob[k];
                                    newData[i][cap_p] = "0";
                                }                                
                            }
                        }
                        // 动态生成tbody
                        var t_body_html = "";
                        for(var i = 0; i < newData.length; i++){
                            var td_html = '<td>'+ newData[i].date +'</td>';
                            var tr_html = "";
                            for(var key in newData[i]){
                                if(key != "date"){
                                    td_html += '<td>'+ newData[i][key] +'</td>'
                                }
                            }
                            tr_html += "<tr style='color: #606266;font-size: 14px;height:50px;'>" + td_html + "</tr>";
                        t_body_html += tr_html;           
                        }     
                        _this.tbody_html = t_body_html;
                        
                    }else{
                        baseConfig.successTipMsg(_this, res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取任务列表
        getTaskList(){
            var _this = this;
            var url = '/NewLevel/getTaskIdList';
            allget("",url).then(res => {
                if(res.data.ret){
                    var n_obj = {};
                    for(var i = 0;i<res.data.data.length;i++){
                        var p = res.data.data[i].id;
                        n_obj[p] = res.data.data[i].desc;
                    }
                    var tls = JSON.stringify(n_obj);
                    baseConfig.setStorage("taskListLocal", tls, false);
                    // _this.taskList = JSON.parse(baseConfig.getStorage("taskListLocal", false));
                }else{
                    baseConfig.errorTipMsg(_this, res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
	 
    },
    created() {
        this.getTaskList();
		this.getData();
    },
    mounted() {
        var _this = this;
        _this.tableHeight = baseConfig.lineNumber(searchHeight);
        _this.tableWidth = baseConfig.lineNumber(lookWidth);
        // this.getTaskList();
        // this.getData();
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
.bindingTitle {
    margin-left: 130px;
}
.family_content {
    overflow: hidden;
    /* border: 1px solid blue; */
}
.image_container {
    float: left;
    /* border: 1px solid orange; */
    width: 40%;
    height: 100%;
}
.image_container img {
    width: 300px;
    height: 200px;
}
.image_container .image_box {
    margin-top: 10px;
    border: 1px solid #666;
}
.image_container .image_box .avator {
    display: inline-block;
    width: 80px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    vertical-align: top;
    /* border: 1px solid aqua; */
}
.image_container .image_box .picture {
    display: inline-block;
    vertical-align: middle;
    /* border: 1px solid saddlebrown; */
}
.image_container .image_box .delete {
    display: inline-block;
    /* border: 1px solid darkblue; */
}
.family_detail {
    float: right;
    width: 59%;
    height: 100%;
    /* border: 1px solid red; */
}
.dialog-footer {
    display: block;
    margin-top: 0px;
    margin-left: -50px;
    /* border: 1px solid red; */
}
.el-dialog__wrapper .el-dialog .el-dialog__body{
	position: relative!important;
	border:1px solid red!important;
}
.data_tbody{
    text-align: center;
}
.d_thead{
    border: 1px solid red;
    color: red;
}
td{
    border: 1px solid blue;
}
</style>
