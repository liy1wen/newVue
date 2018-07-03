<template>
	<!-- 道具列表 -->
	<!-- dom结构内容 -->
	<section>
		<!--用户的数据展示列表-->
		<template>
			<el-table ref="tableHeight" :data="onePageTabData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
				<el-table-column prop="id" label="道具ID" ></el-table-column>
				<!-- <el-table-column prop="type" label="道具类型" sortable >
                    <template slot-scope="scope">
                        <p v-if="scope.row.type==0">直接使用</p>
                        <p v-else-if="scope.row.type==1">开门卡</p>
                        <p v-else-if="scope.row.type==2">经验值卡</p>
                        <p v-else-if="scope.row.type==3">偷听卡</p>
                        <p v-else-if="scope.row.type==4">告白卡</p>
                        <p v-else-if="scope.row.type==5">转盘卡</p>
                        <p v-else-if="scope.row.type==6">充值优惠卡</p>
                        <p v-else-if="scope.row.type==7">抢聊卡</p>
                        <p v-else-if="scope.row.type==8">财富卡</p>
                        <p v-else-if="scope.row.type==9">通话卡</p>
                        <p v-else-if="scope.row.type==10">经验加速卡</p>
                        <p v-else-if="scope.row.type==11">体验会员卡</p>
                    </template>
                </el-table-column> -->
				<el-table-column prop="name" label="道具名称" ></el-table-column>
				<el-table-column prop="icon" label="道具图片" width="120">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <img :src="scope.row.icon" alt="" style="width: 100px; height: auto;">
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="coming_icon" width="120" label="即将可使用道具icon" >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <img :src="scope.row.coming_icon" alt="" style="width: 100px; height: auto;">
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="lose_icon" label="失效道具icon" >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <img :src="scope.row.lose_icon" alt="" style="width: 100px; height: auto;">
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="role_value" label="作用数值" ></el-table-column>
				<el-table-column prop="role_time" label="作用时长（分）" ></el-table-column>
				<el-table-column prop="description" label="道具描述" ></el-table-column>
				<el-table-column prop="price" label="道具价格" sortable ></el-table-column>
				<el-table-column prop="status" label="上架状态" >
                    <template slot-scope="scope">
                        <p v-if="scope.row.status==0">未上架</p>
                        <p v-if="scope.row.status==1">上架</p>
                    </template>
                </el-table-column>
				<el-table-column prop="effective_time" label="有效时长（小时）" >
                    <template slot-scope="scope">
                        <p v-if="scope.row.effective_time==0">永久有效</p>
                        <p v-else>{{scope.row.effective_time}}</p>
                    </template>
                </el-table-column>
				<el-table-column prop="prop_value" label="道具卡数值" sortable ></el-table-column>
				<el-table-column prop="letter_sort" label="道具首字母" sortable ></el-table-column>
				<el-table-column prop="is_share" label="可否分享" >
                    <template slot-scope="scope">
                        <p v-if="scope.row.is_share==0">不能</p>
                        <p v-if="scope.row.is_share==1">能</p>
                    </template>
                </el-table-column>
				<el-table-column prop="is_overlay_grid" label="可否叠加" >
                    <template slot-scope="scope">
                        <p v-if="scope.row.is_overlay_grid==0">否</p>
                        <p v-if="scope.row.is_overlay_grid==1">是</p>
                    </template>
                </el-table-column>
				<el-table-column prop="is_overlay" label="可否叠加使用" >
                    <template slot-scope="scope">
                        <p v-if="scope.row.is_overlay==0">否</p>
                        <p v-if="scope.row.is_overlay==1">是</p>
                    </template>
                </el-table-column>
				<el-table-column prop="on_sale_time" label="上架时间" ></el-table-column>
				<el-table-column prop="down_sale_time" label="下架时间"></el-table-column>
				<el-table-column prop="create_time" label="添加时间" ></el-table-column>
				
				<el-table-column label="操作" width="140" fixed="right">
					<template slot-scope="scope">
						<el-button type="primary" @click="editOneUserData(scope.$index, tabData)" size="small">编辑</el-button>
						<el-button type="danger" v-if="scope.row.status == 0" @click="upDownProp(scope.$index, tabData, 1)" size="small">上架</el-button>
						<el-button type="danger" v-else-if="scope.row.status == 1" @click="upDownProp(scope.$index, tabData, 0)" size="small">下架</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev,pager,next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="totalpage" style="float:right;"></el-pagination>
			</el-col>
            <el-dialog title="道具  编辑" :visible.sync="formTwo.dialogFormVisible">
                <el-form :model="formTwo">
                    <el-form-item label="道具名称：" :label-width="formLabelWidth">
                        <el-input v-model="formTwo.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="道具描述：" :label-width="formLabelWidth">
                        <el-input v-model="formTwo.description" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="可否分享" :label-width="formLabelWidth">
                        <el-select v-model="formTwo.is_share">
                            <el-option label="不能" value="0"></el-option>
                            <el-option label="能" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="道具图片：" :label-width="formLabelWidth">
                        <img :src="formTwo.icon" style="width:100px;height:100px;">
						<input class="select_f" type="file"  @change="uploading($event, 1)">
                    </el-form-item>
                    <el-form-item label="即将可使用道具icon：" :label-width="formLabelWidth">
                        <img :src="formTwo.coming_icon" style="width:100px;height:100px;">
						<input class="select_f" type="file"  @change="uploading($event, 2)">
                    </el-form-item>
                    <el-form-item label="失效道具icon：" :label-width="formLabelWidth">
                        <img :src="formTwo.lose_icon" style="width:100px;height:100px;">
						<input class="select_f" type="file"  @change="uploading($event, 3)">
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="formTwo.dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureEditUser()">确 定</el-button>
                </div>
            </el-dialog>
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
			form: {
				tab_name: '',
				sort: '',
            },
            formTwo: {
                dialogFormVisible: false,
                id: "",
                name: "",
                description: "",
                is_share: "",
                icon: "",
                file_A: "",
                coming_icon: "",
                file_B: "",
                lose_icon: "",
                file_C: "",
            },
			listLoading: false, //动画加载时显示的动画
			tabData: [], //列表的所有数据，移除删除的功能用全部的数据进行移除
			totalpage: null, //下方工具条的总页数 
			page: 1, //现在数据展示的页数，当返回的是全部的数据时，设置默认的页面为1
			star: '0', //每一页的开始数据
			end: '20', //每一页的结束数据
			dialogFormVisible: false, // 控制dialog弹框的显示和隐藏
			formLabelWidth: '120px', // 设置dialog弹框的宽度
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
        // 得到文件 type==1 道具图片 type==2 即将可使用道具icon type==3 失效道具icon
        uploading(event, type){
            var _this = this;
            if(type == 1){
                var windowURL = window.URL || window.webkitURL;
                _this.formTwo.file_A = event.target.files[0];
                //创建图片文件的url
                _this.formTwo.icon = windowURL.createObjectURL(event.target.files[0]);
            }else if(type == 2){
                var windowURL = window.URL || window.webkitURL;
                _this.formTwo.file_B = event.target.files[0];
                //创建图片文件的url
                _this.formTwo.coming_icon = windowURL.createObjectURL(event.target.files[0]);
            }else if(type == 3){
                var windowURL = window.URL || window.webkitURL;
                _this.formTwo.file_C = event.target.files[0];
                //创建图片文件的url
                _this.formTwo.lose_icon = windowURL.createObjectURL(event.target.files[0]);
            }
        },
		// 下方页数进行翻页的页码时，返回的是全部的数据，配合onePageTabData展示需要展示当前页面的数据
		handleCurrentChange(val) {
			// val指的是当前点击是第一页
			var _this = this;
			_this.page = val;
			_this.star = (_this.page-1)*20;
			_this.end = _this.star+20;
		},
        judgeRoomShow(row){
            if(row.is_room_show == 0){
                return "否";
            }else if(row.is_room_show == 1){
                return "是";
            }
        },
        judgeStatus(row){
            if(row.status == 0){
                return "下架";
            }else if(row.status == 1){
                return "上架";
            }
        },
		// 获取数据列表
		getTableData() {
			var _this = this ;
			_this.listLoading = true;
			var url = '/NewProp/getPropList';
            allget("", url).then(res=>{
                _this.listLoading = false;
                if(res.data.ret){
                    _this.tabData = res.data.data;
                    _this.totalpage = res.data.data.length;
                }else{
                    baseConfig.errorTipMsg(_this, res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
		},
        // 编辑标签页
        editOneUserData(index, row){
            this.formTwo.id = row[index].id;
            this.formTwo.name = row[index].name;
            this.formTwo.description = row[index].description;
            this.formTwo.is_share = row[index].is_share;
            this.formTwo.icon = row[index].icon;
            this.formTwo.coming_icon = row[index].coming_icon;
            this.formTwo.lose_icon = row[index].lose_icon;
            this.formTwo.dialogFormVisible = true;
        },
        sureEditUser(){
            var _this = this;
            var url = "/NewProp/editProp";
            var formData = new FormData();
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            formData.append('id', _this.formTwo.id);
            formData.append('name', _this.formTwo.name);
            formData.append('description', _this.formTwo.description);
            formData.append('is_share', _this.formTwo.is_share);
            formData.append('icon', _this.formTwo.file_A);
            formData.append('coming_icon', _this.formTwo.file_B);
            formData.append('lose_icon', _this.formTwo.file_C);
            axios.post(baseConfig.server+baseConfig.requestUrl+url, formData, config)
                .then(res => {
                    if(res.data.ret){
                        _this.formTwo.dialogFormVisible = false;
                        baseConfig.normalTipMsg(_this, res.data.msg);
                        _this.getTableData();
                    }else{
                        baseConfig.errorTipMsg(_this, res.data.msg);
                    }
                }).catch(eror => {
                    console.log(err)
                })
        },
        // 上下架
        upDownProp(index, row, type){
            var _this = this;
            var url = '/NewProp/upDownProp';
            var param = {
                id: row[index].id,
                status: type,
            }
            allget(param, url).then(res => {
                if(res.data.ret){
                    baseConfig.successTipMsg(_this, res.data.msg);
                    _this.getTableData();
                }else{
                    baseConfig.errorTipMsg(_this, res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        },
	},
	mounted() {
		var _this = this;
		this.$nextTick(function() {
			_this.tableHeight = baseConfig.lineNumber(pageHeight);
			_this.getTableData();
		})
	}
};
</script>

<style lang="css" scoped>
</style>
