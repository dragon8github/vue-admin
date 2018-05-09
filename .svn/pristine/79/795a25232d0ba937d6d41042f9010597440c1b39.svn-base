<template>
    <div class="tags-outer-scroll-con">
        <div class="tags-inner-scroll-body">
            <el-tabs v-model="curTabName" type="card" @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in showTabsArray" 
                            :key="item.name"
                            :closable="item.name === '/admin/welcome' ? false : true" 
                            :label="item.title" 
                            :name="item.name">
                </el-tab-pane>
            </el-tabs>
               <!-- 路由我其实只要一个就够了 -->
               <router-view />
        </div>
        <div class="dropdown-menu">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link"> 操作 <i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="refresh">刷新当前选项卡</el-dropdown-item>
                    <el-dropdown-item command="closeCur">关闭当前选项卡</el-dropdown-item>
                    <el-dropdown-item command="closeOth">关闭其他选项卡</el-dropdown-item>
                    <el-dropdown-item divided command="closeAll">关闭所有选项卡</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PageTags",
  data() {
    return {
      curTabName: "/admin/welcome"
    };
  },
  props: {
    pageTagsList: Array
  },
  watch: {
    $route(to) {
      //记录进入的页面---并且去重
      console.log(to);
      console.log(this.showTabsArray);
      let showTabsArray = this.showTabsArray;
      let isRepeat = false;
      showTabsArray.forEach(x => {
        if (x.name == to.path) {
          //有重复
          x.curTab = 1;
          isRepeat = true;
        } else {
          x.curTab = 0;
        }
      });
      if (!isRepeat) {
        showTabsArray.push({ name: to.path, title: to.meta.title, curTab: 1 });
      }
      this.setTabsArray(showTabsArray);
    },
    //点击当前页修改相应路由
    curTabName(nVal) {
      let showTabsArray = this.showTabsArray;
      this.$router.push(nVal);
      showTabsArray.forEach((x, index) => {
        if (x.name == nVal) {
          x.curTab = 1;
        } else {
          x.curTab = 0;
        }
      });
      //存入本地缓存
      this.setTabsArray(showTabsArray);
    },
    showTabsArray(nVal) {
      nVal.forEach((x, index) => {
        if (x.curTab == 1) this.curTabName = x.name;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
        this.refreshPage();
    });
  },
  computed: {
    ...mapGetters({
      showTabsArray: "showTabsArray"
    })
  },
  methods: {
    ...mapMutations({
      setTabsArray: "SET_TABS_ARRAY"
    }),
    refreshPage() {
      this.showTabsArray.forEach((x, index) => {
        if (x.curTab == 1) this.curTabName = x.name;
      });
    },
    // 删除单个页签
    removeTab(name) {
      let showTabsArray = this.showTabsArray;
      let delIndex = -1;
      showTabsArray.forEach((x, index) => {
        if (x.name == name) {
          delIndex = index;
        }
      });
      if (delIndex >= 1 && delIndex - 1 >= 0) {
        showTabsArray[delIndex - 1].curTab = 1;
      }
      if (delIndex < 1 && delIndex + 1 < showTabsArray.length) {
        showTabsArray[delIndex + 1].curTab = 1;
      }
      showTabsArray.splice(delIndex, 1);
      this.setTabsArray(showTabsArray);
    },
    // 删除当前以外的页签
    removeOtherTabs(name) {
      let showTabsArray = this.showTabsArray;
      let newArray = [];
      showTabsArray.forEach((x, index) => {
        if (x.name == name || index == 0) {
          newArray.push(x);
        }
      });
      showTabsArray = newArray;
      this.setTabsArray(showTabsArray);
    },
    //删除所有页签
    removeAllTabs() {
      let showTabsArray = this.showTabsArray;
      let newArray = [];
      showTabsArray.forEach((x, index) => {
        if (index == 0) {
          x.curTab = 1;
          newArray.push(x);
        }
      });
      showTabsArray = newArray;
      this.setTabsArray(showTabsArray);
    },
    //操作
    handleCommand(command) {
      if (command == "refresh") {
        this.$router.push(this.curTabName);
      }
      if (command == "closeCur") {
        this.removeTab(this.curTabName);
      }
      if (command == "closeOth") {
        this.removeOtherTabs(this.curTabName);
      }
      if (command == "closeAll") {
        this.removeAllTabs();
      }
    }
  }
};
</script>

<style lang="scss">
.tags-outer-scroll-con {
  display: flex;

  .tags-inner-scroll-body {
    flex: 1;
    white-space: nowrap;
    overflow-x: auto;
    user-select: none;
    .el-tabs__header{
       margin-right: 100px;
    }
  }

  .dropdown-menu {
    width: 106px;
    line-height: 40px;
    text-align: right;
    position: absolute;
    right: 15px;
    border-bottom: 1px solid #e4e7ed;
  }
}

.el-tabs__item {
  background: #f2f2f2;
}

.el-tabs__item.is-active {
  background: #fff;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
