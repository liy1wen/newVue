<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="listLoading">登录</el-button>
</el-form>
</template>

<script>
import { allget } from '../../api/api'
import store from '../../vuex/store';
import router from '../../router';
import en_md from '../../public_js/md5.js';
export default {
    data() {
        return {
            listLoading: false,
            ruleForm: {//登录的账号、密码
                account: '',
                checkPass: ''
            },
            rules: {//验证的规则
                account: [
                    {
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    },
                ],
                checkPass: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                ],
            },
            checked: true,
        };
    },
    methods: {
        handleSubmit(ev) {//登录时的验证
            var _this = this;
            _this.listLoading = true;
            _this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    var loginParams = {
                        username: _this.ruleForm.account,
                        password: _this.ruleForm.checkPass,
                    };
                    if (store.getters.roles.length === 0) {//判断当前用户是否已拉取完user信息
                        store.dispatch('GetInfo', loginParams)//拉取user
                        .then((res) => {//res为得到请求登录接口之后的结果
                            if(res.data.ret) {
                                // 去触发生成动态权限
                                var roles = store.state.user.roles;
                                store.dispatch('GenerateRoutes', { roles })
                                .then(() => { // 生成可访问的路由表
                                    router.addRoutes(store.getters.addRouters);           
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                                // 用户保存密码在cookie中，下次直接登录
                                if(_this.checked==false) {
                                    baseConfig.setCookie('loginParams', '', 0);
                                } else if(_this.checked==true) {
                                    baseConfig.setCookie('loginParams', JSON.stringify(loginParams), 7);
                                }
                                // 完成登录操作，跳转到hello的组建
                                _this.$router.push({ path: '/hello', });
                                _this.listLoading = false;
                            } else {
                                _this.listLoading = false;
                            }
                        })
                        .catch((error) => {
                            _this.listLoading = false;
                            console.log(error);
                        });
                    }
                } else {
                    _this.listLoading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted() {
        var _this = this;
        _this.$nextTick(function() {
            if(baseConfig.getCookie('loginParams')) {
                if(JSON.parse(baseConfig.getCookie('loginParams')).username) {
                    _this.ruleForm.account = JSON.parse(baseConfig.getCookie('loginParams')).username;
                } else {}
                if(JSON.parse(baseConfig.getCookie('loginParams')).password) {
                    _this.ruleForm.checkPass = JSON.parse(baseConfig.getCookie('loginParams')).password;
                } else {}
            }
        })
    },
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
