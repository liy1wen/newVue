<template>
	<!-- 实时匹配详情 -->
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
				<el-form-item style="margin-left: 100px;">
					<span>性别</span>
					<el-select style="width: 150px;" v-model="sex">
						<el-option label="全部" value=""></el-option>
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="search-span" style="float:right;">
					<el-button id="searchBtn" type="primary" @click="getData()">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 用户的数据展示列表 -->
		<template>
			<el-table :data="listData" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
				<el-table-column prop="time" label="日期"></el-table-column>
				<el-table-column prop="day_best" label="当天最高峰"></el-table-column>
				<el-table-column prop="a" label="00:00~00:59"></el-table-column>
				<el-table-column prop="b" label="01:00~01:59"></el-table-column>
				<el-table-column prop="c" label="02:00~02:59"></el-table-column>
				<el-table-column prop="d" label="03:00~03:59"></el-table-column>
				<el-table-column prop="e" label="04:00~04:59"></el-table-column>
				<el-table-column prop="f" label="05:00~05:59"></el-table-column>
				<el-table-column prop="g" label="06:00~06:59"></el-table-column>
				<el-table-column prop="h" label="07:00~07:59"></el-table-column>
				<el-table-column prop="i" label="08:00~08:59"></el-table-column>
				<el-table-column prop="j" label="09:00~09:59"></el-table-column>
				<el-table-column prop="k" label="10:00~10:59"></el-table-column>
				<el-table-column prop="l" label="11:00~11:59"></el-table-column>
				<el-table-column prop="m" label="12:00~12:59"></el-table-column>
				<el-table-column prop="n" label="13:00~13:59"></el-table-column>
				<el-table-column prop="o" label="14:00~14:59"></el-table-column>
				<el-table-column prop="p" label="15:00~15:59"></el-table-column>
				<el-table-column prop="q" label="16:00~16:59"></el-table-column>
				<el-table-column prop="r" label="17:00~17:59"></el-table-column>
				<el-table-column prop="s" label="18:00~18:59"></el-table-column>
				<el-table-column prop="t" label="19:00~19:59"></el-table-column>
				<el-table-column prop="u" label="20:00~20:59"></el-table-column>
				<el-table-column prop="v" label="21:00~21:59"></el-table-column>
				<el-table-column prop="w" label="22:00~22:59"></el-table-column>
				<el-table-column prop="x" label="23:00~23:59"></el-table-column>
			</el-table>
			<!-- 工具条 -->
			<!-- <el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev, pager, next,jumper" :page-size="20" :total=1000 style="float:right; ">
				</el-pagination>
			</el-col> -->
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
				startDate: [new Date() - 7 * 24 * 60 * 60 * 1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
            },
            listData: [],
            formLabelWidth: "120px",
            listLoading: false,
            sex: ""
        };
    },
    methods: {
        // 获取数据
        getData() {
            var _this = this;
            let url = "/Base/getMatchCall";
			let param = _this.condition();
            allget(param, url)
                .then(res => {
                    if (res.data.ret) {
                        this.listData = res.data.data;
                    } else {
                        baseConfig.errorTipMsg(this, res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                    baseConfig.errorTipMsg(this, "error");
                });
		},
		// 条件参数
		condition() {
			if(this.sex !== "" || this.sex !== null){
				return {
                	date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
                	date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
                	sex: this.sex
            	};
			}else {
				return{
					date_ms: baseConfig.changeDateTime(this.formOne.month, 2),
					date_me: baseConfig.changeDateTime(this.formOne.month, 2),
				}
			}
		},
    },
    mounted() {
        var _this = this;
        _this.tableHeight = pageHeight;
        _this.getData();
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
