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
                <el-select v-model="value" filterable placeholder="请选择">
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
		<!--列表-->
		<template>
			<el-table :data="pageTw" border fit highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" max-height="760" >
				<el-table-column type="index" width="70" >
				</el-table-column>
				<el-table-column prop="time" label="日期" width="120" sortable >
				</el-table-column>
				<el-table-column prop="channel_id" label="渠道" width="100" sortable>
				</el-table-column>
				<el-table-column prop="device" label="新增设备数" width="130" sortable>
				</el-table-column>
				<el-table-column prop="register" label="新增注册数" min-width="180" sortable>
				</el-table-column>
                <el-table-column prop="rate" label="转化率" min-width="120" sortable>
				</el-table-column>
                <el-table-column prop="num" label="平均启动次数" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="ACCU" :formatter="time" label="平均在线时长" min-width="150" sortable>
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
import store from '../../vuex/store';
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
                options:[],
                value:"",
				sels: [],//列表选中列

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
                let value ;
                if(this.value==''){
                    value = store.getters.channelid;
                }else {
                    value = this.value;
                }
                let url = '/Base/getBaseDataByChannel';
                let data ={
                    date_s:this.YMDdata(this.time_value[0]),
                    date_e:this.YMDdata(this.time_value[1]),
                    channel:value
                }
                allget(data, url).then(data => {
                    // console.log(data);
                    // console.log('获取用户信息');
					_this.totalpage = data.data.data.length;
                    _this.users = data.data.data;
					let ajaxData = data.data.data;


                }).catch(function(err){
					console.log(err);
				});
                this.listLoading = false;
			},
			// 第二种导出方式
			handleDownload() {
	          	require.ensure([], () => {
  	            const { export_json_to_excel } = require('../vendor/Export2Excel');
  	            const tHeader = ['日期','渠道','新增设备数','新增注册数','转化率','平均启动次数','平均在线时长'];
  	            const filterVal = ['time','channel_id','device','register','rate','num','ACCU'];
  	            const data = this.formatJson(filterVal, this.users);
  	            export_json_to_excel(tHeader, data, '分渠道数据');
  	          })
	        },
			// 导出的一部分
			formatJson(filterVal, jsonData) {
	          	return jsonData.map(v => filterVal.map(j => {
  	            if (j === 'timestamp') {
  	              return parseTime(v[j])
  	            } else {
  	              return v[j]
  	            }
  	          }))
		    },
            // 渠道数组
            arrychannel:function(){
                let _this = this;
                let channelid = store.getters.channelid.split(',');
                let channelname = store.getters.channelname.split(',');
				_this.options.push({
                    value:'',
                    label:'可以输入搜索'
                })
                channelid.forEach(function(val,index){
                    _this.options.push({
                        value:channelid[index],
                        label:channelname[index]
                    })
                })
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

		},
		mounted() {
            this.$nextTick(function(){
				this.getUser();
                this.arrychannel();
            })
		}
	};

</script>

<style scoped>

</style>
