<template>
<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>

    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    
    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
</el-form>
</template>

<script>
import { allget } from '../../api/api'
import store from '../../vuex/store';
import router from '../../router';

export default {
    data() {
        return {
            logining: false,
            ruleForm2: {
                account: 'fll',
                checkPass: '123456'
            },
            rules2: {
                account: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass }
                ],
                checkPass: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass2 }
                ]
            },
            checked: true
        };
    },
    
    methods: {
        //   handleReset2() {
        //     this.$refs.ruleForm2.resetFields();
        //   },
        handleSubmit2(ev) {
            let _this = this;
            this.logining = true;
            this.$refs.ruleForm2.validate(valid => {
            if (valid) {
                let loginParams = {
                    username: this.ruleForm2.account,
                    password: this.ruleForm2.checkPass,
                };
                if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user信息
                    store.dispatch('GetInfo',loginParams).then(res => { // 拉取user
                    // console.log(res);
                        if(res.data.ret){
                            const roles = ['admin'];
                            // const ajaxrouter = res.data.data;
                            //   console.log(roles);
                            store.dispatch('GenerateRoutes', {
                                roles
                            }).then(() => { // 生成可访问的路由表
                                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                                
                            })
                            sessionStorage.setItem('user', JSON.stringify(loginParams));
                            // console.log(loginParams);
                            this.$router.push({
                                path: '/hello'
                            });
                            this.logining = false;
                        }else {
                            this.$notify.error({
                                title: '错误',
                                message: res.data.msg,
                                duration: 1000,
                                offset: 100
                            });
                            this.logining = false;
                        }
                    }).catch(err => {
                        this.logining = false;
                        // console.log(err);
                    });
                }
            } else {
                this.logining = false;
                console.log('error submit!!');
                return false;
            }
          });
            
        },
    }
}
</script>

<style lang="css" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    /* position: absolute;
    top: 40%;
    left: 45%;
    margin-left: -175px; */
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
     margin: 180px auto; 
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
</style>
