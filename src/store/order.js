import {get} from '../http/axios'
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
    async findOrderByCustomerId(context,id){
      let response = await get("/order/query?customerId="+id);
      // 将时间戳转化为时间
      response.data.forEach((item,index)=>{
        response.data[index].time=moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
      })
      await context.commit("refreshOrder",response.data)
      return response
    },
    async confirmOrder(context,orderId){
      let response = await get("/order/confirmOrder?orderId="+orderId)
      return response
    }
  }
}