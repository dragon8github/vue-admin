<template>
    <el-container class="hongte-main-container">
        <!-- 左侧边栏 -->
        <el-aside :width="'230px'">
            <!-- LOGO -->
            <div class="logo">信贷中心管理系统</div>

            <!-- 用户信息 -->
            <figure class="honte-user is-clear" v-if="userInfo.username">
                <div class="honte-user__head is-left">
                    <img class="is-circle" :src="userInfo.avtar"/>
                </div>
                <div class="honte-user__info is-left">
                    <h1 class="honte-user__name">{{ userInfo.username }}</h1>
                    <p class="honte-user__occupation">{{ userInfo.power }}</p>
                </div>         
            </figure>

            <!-- 搜索框 -->
            <div class="search" :style="userInfo.username ? 'margin-top: 10px' : 'margin-top: 30px'">
                <input type="text" class="search__input" placeholder="Search...">
                <i class="fa fa-search"></i>
            </div>

            <!-- 业务列表 -->
            <nav-bar :navList="menuList"></nav-bar>
        </el-aside>

        <!-- 右侧边栏 -->
        <el-container>
            <!-- 头部 -->
            <el-header :height="'50px'"><v-header></v-header></el-header>
            <!-- 主体 -->
            <el-main>
                <!-- 内容页 -->
                <page-tags></page-tags>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
import vHeader from '@main-components/Header'
import vFooter from '@main-components/Footer'
import NavBar from '@main-components/NavBar'
import PageTags from '@main-components/TagsPage'
import { mapGetters, mapMutations } from 'vuex'

var mock = {
    user:{
        avtar: 'https://github.com/dragon8github/ahk/blob/master/avtar.jpg?raw=true',
        username: '李钊鸿',
        power: '系统管理员'
    },
    routes: [{
        title: '资产管理',
        icon: 'fa-car',
        children: [{
            name: 'carLoanManagement',
            icon: 'fa-credit-card',
            title: '车易贷管理'
        }]
    }]
}

export default {
    data () {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'menuList',
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_MENU',
            'SET_USERINFO'
        ]),
    },
    components:{
        vHeader,
        vFooter,
        NavBar,
        PageTags
    },
    beforeMount () {
        // 每次进入后台，我都判断一下token是否存在，如果存在的话刷新token，否则跳转到登录页（稍后封装一下）
        if (this.$cookie.get('refreshToken')) {
            this.$cookie.set('token',  this.$cookie.get('token'), { expires: '28m' });
            this.$cookie.set('refreshToken', this.$cookie.get('refreshToken'), { expires: '30m' });            
        } else {
            this.$message.error('登录超时，请重新登录。');
            return this.$router.push('/login')
        }

        // 获取菜单列表
        this.$http.get('/uc/auth/loadMenu').then(result => {
            this.SET_MENU(mock.routes)
            this.SET_USERINFO(mock.user)
        }).catch(err => {
            this.$message.error('接口异常：' + err.message);
        })
    }
}
</script>

<style lang="scss" scoped>
.hongte-main-container {
    height: 100vh;

    .logo {
        background-color: #17B3A3;
        text-align: center;
        font-size: 18px;
        color: #ffffff;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
    }

    .el-header {
        background-color: #fdfdfd;
        text-align: center;
        line-height: 50px;
        box-shadow: 0 2px 4px rgba(0,0,0,.08);
    }

    .el-aside {
        background-color: #222d32;
        transition:width 0.3s;
    }
}

.honte-user {
    padding: 20px 10px 10px;

    .honte-user__head img {
        width: 45px;
        height: 45px;
    }

    .honte-user__info {
        padding: 5px 5px 5px 15px;
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .honte-user__name {
        margin-bottom: 9px;
        color: #fff;
        font-size: 16px;
    }

    .honte-user__occupation {
        color: #A7A9AC;
        font-size: 14px;
    }
}

.search {
    position: relative;
    margin: 10px 10px 25px;

    .search__input {
        background-color: #374850;
        color: #666;
        border-radius: 3px;
        height: 35px;
        border: 0;
        padding: 6px 12px;
        width: 100%;

        &:focus {
            background-color: #fff;
        }
    }

    .fa-search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        color: #999;
    }
}
</style>