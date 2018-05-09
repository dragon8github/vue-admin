import * as types from '../type'
import * as Utils from '../../utils/jsutil'

const user = {
    state:{
        userInfo:{},
    },
    getters:{
        userInfo: state =>  state.userInfo
    },
    mutations:{
        [types.SET_USERINFO] ( state , userInfo ) {
            Utils.setLocalStorage('userInfo',userInfo)
            state.userInfo = Utils.getLocalStorage('userInfo')
        }
    },
    actions:{

    }
}
export default user