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
                        range-separator=" 至 "
                        placeholder="选择日期范围">
                      </el-date-picker>
                    </div>
				</el-form-item>
                <el-select v-model="value" placeholder="请选择">
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
			<el-table :data="pageTw" border fit highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" max-height="350" >
				<el-table-column type="index" width="70" >
				</el-table-column>
				<el-table-column prop="time" label="日期" width="120" sortable >
				</el-table-column>
				<el-table-column prop="people" label="总人数" width="100" sortable>
				</el-table-column>
				<el-table-column prop="active" label="日活跃" width="100" sortable>
				</el-table-column>
				<el-table-column prop="device" label="新增设备数" width="130" sortable>
				</el-table-column>
				<el-table-column prop="register" label="新增注册数" min-width="180" sortable>
				</el-table-column>
                <el-table-column prop="rate" label="转化率" min-width="120" sortable>
				</el-table-column>
                <el-table-column prop="act" label="活跃度" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="ACCU" :formatter="time" label="平均使用时长" min-width="150" sortable>
				</el-table-column>
                <el-table-column prop="old_active" label="老活跃用户" min-width="140" sortable>
				</el-table-column>
                <el-table-column prop="old_rate" label="老用户占比" min-width="140" sortable>
				</el-table-column>
                <el-table-column prop="man_woman_rate" :formatter="rate" label="男女占比" min-width="120" sortable>
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
                time_value:[new Date()-7*24*60*60*1000,new Date()],
                options:[
                    {
                        value: '0',
                        label: '渠道'
                    },
                    {
                        value: '1',
                        label: '苹果'
                    },{
                        value: '2',
                        label: '安卓'
                    },{
                        value: '666',
                        label: '苹果-广告'
                    }
                ],
                value:"0",
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
				_this.dayactive=[];
				_this.newdevice=[];
				_this.newregister=[];
				_this.ajaxrate=[];
				_this.ajaxact=[];
                let url = '/Base/getBaseData';
                let data ={
                    date_s:this.YMDdata(this.time_value[0]),
                    date_e:this.YMDdata(this.time_value[1]),
                    channel:this.value
                }
                allget(data, url).then(data => {
                    // console.log(data);
                    // console.log('获取用户信息');
					_this.totalpage = data.data.data.length;
                    _this.users = data.data.data;
					let ajaxData = data.data.data;
					ajaxData.forEach(function(val,index){
						_this.alltime.unshift(ajaxData[index].time);
						_this.dayactive.unshift(ajaxData[index].active);
						_this.newdevice.unshift(ajaxData[index].device);
						_this.newregister.unshift(ajaxData[index].register);
						_this.ajaxrate.unshift(ajaxData[index].rate);
						_this.ajaxact.unshift(ajaxData[index].act);
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
	                    data: ['日活', '新增设备', '新增注册','转化率','活跃度']
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
	                    data: this.alltime
	                },
	                yAxis: [
	                     {
				            type : 'value',
				            name : '量',
				            axisLabel : {
				                formatter: '{value} .'
				            }
				        },
				        {
				            type : 'value',
				            name : '百分比',
				            axisLabel : {
				                formatter: '{value} %'
				            }
				        }
	                ],
	                series: [
	                    {
	                        name: '日活',
	                        type: 'bar',
	                        data: this.dayactive
	                    },
	                    {
	                        name: '新增设备',
	                        type: 'bar',
	                        data: this.newdevice
	                    },
	                    {
	                        name: '新增注册',
	                        type: 'bar',
	                        data: this.newregister
	                    },
						{
	                        name: '转化率',
	                        type: 'line',
							yAxisIndex: 1,
							smooth:true,
	                        data: this.ajaxrate
	                    },
						{
	                        name: '活跃度',
	                        type: 'line',
							yAxisIndex: 1,
							smooth:true,
	                        data: this.ajaxact
	                    },
	                ]
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
