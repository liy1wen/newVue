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
						<el-date-picker  type="daterange" range-separator=" - " placeholder="选择日期范围"></el-date-picker>
					</div>
				</el-form-item>
				<el-form-item>
					<span>录音状态</span>
					<el-select style="width: 100px;">
						<el-option label="全部" value="0"></el-option>
						<el-option label="未推荐" value="1"></el-option>
						<el-option label="已推荐" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span>录音形式</span>
					<el-select style="width: 100px;">
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
                    v-model="input10"
                    clearable>
                    </el-input>
				</el-form-item>
                <el-form-item>
					<span>录音id</span>
					<el-input
                    style="width: 100px;"
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
                    </el-input>
				</el-form-item>
                <el-form-item class="search-span" style="float:right;">
					<el-button id="searchBtn" type="primary" >查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                formOne: {
                    choiceDate: [new Date()-180*24*60*60*1000, new Date()], // 对应选择的日期,给默认时间180之前到现在
                }
            }
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
