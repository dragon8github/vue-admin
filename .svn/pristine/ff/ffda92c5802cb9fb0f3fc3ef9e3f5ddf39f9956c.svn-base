import is from 'is-js'
//设置本地址存储
export const setLocalStorage = (name,value) => {
    if(!name || !value){
        console.log('params is invalid!')
    }
    if(is.object(value)){
        value = JSON.stringify(value)
    }
    localStorage.setItem(name,value)
}
//取本地存储
export const getLocalStorage = (name) => {
    if(!name){
        console.log('param is empty!')
    }
    return localStorage.getItem(name)
}
//删除本地存储
export const delLocalStorage = (name) => {
    if(!name){
        console.log('param is empty!')
    }
    localStorage.removeItem(name)
}
//循环菜单取子菜单的title
export const getSubMenuArr = (menu,curPathName) => {
    let openedSubMenu = []
    if(!is.array(menu) || !curPathName){
        console.log('params is error!')
    }
    for(let i = 0; i < menu.length; i++){
        let item = menu[i];
        if(item.children && item.children.length > 0){
            item.children.forEach((ele,index) => {
                if(ele.name == curPathName){
                    openedSubMenu.push(item.title)
                }
            });
            getSubMenuArr(item.children,curPathName)
        }
    }
    return openedSubMenu
}
//数组当中是否存在某个对象
export const oneOf = (ele, targetArr) => {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
}