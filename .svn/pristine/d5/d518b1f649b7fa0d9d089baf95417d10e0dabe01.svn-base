<template>
  <div class="hongte-nav-bar">
      <el-menu 
        router
        unique-opened
        class="el-menu-vertical-demo"
        background-color="#222D32"
        active-text-color="#fff" 
        text-color="#bbc0c6"
        :collapse="isCollapse"  
        :default-active="onRoutes">
            <nav-item v-for="(item, index) in navList" 
                      :key="index"
                      :item="item" 
                      :navIndex="String(index)"> 
            </nav-item>
      </el-menu>
  </div>
</template>

<script>
    import NavItem from './NavItem'
    export default {
        components:{
            NavItem
        },
        props:['navList', 'isCollapse'],
        computed: {
            // 首次进入页面时展开当前页面所属的菜单
            onRoutes(){
                return this.$route.name
            }
        },
    }
</script>

<style lang="scss">
.hongte-nav-bar {
  .el-menu {
    border: 0;
  }

  .el-menu-item.is-active {
      background-color: #3a404b !important;
      border-left: 3px solid #3c8dbc
  }

  .el-menu-item i, 
  .el-submenu__title i {
      margin-right: 5px;
  }
}
</style>