<template>
    <div>
        <el-submenu v-if="item.children && item.children.length > 0" :index="navIndex"> 
            <template slot="title">
                <i class="fa" :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </template>

            <nav-item v-for="(subItem,i) in item.children" 
                      :key="navIndex+'-' + i" 
                      :navIndex="navIndex + '-' + i" 
                      :item="subItem" >
            </nav-item>
        </el-submenu>

        <el-menu-item v-else :index="item.name">
            <i class="fa" :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name: 'navItem',
        props: ['item','navIndex']
    }
</script>
