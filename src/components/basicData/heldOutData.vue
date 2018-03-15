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
                <el-select v-model="value" filterable placeholder="请选择" @change="isshow">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="sex" placeholder="请选择" :disabled="show">
                   <el-option
                     v-for="item in sexDate"
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
				<el-table-column prop="date" label="日期" width="120" sortable >
				</el-table-column>
				<el-table-column prop="regPlayer" label="注册数" width="100" sortable>
				</el-table-column>
				<el-table-column prop="rate" :formatter="rate" label="次留" width="130" sortable>
				</el-table-column>
				<el-table-column prop="rate2" :formatter="rate2" label="2日留" min-width="180" sortable>
				</el-table-column>
                <el-table-column prop="rate3" :formatter="rate3" label="3日留" min-width="120" sortable>
				</el-table-column>
                <el-table-column prop="rate15" :formatter="rate15" label="15日留" min-width="100" sortable>
				</el-table-column>
                <el-table-column prop="rate30" :formatter="rate30" label="30日留" min-width="150" sortable>
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
                show:false,
				star:"0",
				end:'20',
			    users:[],
				chartLine: null,
				totalpage:null,
				page: 2,
				listLoading: false,
                time_value:[new Date()-7*24*60*60*1000,new Date()],
                options:[],
                sexDate:[
                    {
                        value: '0',
                        label: '选择性别'
                    },
                    {
                        value: '1',
                        label: '男'
                    },
                    {
                        value: '2',
                        label: '女'
                    }
                ],
                value:"",
                sex:"0",
				sels: [],//列表选中列

			}
		},
		computed:{
			pageTw:function(){
				return this.users.slice(this.star,this.end)
			}
		},
		methods: {
            //改变性别状态
            isshow:function(){
                if(this.value!=''){
                    this.show = true;
                    this.sex = '0';
                }else {
                    this.show = false;
                }
            },
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
                let url = '/Base/getRetPlayer';
                let data ={
                    date_s:this.YMDdata(this.time_value[0]),
                    date_e:this.YMDdata(this.time_value[1]),
                }
                if(this.value!=''){
                    data.channel = this.value;
                    data.sex = undefined;
                }else {
                    data.channel = undefined;
                }
                if(this.sex!=0){
                    data.sex = this.sex;
                    data.channel = undefined;
                }else {
                    data.sex = undefined;
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
  	            const tHeader = ['日期','注册数','次留','2日留','3日留','7日留','15日留','30日留'];
  	            const filterVal = ['date','regPlayer','rate','rate2','rate3','rate7','rate15','rate30'];
  	            const data = this.formatJson(filterVal, this.users);
  	            export_json_to_excel(tHeader, data, '留存数据');
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
                    label:'选择或者输入渠道'
                })
                channelid.forEach(function(val,index){
                    _this.options.push({
                        value:channelid[index],
                        label:channelname[index]
                    })
                })
            },
			// 过滤器
			rate:function(row, column){
                return (row.rate*100).toFixed(2)+"%";
			},
            rate2:function(row, column){
                return (row.rate2*100).toFixed(2)+"%";
			},
            rate3:function(row, column){
                return (row.rate3*100).toFixed(2)+"%";
			},
            rate7:function(row, column){
                return (row.rate7*100).toFixed(2)+"%";
			},
            rate15:function(row, column){
                return (row.rate15*100).toFixed(2)+"%";
			},
            rate30:function(row, column){
                return (row.rate30*100).toFixed(2)+"%";
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
    .hide {display: none !important;}
</style>
