<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<div class="block">
                      <span class="demonstration">时间</span>
                      <el-date-picker
                        v-model="time_value"
                        type="daterange"
                        range-separator=" - "
                        placeholder="选择日期范围">
                      </el-date-picker>
                    </div>
				</el-form-item>
					<span class="demonstration">性别</span>
	                <el-select v-model="sex" placeholder="请选择">
	                   <el-option
	                     v-for="item in options"
	                     :key="item.value"
	                     :label="item.label"
	                     :value="item.value">
	                   </el-option>
	                 </el-select>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
					<el-button type="primary" v-on:click="handleDownload">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 图形 -->
		<el-col :span="24" style="overflow-x:hidden">
			<div id="chartLine" style="width:100%; height:400px;"></div>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="pageTw" border fit highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" max-height="380" >
				<el-table-column type="index" width="70" >
				</el-table-column>
				<el-table-column prop="time" label="日期" width="120" sortable >
				</el-table-column>
				<el-table-column prop="day_best" label="当天最高峰" width="100" sortable>
				</el-table-column>
				<el-table-column prop="a" label="0" width="100" sortable>
				</el-table-column>
				<el-table-column prop="b" label="1" width="100" sortable>
				</el-table-column>
				<el-table-column prop="c" label="2" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="d" label="3" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="e" label="4" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="f" label="5" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="g" label="6" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="h" label="7" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="i" label="8" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="j" label="9" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="k" label="10" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="l" label="11" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="m" label="12" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="n" label="13" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="o" label="14" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="p" label="15" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="q" label="16" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="r" label="17" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="s" label="18" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="t" label="19" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="u" label="20" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="v" label="21" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="w" label="22" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="x" label="23" min-width="100" sortable>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="totalpage" style="float:right;">
				</el-pagination>
			</el-col>
		</template>

	</section>
</template>
<script>
import { allget } from '../../api/api';
import echarts from 'echarts';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				star:"0",
				end:'20',
			    users:[],
				chartLine: null,
				totalpage:null,
				page: 2,
				listLoading: false,
                time_value:[new Date()-3*24*60*60*1000,new Date()],
                options:[
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '男'
                    },{
                        value: '2',
                        label: '女'
                    }
                ],
                sex:"",
                obj:[],
				sels: [],//列表选中列
				alltime:[],
				dayactive:[],
				newdevice:[],
				newregister:[],
				ajaxrate:[],
				ajaxact:[],
			}
		},
		computed:{
			pageTw:function(){
				return this.users.slice(this.star,this.end)
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
            //页面的页数
			handleCurrentChange(val) {
				// console.log(val);
				this.page = val;
				this.star = this.page*20-20;
				this.end = this.star+20;
			},
            // 时间格式化
            YMDdata:function(data){
                let date = new Date(data);
                let yy = date.getFullYear();
                let mm = (date.getMonth() + 1).toString();
                let dd = (date.getDate()).toString();
                // let time = date.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                mm<10?mm="0"+mm:mm;
                dd<10?dd="0"+dd:dd;
                return yy+'-'+mm+'-'+dd
            },
			//获取用户列表
			getUser() {
                let _this = this ;
                this.listLoading = true;
				_this.alltime=[];
				_this.obj=[];
                let url = '/Base/getMatchCall';
                let data ={
                    date_s:this.YMDdata(this.time_value[0]),
                    date_e:this.YMDdata(this.time_value[1]),
                    sex:this.sex
                }
                allget(data, url).then(data => {
                    // console.log(data);
                    // console.log('获取用户信息');
					_this.totalpage = data.data.data.length;
                    _this.users = data.data.data;
					let ajaxData = data.data.data;
					ajaxData.forEach(function(val,index){
						_this.alltime.unshift(ajaxData[index].time);
	                    _this.obj.push({
                            name: ajaxData[index].time,
                            type: 'line',
                            smooth:true,
                            data: [ajaxData[index].a,ajaxData[index].b,ajaxData[index].c,ajaxData[index].d,ajaxData[index].e,ajaxData[index].f,ajaxData[index].g,ajaxData[index].h,ajaxData[index].i,ajaxData[index].j,ajaxData[index].k,ajaxData[index].l,ajaxData[index].m,ajaxData[index].n,ajaxData[index].o,ajaxData[index].p,ajaxData[index].q,ajaxData[index].r,ajaxData[index].s,ajaxData[index].t,ajaxData[index].u,ajaxData[index].v,ajaxData[index].w,ajaxData[index].x]
                        })
					});

					this.canvas();
                }).catch(function(err){
					console.log(err);
				});

                this.listLoading = false;
			},
			// 第二种导出方式
			handleDownload() {
	          	require.ensure([], () => {
  	            const { export_json_to_excel } = require('../vendor/Export2Excel');
  	            const tHeader = ['日期','总人数','日活跃','新增设备数','新增注册数','转化率','活跃度','平均使用时长','老活跃用户','老用户占比','男女占比'];
  	            const filterVal = ['time','people','active','device','register','rate','act','ACCU','old_active','old_rate','man_woman_rate'];
  	            const data = this.formatJson(filterVal, this.users);
  	            export_json_to_excel(tHeader, data, '总渠道数据');
  	          })
	        },
			// 导出的一部分东西
			formatJson(filterVal, jsonData) {
	          	return jsonData.map(v => filterVal.map(j => {
  	            if (j === 'timestamp') {
  	              return parseTime(v[j])
  	            } else {
  	              return v[j]
  	            }
  	          }))
		    },
			// 时间
			time:function(row, column){
				let dd = parseInt(row.ACCU / 60 / 60 / 24);
				let hh = parseInt(row.ACCU / 60 / 60 % 24);
				let mi = parseInt(row.ACCU / 60 % 60);
				let ss = parseInt(row.ACCU % 60);
				return dd + '天' + hh + '时' + mi + '分' + ss + '秒';
			},
			// 过滤器
			rate:function(row, column){
				let rate = '1'+':'+row.man_woman_rate
				return rate
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			// 图表绘制 已写死可以不死
			canvas:function(){
				this.chartLine = echarts.init(document.getElementById('chartLine'));
				this.chartLine.setOption({
	                title: {
	                    text: '总渠道数据管理'
	                },
	                tooltip: {
	                    trigger: 'axis'
	                },
	                legend: {
	                    data: this.alltime
	                },
					toolbox: {
				        show : true,
				        feature : {
				            mark : {show: false},
				            dataView : {show: false, readOnly: false},
				            magicType : {show: false, type: ['line', 'bar']},
				            restore : {show: false},
				            saveAsImage : {show: false}
				        }
				    },
	                containLabel: true,
	                xAxis: {
	                    type: 'category',
	                    data: ['0','1','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23',24]
	                },
	                yAxis: [
	                     {
				            type : 'value',
				            name : '量',
				            axisLabel : {
				                formatter: '{value} .'
				            }
				        }
	                ],
	                series: this.obj
	            });
			}
		},
		mounted() {
            this.$nextTick(function(){
				this.getUser();
            })
		}
	};

</script>

<style scoped>

</style>
