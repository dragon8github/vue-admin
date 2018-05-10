import * as types from '../type'
import * as utils from '../../utils/jsutil'

const app = {
    state: {
        menuList:  JSON.parse(utils.getLocalStorage('menu')) || [],
        showTabsArray: JSON.parse(utils.getLocalStorage('showTabsArray')) || [{name: '/admin/welcome',title: '欢迎页',curTab: 1}],
        openedSubmenuArr: [],
        pageOpenedList: [{
            name: 'system_manage',
            title: '系统管理',
            icon: 'ios-gear',
        }]
    },
    getters: {
        menuList:  state => state.menuList,
        showTabsArray:  state => state.showTabsArray,
        openedSubmenuArr:  state => state.openedSubmenuArr,
        shrink:  state => state.shrink
    },
    actions: {
        
    },
    mutations: {
        // 设置菜单
        [types.SET_MENU] ( state, menu ) {
            utils.setLocalStorage('menu',menu)
            state.menuList = JSON.parse(utils.getLocalStorage('menu'))
        },

        // 设置页签
        [types.SET_TABS_ARRAY] ( state, showTabsArray ) {
            utils.setLocalStorage('showTabsArray',showTabsArray)
            state.showTabsArray = JSON.parse(utils.getLocalStorage('showTabsArray'))
        },

        // 设置展开的子菜单
        [types.ADD_OPEN_SUBMENU] (state, name ) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            const openedSubParentArr = utils.getSubMenuArr(state.menuList,name)
            if(openedSubParentArr.sort().toString() == state.openedSubmenuArr.sort().toString()){
                hasThisName = true
            }
            if(!hasThisName && !isEmpty){
                state.openedSubmenuArr = openedSubParentArr
            }
        },

        // 路由一旦变化则修改页面标签数组
        [types.OPEN_NEW_PAGE] (state, to) {
            const routerObj = to.currentPathObj
            let pageOpenedList = state.pageOpenedList;
            let len = pageOpenedList.length;
            let i = 0;
            if(i < len){
                console.log(routerObj.name)
                if(utils.oneOf(routerObj,pageOpenedList)) {
                    console.log('true')
                }else{
                    console.log('false')
                }
            }
            console.log(routerObj)
        }
       
    }
}
export default app