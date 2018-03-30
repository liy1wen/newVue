<template>
	<!-- 每日实时充值数据 -->
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
					<el-button type="primary" @click="chartLineShow">折线图</el-button>
					<el-button type="primary" @click="getTableData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--用户的数据展示列表-->
		<template>
			<el-table ref="tableHeight" :data="onePageTabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
				<el-table-column prop="time" label="日期" width="90" sortable ></el-table-column>
				<el-table-column prop="day_best" label="当天总和" min-width="60" sortable ></el-table-column>
				<el-table-column prop="a" label="00:00-00:59" width="60" sortable ></el-table-column>
				<el-table-column prop="b" label="01:00~01:59" width="60" sortable ></el-table-column>
				<el-table-column prop="c" label="02:00~02:59" width="60" sortable ></el-table-column>
				<el-table-column prop="d" label="03:00~03:59" width="60" sortable ></el-table-column>
				<el-table-column prop="e" label="04:00~04:59" width="60" sortable ></el-table-column>
				<el-table-column prop="f" label="05:00~05:59" width="60" sortable ></el-table-column>
				<el-table-column prop="g" label="06:00~06:59" width="60" sortable ></el-table-column>
				<el-table-column prop="h" label="07:00~07:59" width="60" sortable ></el-table-column>
				<el-table-column prop="i" label="08:00~08:59" width="60" sortable ></el-table-column>
				<el-table-column prop="j" label="09:00~09:59" width="60" sortable ></el-table-column>
				<el-table-column prop="k" label="10:00~10:59" width="60" sortable ></el-table-column>
				<el-table-column prop="l" label="11:00~11:59" width="60" sortable ></el-table-column>
				<el-table-column prop="m" label="12:00~12:59" width="60" sortable ></el-table-column>
				<el-table-column prop="n" label="13:00~13:59" width="60" sortable ></el-table-column>
				<el-table-column prop="o" label="14:00~14:59" width="60" sortable ></el-table-column>
				<el-table-column prop="p" label="15:00~15:59" width="60" sortable ></el-table-column>
				<el-table-column prop="q" label="16:00~16:59" width="60" sortable ></el-table-column>
				<el-table-column prop="r" label="17:00~17:59" width="60" sortable ></el-table-column>
				<el-table-column prop="s" label="18:00~18:59" width="60" sortable ></el-table-column>
				<el-table-column prop="t" label="19:00~19:59" width="60" sortable ></el-table-column>
				<el-table-column prop="u" label="20:00~20:59" width="60" sortable ></el-table-column>
				<el-table-column prop="v" label="21:00~21:59" width="60" sortable ></el-table-column>
				<el-table-column prop="w" label="22:00~22:59" width="60" sortable ></el-table-column>
				<el-table-column prop="x" label="23:00~23:59" width="60" sortable ></el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev,pager,next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="totalpage" style="float:right;"></el-pagination>
			</el-col>
		</template>
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
			tableHeight: null, // table展示的页面的高度多少
			// 搜索条件的组装字段
			formOne: {
				choiceDate: [new Date()-7*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
			},
			listLoading: false, //动画加载时显示的动画
			tabData: [], //列表的所有数据，移除删除的功能用全部的数据进行移除
			totalpage: null, //下方工具条的总页数 
			page: 1, //现在数据展示的页数，当返回的是全部的数据时，设置默认的页面为1
			star: '0', //每一页的开始数据
			end: '20', //每一页的结束数据
			formLabelWidth: '120px', // 设置dialog弹框的宽度
			chartLineData: {//用于折线图绘制的数据
				legend: [],
				xAxis: [],
				series: [[], [], [], [], [], []],
			}, 
		};
	},
	computed:{
		// 对某一页码展示某一页的数据，对返回的所有的数据进行切割处理，对当前的页码显示20条当前页码的数据
		onePageTabData() {
			var _this = this;
			return _this.tabData.slice(_this.star, _this.end);
		},
	},
	methods: {
		// 下方页数进行翻页的页码时，返回的是全部的数据，配合onePageTabData展示需要展示当前页面的数据
		handleCurrentChange(val) {
			// val指的是当前点击是第一页
			var _this = this;
			_this.page = val;
			_this.star = (_this.page-1)*20;
			_this.end = _this.star+20;
		},
		// 搜索条件
		searchCondition() {
			var _this = this;
			var obj = {};
			obj.date_s = baseConfig.changeDateTime(_this.formOne.choiceDate[0], 0);
			obj.date_e = baseConfig.changeDateTime(_this.formOne.choiceDate[1], 0);
			return obj;
		},
		// 获取数据列表
		getTableData() {
			var _this = this ;
			_this.listLoading = true;
			var url = '/Base/getRechargeOrder';
			var params = _this.searchCondition();
			// 如果得到的搜索为null，表示存在搜索条件为空，不进行数据请求
			if(params==null) {
				// 不进行数据请求,直接关闭掉加载的图层
				_this.listLoading = false;
			} else {
				// 进行get请求，(请求参数params, 请求地址url)
				allget(params, url).then(res => {
					// 数据请求成功
					_this.listLoading = false;
					if(res.data.ret) {
						var betweenData = [];
						_this.chartLineData.legend = [];
						for(var i=0; i<res.data.data.length; i++) {
							betweenData.push([
								0,
								res.data.data[i].a-0,
								(res.data.data[i].a-0)+(res.data.data[i].b-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0)+(res.data.data[i].r-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0)+(res.data.data[i].r-0)+(res.data.data[i].s-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0)+(res.data.data[i].r-0)+(res.data.data[i].s-0)+(res.data.data[i].t-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0)+(res.data.data[i].r-0)+(res.data.data[i].s-0)+(res.data.data[i].t-0)+(res.data.data[i].u-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0)+(res.data.data[i].r-0)+(res.data.data[i].s-0)+(res.data.data[i].t-0)+(res.data.data[i].u-0)+(res.data.data[i].v-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0)+(res.data.data[i].r-0)+(res.data.data[i].s-0)+(res.data.data[i].t-0)+(res.data.data[i].u-0)+(res.data.data[i].v-0)+(res.data.data[i].w-0),
								(res.data.data[i].a-0)+(res.data.data[i].b-0)+(res.data.data[i].c-0)+(res.data.data[i].d-0)+(res.data.data[i].e-0)+(res.data.data[i].f-0)+(res.data.data[i].g-0)+(res.data.data[i].h-0)+(res.data.data[i].i-0)+(res.data.data[i].j-0)+(res.data.data[i].k-0)+(res.data.data[i].l-0)+(res.data.data[i].m-0)+(res.data.data[i].n-0)+(res.data.data[i].o-0)+(res.data.data[i].p-0)+(res.data.data[i].q-0)+(res.data.data[i].r-0)+(res.data.data[i].s-0)+(res.data.data[i].t-0)+(res.data.data[i].u-0)+(res.data.data[i].v-0)+(res.data.data[i].w-0)+(res.data.data[i].x-0),
							]);
							_this.chartLineData.legend.push(res.data.data[i].time);
						}
						// 拿到数据进行处理
						_this.totalpage = res.data.data.length;
						_this.tabData = res.data.data;
						// 设置重置折线图的参数
						_this.chartLineData.unit = '元';
						_this.chartLineData.name = '每日充值';
						_this.chartLineData.series = betweenData;
						_this.chartLineData.xAxis = ['-24', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
					} else {
						// 返回ret==0，非正常数据
						baseConfig.errorTipMsg(_this, res.data.msg);
					}
				}).catch(function(error){
					console.log(error);
				})
			}
		},
		// 折线图展示
		chartLineShow() {
			var _this = this;
			Event.$emit('show-chart-line', {
				data: _this.chartLineData,
			});
		},
	},
	mounted() {
		var _this = this;
		this.$nextTick(function() {
			_this.tableHeight = searchPageHeight;
			_this.getTableData();
		})
	}
};
</script>

<style lang="css" scoped>
/* 页面样式css内容 */
.excelBox{
	width: 500px; height: 270px; margin-left: -150px; background: #f1f7ff;
	position: absolute; left: 50%; top: 15%; z-index: 1000;
}
p{ margin: 0; }
.excelBox>p{
	width: 100%; height: 50px; line-height: 50px; font-weight: bold;
	background: #e3efff; text-align: center;
}
.excelBox .excelInput{
	width: 100%; height: 60px;
}
.excelBox .select{
	width: 100%; height: 80px;
}
.excelBox .excelInput p,
.excelBox .select p{
	width: 100%; height: 36px; text-indent: 20px; line-height: 36px;
}
.excelBox .excelInput input{
    width: 300px; display: block; margin: 0 auto;
}
.excelBox .select>div{
	width: 300px; display: block; margin: 0 auto;
}
.btns{
    width: 100%; height: 50px;
}
.btns button{
    width: 80px; height: 40px; text-align: center; line-height: 40px;
    border: none; border-radius: 5px;
    background-color: #78B2FF; margin-top: 20px; color: #fff;
}
.btns button:nth-of-type(1){
    margin-left: 150px; cursor: pointer;
}
.btns button:nth-of-type(2){
    margin-left: 50px; cursor: pointer;
}
</style>
