<template lang="html">
    <el-row>
        <div class="welcome">
            <div class="welcome-left">
                <div class="hello-nav">欢迎回来----<span>{{nsernmae | name}}</span></div>
                <div class="time-nav el-icon-time" >{{time}} <span>{{week}}</span></div>
            </div>
        </div>
        <div class="">

        </div>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            nsernmae:"",
            time:"",
            week:"",
        }
    },
    filters:{
        name:function(name){
            if(name=='admin'){
                return '超级管理员'
            }else {
                return name + '管理员'
            }
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getStorage();
            this.newTime();
        })
    },
    methods:{
        getStorage(){
            if(sessionStorage.getItem('user')==undefined){
                console.log('没有本地信息')
            }
            try {
                // this.nsernmae = JSON.parse(sessionStorage.getItem('user').username);
                let user = JSON.parse(sessionStorage.getItem('user'));
                this.nsernmae = user.username;
                // console.log(user);
            } catch (e) {
                console.log(e);
            } finally {

            }
        },
        newTime(){
            let weekall =['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
            let time = new Date();
            let month = time.getMonth() + 1;
			let year = time.getFullYear();
			let week = time.getDay();
            let day = time.getDate();
            this.time = year+'-'+ month +'-'+day;
            this.week = weekall[week];
        }
    }
}
</script>

<style lang="css">
    .hello-nav {

        color: #fff;
        font-size: 40px;

    }
    .time-nav{

        color: #000;
        font-size: 40px;
        margin: 20px auto 0;
        display: block !important;
        color: #8492a6;
    }
    .welcome {
        height: 120px;
        margin: 12% 0 0 10%;
    }
    .welcome-left {
        width: 500px;
    }
    .welcome-right {
        width: 200px;
        
    }
</style>
