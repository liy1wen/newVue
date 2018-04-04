<template>
    <!-- IM消息统计 -->
    <!-- dom结构内容 -->
    <section>
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="打招呼数据汇总" name="first">
                <!-- 打招呼数据汇总 -->
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true">
                        <el-form-item>
                            <span>性别</span>
                            <el-select style="width: 200px;" v-model="sex">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <span>UID</span>
                            <el-input style="width:100px;" placeholder="请输入内容" v-model="uid" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getTbData">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--用户的数据展示列表-->
				<template>
					<el-table ref="tableHeight" :data="listData" border fit highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
						<el-table-column prop="uid" label="uid"></el-table-column>
						<el-table-column prop="nickname" label="昵称"></el-table-column>
						<el-table-column prop="sex" :formatter="judgeSex" label="性别"></el-table-column>
						<el-table-column prop="match_people" label="匹配人数"></el-table-column>
						<el-table-column prop="read_people" label="已读人数"></el-table-column>
						<el-table-column prop="new_reply_people" label="对方回复"></el-table-column>
						<el-table-column prop="reply_people" label="自己二次回复"></el-table-column>
						<el-table-column prop="add_pond_time" label="入池时间"></el-table-column>
					</el-table>
				</template>
            </el-tab-pane>
            <el-tab-pane label="打招呼数据详情" name="second">打招呼数据详情</el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import {allget} from '../../../api/api';
export default {
    data() {
        return {
            sex: "",
            uid: "",
            listData: [],
            listLoading: false,
            tableHeight: null,
            activeName: "first",
        };
    },
    methods: {
        getTbData() {
            var _this = this;
            let url = '/User/sayHelloData';
            let param = {
                sex: this.sex,
                uid: this.uid,
            }
            allget(param, url).then(res => {
                console.log(res)
                if(res.data.ret){
                    this.listData = res.data.data;
                }else{
                    baseConfig.errorTipMsg(this, res.data.msg);
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 判断男女
        judgeSex(row){
            return row.sex==1?"男":"女";
        }
    },
    mounted() {
        this.tableHeight = tabSearchHeight;
        this.getTbData();        
    }
};
</script>
<style lang="css" scoped>

</style>

