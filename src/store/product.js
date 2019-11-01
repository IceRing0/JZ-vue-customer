import {get,post,post_array} from '../http/axios';

export default {
  namespaced:true,
  state:{
    products:[],
  },
  getters:{
    findProductByCategoryId(state){
      return (categoryId)=>{
        return state.products.filter(p=>p.categoryId===categoryId)
      }
    }
  },
  mutations:{
    refreshProducts(state,products){
      state.products = products;
    }
  },
  actions:{
    async findAllProducts(context){
      // 1. ajax查询
      let response = await get("/product/findAll");
      response.data.forEach((item)=>{
        item.number = 0;
      })
      // 2. 将查询结果更新到state中
      context.commit("refreshProducts",response.data);
    }
  }
}