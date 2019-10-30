import {get, post_json,post} from '../http/axios'
import {setToken,getToken,removeToken} from '../utils/auth'
export default {
  namespaced:true,
  state:{
    token:getToken(),
    info:{}
  },
  mutations:{
    refreshInfo(state,info){
      state.info = info
    },
    refreshToken(state,token){
      state.token = token
    }
  },
  actions:{
    async login(context,customer){
      let response = await post_json("/user/login",customer)
      let token = response.data.token
      setToken(token)
      context.commit("refreshToken",token)
      // context.dispatch("info",token)
    },
    async getInfo(context,token){
      let response = await get("/user/info",{token})
      context.commit("refreshInfo",response.data)
    },
    async logout(context){
      // 请求后台退出
      await post("/user/logout")
      // 清理本地缓存
      removeToken();
      // 清理token
      await context.commit("refreshToken","")
      await context.commit("refreshInfo",{})
    }
  }
}