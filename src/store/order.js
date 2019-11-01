import {get,post_obj_array} from '../http/axios'
import moment from 'moment'
export default {
  namespaced:true,
  state:{
    orders:[]
  },
  mutations:{
    refreshOrder(state,orders){
      state.orders = orders;
    }
  },
  actions:{
    // 保存订单
    async saveOrder(context,data){
      console.log(data)
      let response = await post_obj_array("/order/save",data)
      // 清理购物车
      context.commit("shopcar/clearShopcar",null,{root:true})
      return response
    },
    // 根据顾客id查询订单
    async findOrderByCustomerId(context,id){
      let response = await get("/order/query?customerId="+id)
      // 将时间戳转化为时间
      response.data.forEach((item,index)=>{
        response.data[index].time=moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
      })
      await context.commit("refreshOrder",response.data)
      return response
    },
    // 确认订单
    async confirmOrder(context,orderId){
      let response = await get("/order/confirmOrder?orderId="+orderId)
      return response
    }
  }
}