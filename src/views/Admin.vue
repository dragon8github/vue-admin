<template>
    <el-container class="hongte-main-container">
        <!-- 左侧边栏 -->
        <el-aside :width="'230px'">
            <!-- LOGO -->
            <div class="logo">信贷中心管理系统</div>

            <!-- 用户信息 -->
            <figure class="honte-user is-clear">
                <div class="honte-user__head is-left">
                    <img class="is-circle" src="~@assets/head.jpg"/>
                </div>
                <div class="honte-user__info is-left">
                    <h1 class="honte-user__name">李钊鸿</h1>
                    <p class="honte-user__occupation">系统管理员</p>
                </div>         
            </figure>

            <!-- 搜索框 -->
            <div class="search">
                <input type="text" class="search__input" placeholder="Search...">
                <i class="fa fa-search"></i>
            </div>

            <!-- 列表 -->
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
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isCollapse: false
        }
    },
    computed: {
        ...mapGetters({
            menuList: 'menuList'
        })
    },
    components:{
        vHeader,
        vFooter,
        NavBar,
        PageTags
    },
    beforeMount () {
        this.$http.get('/uc/auth/loadMenu').then(result => {
            console.log(result);
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