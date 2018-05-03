<template>
    <!-- 五四活动后台 -->
    <!-- dom结构内容 -->
    <section>
        <!-- 用户的数据展示列表 -->
        <template>
            <el-table :data="listData" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
                <el-table-column prop="uid" label="用户id"></el-table-column>
                <el-table-column prop="nickname" label="用户昵称"></el-table-column>
                <el-table-column prop="one" label="点赞礼物数"></el-table-column>
                <el-table-column prop="five" label="正能量礼物数"></el-table-column>
                <el-table-column prop="four" label="蛮拼的礼物数"></el-table-column>
                <el-table-column prop="two" label="佛系青年礼物数"></el-table-column>
                <el-table-column prop="three" label="上天礼物数"></el-table-column>
                <el-table-column prop="five" label="五四勋章礼物数"></el-table-column>
            </el-table>
        </template>
    </section>
</template>

<script>
import { allget, officialAllet} from "../../api/api.js";
import axios from "axios";
export default {
    data() {
        return {
            tableHeight: null, // table展示的页面的高度多少，第二页中对应高度
            formOne: {
                startDate: [new Date() - 100 * 24 * 60 * 60 * 1000, new Date()] // 对应选择的日期,给默认时间180之前到现在
            },
            listData: [],
            formLabelWidth: "120px",
            listLoading: false,
        };
    },
    methods: {
        // 获取数据
        getData() {
            var _this = this;
            let url = "/Activity/getFiveFourDataInfo";
            let param = {
            };
            officialAllet(param, url)
                .then(res => {
                    if(res.data.ret){
                        this.listData = res.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.tableHeight = searchPageHeight;
        this.getData();
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
