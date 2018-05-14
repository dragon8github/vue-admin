<template>
  <div class="layout-main-header">
    <div class="lm-item"> <el-badge :value="3" class="item"> <i class="fa fa-envelope-o"></i> </el-badge> </div>
    <div class="lm-item"><i class="fa fa-key fa-fw"></i> 修改密码</div> 
    <div class="lm-item" @click="signOut"><i class="fa fa-power-off"></i> 退出登录</div></div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      signOut () {
        this.$cookie.delete('token');
        this.$cookie.delete('refreshToken');
        this.$router.push('/login')
      }
    },
    beforeMount () {

    }
  }
</script>

<style lang='scss'>
  .layout-main-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size:16px;
  }

  .lm-item {
      margin: auto 15px;
      cursor: pointer;
      color: #606266;

      .el-badge__content.is-fixed {
        top: 30%;
      }
  }

</style>
