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
                <el-form-item class="search-span" style="float:right;">
                    <el-button id="searchBtn" type="primary" @click="getData(0)">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!-- 用户的数据展示列表 -->
        <template>
            <el-table :data="listData" v-loading="listLoading" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="a" label="1-5级"></el-table-column>
                <el-table-column prop="b" label="6-10级"></el-table-column>
                <el-table-column prop="c" label="11-20级"></el-table-column>
                <el-table-column prop="d" label="21-30级"></el-table-column>
                <el-table-column prop="e" label="31-40级"></el-table-column>
                <el-table-column prop="f" label="41-50级"></el-table-column>
                <el-table-column prop="g" label="51-60级"></el-table-column>
                <el-table-column prop="h" label="61-70级"></el-table-column>
                <el-table-column prop="i" label="71-80级"></el-table-column>
                <el-table-column prop="j" label="81-90级"></el-table-column>
                <el-table-column prop="k" label="91-100级"></el-table-column>
                <el-table-column label="展开详细" width="180px">
                    <template slot-scope="scope">
						<el-button size="mini" type="danger" @click="lister(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 工具条 -->
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total,prev, pager, next,jumper" :page-size="20"  @current-change="handleCurrentChange" :current-page="page+1" :total=totalpage style="float:right; ">
                </el-pagination>
            </el-col>
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
            formOne: {
                startDate: [new Date() - 7 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
            },
            page: 0,
            totalpage: 1000,
            listData: [],
            formLabelWidth: "120px",
			listLoading: false,
            dialogTableVisible: false,
            dialogTableVisible1: false,
			gradeListData: [],
		 
			
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
				page: this.page,
            };
            allget(param, url)
                .then(res => {
                    _this.listLoading = false;
                    if (res.data.ret) {
                        this.listData = res.data.data;
                        console.log(res.data.data);
                    }else{
                        baseConfig.successTipMsg(_this, res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        
       
	 
    },
    mounted() {
        var _this = this;
        _this.tableHeight = baseConfig.lineNumber(searchPageHeight);
		this.getData();
	 
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
.chart_btn{

}
</style>
