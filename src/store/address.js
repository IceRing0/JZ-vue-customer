import {get, post} from '../http/axios'
export default {
  namespaced:true,
  state:{
    addresses:[]
  },
  mutations:{
    refreshAddress(state,addresses){
      state.addresses = addresses;
    }
  },
  actions:{
    // 查找
    async findAddressByCustomerId(context,id){
      let response = await get("/address/findByCustomerId?id="+id)
      context.commit("refreshAddress",response.data)
      return response;
    },
    // 保存或更新
    async saveOrUpdateAddress({dispatch},address){
      // 添加
      let response = await post("/address/saveOrUpdate",address)
      // 刷新
      // dispatch("findAddressByCustomerId")
      // 返回
      return response
    },
    // 删除
    async deleteAddressById({dispatch},id){
      // 删除
      let response = await get("/address/deleteById?id="+id)
      // 刷新
      // dispatch("findAddressByCustomerId")
      // 返回
      return response
    }
  }
}