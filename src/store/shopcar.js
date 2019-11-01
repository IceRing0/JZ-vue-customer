import _ from 'lodash'
export default {
  namespaced:true,
  state:{
    orderLines:[]
  },
  getters:{
    total(state){
      let total= 0
      state.orderLines.forEach((item)=>{
        total += item.number*item.price
      })
      return total
    }
  },
  mutations:{
    // 清空购物车
    clearShopcar(state){
      state.orderLines = []
    },
    // 添加购物车
    addShopcar(state,orderLine){
      let flag = state.orderLines.some(item=>item.productId===orderLine.productId)
      if(flag){
        state.orderLines.forEach((item,index)=>{
          if(item.productId===orderLine.productId){
            item.number = orderLine.number
          }
        })
      }else{
        state.orderLines.push(orderLine)
      }
      _.remove(state.orderLines,function(item){
        return item.number === 0    
      })
    }
  },
}