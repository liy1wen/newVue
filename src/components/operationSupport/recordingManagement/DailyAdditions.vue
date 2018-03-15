<template>
    <!-- 每日新增录音明细 -->
    <!-- dom结构内容 -->
	<section>
        <!-- 工具条/头部的搜索条件搜索 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<div class="block">
						<span class="registerTime">日期</span>
						<el-date-picker
						v-model="formOne.startDate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item>
					<span>录音状态</span>
					<el-select style="width: 100px;" v-model="recordStatus">
						<el-option label="全部" value="0"></el-option>
						<el-option label="未推荐" value="1"></el-option>
						<el-option label="已推荐" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span>录音形式</span>
					<el-select style="width: 100px;" v-model="recordStyle">
						<el-option label="全部" value="0"></el-option>
						<el-option label="付费" value="1"></el-option>
						<el-option label="免费" value="2"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item>
					<span>uid</span>
					<el-input
                    style="width:100px;"
                    placeholder="请输入内容"
                    v-model="value10"
                    clearable>
                    </el-input>
				</el-form-item>
                <el-form-item>
					<span>录音id</span>
					<el-input
                    style="width: 100px;"
                    placeholder="请输入内容"
                    v-model="value10"
                    clearable>
                    </el-input>
				</el-form-item>
                <el-form-item class="search-span" style="float:right;">
					<el-button id="searchBtn" type="primary" >查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 用户的数据展示列表 -->
		<template>
			<el-table :data="listData" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
				<el-table-column prop="time" label="发布时间" width="180"></el-table-column>
				<el-table-column prop="call_record_id"  label="录音编码" width="100"></el-table-column>
				<el-table-column label="录音音频" width="300">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<audio controls :src="scope.row.voice_url"></audio>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="release_num" label="发布次数"  min-width="50" ></el-table-column>
				<el-table-column prop="adoption_num" label="被采纳次数" min-width="50" ></el-table-column>
				<el-table-column prop="recommend" label="再推荐次数" min-width="50" ></el-table-column>
				<el-table-column prop="duration" label="录音时长" min-width="50" ></el-table-column>
				<el-table-column prop="uid" label="发布者uid"></el-table-column>
				<el-table-column prop="content" label="录音描述"></el-table-column>
				<el-table-column prop="price" :formatter="price" label="形式" min-width="50" sortable></el-table-column>
				<el-table-column prop="listen" label="播放次数" width="50"></el-table-column>
				<el-table-column prop="praise" label="点赞数" width="50"></el-table-column>
				<el-table-column prop="relay" label="转播数" width="50"></el-table-column>
				<el-table-column prop="award" label="打赏数" width="50"></el-table-column>
				<el-table-column prop="share" label="分享数" width="50"></el-table-column>
				<el-table-column prop="complain" label="举报数" width="50"></el-table-column>
				<!-- <el-table-column label="bianji" min-width="100">
					<template slot-scope="scope">
						<el-button type="primary" @click.native.prevent="changeOneUserData(scope.$index, formOne.TabData, '1')" size="small">编辑</el-button>								
						<el-button v-if="scope.row.status=='0'" type="primary" plain size="small" @click.native.prevent="tipUndercarriage()">下架</el-button>
						<el-button v-else type="primary" @click.native.prevent="undercarriage(scope.$index, formOne.TabData, '1')" size="small">下架</el-button>
					</template>
				</el-table-column> -->
				<el-table-column label="操作" min-width="190">
					<template slot-scope="scope">
						<el-col :span="5"><el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">推荐</el-button></el-col>
						<el-col :span="5"><el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button></el-col>
						<el-col :span="6"><el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">审核</el-button></el-col>
						<el-col :span="8"><el-button style="margin-right:10px;" size="mini" type="info" @click="handleDelete(scope.$index, scope.row)">对方信息</el-button></el-col>
					</template>
				</el-table-column>
			</el-table>
		</template>
    </section>
</template>

<script>
	import { allget } from '../../../api/api';
	import axios from 'axios';
    export default {
        data() {
            return {
				tableHeight: '', // table展示的页面的高度多少，第二页中对应高度
                formOne: {
                    startDate: [new Date()-10*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
                    endDate: [new Date()-180*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
                },
				value6: '',
				value10: 'text',
				recordStatus: '',
				recordStyle: '',
				page: 0,
				totalpage: '',
				listData: [],
            }
        },
		methods: {
			// 时间格式化
			YMDdata(data){
				let date = new Date(data);
				let yy = date.getFullYear();
				let mm = (date.getMonth() + 1).toString();
				let dd = (date.getDate()).toString();
				// let time = date.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
				mm<10?mm="0"+mm:mm;
				dd<10?dd="0"+dd:dd;
				return yy+'-'+mm+'-'+dd
			},
			// 获取数据
			getData() {
				let url = '/Voice/getVoiceListInfo?page=1&date_s=2017-09-14&date_e=2018-03-16';
				let param ={
					page: this.page,
				}
				allget(param, url).then(res => {
					this.listData = res.data.data;
					console.log(this.listData)
				}).catch(err => {
					console.log(err)
				})
				// axios.get('https://manage.dianliaoapp.com/ydlManage/server/index.php/Voice/getVoiceListInfo?page=0&date_s=2018-03-14&date_e=2018-03-16')
				// .then(res=>{
				// 	this.listData = res.data.data;
				// })
				// .catch(err=>{
				// 	console.log(err)
				// })
			},
			// 录音形式
			price(row){
				return row.price > 0 ? "付费" : "免费";
			},
			// 编辑
			handleEdit() {
				console.log('编辑')
			},
			// 删除
			handleDelete() {
				console.log('删除')
			}
		},
		mounted() {
			var _this = this;
			console.log(this.value6);
			_this.tableHeight = tabSearchPageHeight;
			_this.getData();
		}
    }

</script>

<style lang="css" scoped>
    .search-span{
        float: right;
    }
    #searchBtn{
        margin-right: 50px;
    }
</style>
