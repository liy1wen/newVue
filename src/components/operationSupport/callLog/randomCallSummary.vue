<template>
	<!-- 随机通话汇总 -->
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
				<el-table-column prop="totalrandcallaa" label="AA通话次数"></el-table-column>
				<el-table-column prop="totalnumaa" label="AA通话人数"></el-table-column>
				<el-table-column prop="totalrandtimeaa" label="AA通话时长">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{timeTransform(scope.row.totalrandtimeaa)}}</P>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="avgtimeaa" label="AA平均通话时长">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{timeTransform(scope.row.avgtimeaa)}}</P>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="totalrandcallab" label="AB通话次数"></el-table-column>
				<el-table-column prop="totalrandtimeab" label="AB通话时长">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{timeTransform(scope.row.totalrandtimeab)}}</P>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="totalnumab" label="AB通话人数"></el-table-column>
				<el-table-column prop="avgtimeab" label="AB平均通话时长">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{timeTransform(scope.row.avgtimeab)}}</P>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="atimes" label="A类发起数"></el-table-column>
				<el-table-column prop="woman_atimes" label="女方A类发起数"></el-table-column>
				<el-table-column prop="man_atimes" label="男方A类发起数"></el-table-column>
				<el-table-column prop="new_atimes" label="新用户A类发起数"></el-table-column>
				<el-table-column prop="old_atimes" label="老用户A类发起数"></el-table-column>
				<el-table-column prop="anums" label="A类发起人数"></el-table-column>
				<el-table-column prop="snums" label="匹配次数（服务端）"></el-table-column>
				<el-table-column prop="rate" label="失败率">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{(scope.row.rate*100).toFixed(2)+"%"}}</P>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="gift" label="礼物消费"></el-table-column>
				<el-table-column prop="one_num" label="0~1分钟"></el-table-column>
				<el-table-column prop="three_num" label="1~3分钟"></el-table-column>
				<el-table-column prop="five_num" label="3~5分钟"></el-table-column>
				<el-table-column prop="ten_num" label="5~10分钟"></el-table-column>
				<el-table-column prop="thirty_num" label="10~30分钟"></el-table-column>
				<el-table-column prop="sixty_num" label="30~60分钟"></el-table-column>
				<el-table-column prop="sixtymore_num" label="大于60分钟"></el-table-column>
				<el-table-column prop="totalcall" label="总通话次数"></el-table-column>
				<el-table-column prop="totaltime" label="总通话时长">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{timeTransform(scope.row.totaltime)}}</P>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="listen_valid_times" label="有效通话次数"></el-table-column>
				<el-table-column prop="listen_valid_long" label="有效通话时长">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{timeTransform(scope.row.listen_valid_long)}}</P>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="avgtime" label="平均通话时长">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <P>{{timeTransform(scope.row.avgtime)}}</P>
                        </div>
                    </template>
                </el-table-column>
			</el-table>
		</template>
	</section>
</template>

<script>
import { allget } from "../../../api/api";
import axios from 'axios';
export default {
    data() {
        return {
            tableHeight: null, // table展示的页面的高度多少，第二页中对应高度
            formOne: {
				startDate: [new Date() - 2 * 24 * 60 * 60 * 1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
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
			let param = _this.condition();
            let url = "/Record/getRandCallData";
            allget(param, url)
                .then(res => {
                    if (res.data.ret) {
                        this.listData = res.data.data;
                    } else {
                        baseConfig.errorTipMsg(this, res.data.msg);
                    }
                })
                .catch(err => {
                    baseConfig.errorTipMsg(this, "error");
                });
		},
		// 条件参数
		condition() {
            return {
                date_s: baseConfig.changeDateTime(this.formOne.startDate[0], 0),
                date_e: baseConfig.changeDateTime(this.formOne.startDate[1], 0),
            };
        },
        // 时间转换
        timeTransform(oldValue){
            return baseConfig.changeTime(oldValue);
        }
    },
    filters: {
        numberTransform(value){
            return (value*100).toFixed(2);
        }
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
