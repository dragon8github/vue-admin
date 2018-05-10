<template>
    <div class="login-wrap">
        <div class="login-con">
            <p slot="title" class="title">欢迎登录</p>
            <div class="form-con" @keyup.enter="handleSubmit">
                <el-form ref="loginForm" :model="loginForm" :rules="loginFormRule">
                    <el-form-item prop="username">
                        <el-input type="text" placeholder="请输入用户名" suffix-icon="el-icon-date" v-model="loginForm.username"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" suffix-icon="el-icon-date" v-model="loginForm.password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
                <p class="login-tip">输入任意用户名和密码即可</p>
            </div> 
        </div>
    </div>
</template>


<script>
import { mapMutations } from 'vuex'

var data = {
    user:{
        avtar: 'https: //www.baidu.com/img/bd_logo1.png',
        username: 'admin',
        nick: 'test'
    },
    routes: [{
        title: '资产管理',
        icon: 'fa-car',
        children: [{
            name: 'carLoanManagement',
            icon: 'fa-credit-card',
            title: '车易贷管理'
        }]
    }],
    status: 200,
    message: '登录成功'
}

export default {
    data () {
        return {
            loginForm: {
                username: '',
                password: '',
            },
            loginFormRule: {
                username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        }
    },
    methods: {
        ...mapMutations([
            'SET_MENU',
            'SET_USERINFO'
        ]),
        handleSubmit () {
            this.$refs['loginForm'].validate(valid => {
                if (valid) {
                    this.SET_MENU(data.routes)
                    this.SET_USERINFO(data.user)

                    this.$http.post('/uaa/auth/login', {
                        "userName": this.loginForm.username,
                        "password": this.loginForm.password
                    }).then(result => {
                        // console.log(result);
                        // this.$message.success('Success!')
                        // this.$router.push({name: "welcome"})
                    }).catch(err => {
                        this.$message.error('接口异常：' + err.message);
                    })
                } else {
                    this.$message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>


<style lang="scss" scoped>
.login-wrap {
    background: url('~@assets/login_bg.png') no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100%;
    color: #fff;

    .login-con {
        position: absolute;
        right: 160px;
        top: 50%;
        padding: 40px;
        transform: translateY(-60%);
        width: 300px;
        background: rgba(0,0,0,0.5);

        .title {
            margin-bottom: 20px;
        }
    }

    .form-con {
        padding: 10px 0 0;
    }

    .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
    }
}
</style>