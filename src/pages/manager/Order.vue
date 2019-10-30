<template>
  <div class="order">
    <div class="top">
      <van-tabs v-model="active" @change="tabChangeHandler" class="tabs">
        <van-tab title="全部订单"></van-tab>
        <van-tab title="待服务"></van-tab>
        <van-tab title="待确认"></van-tab>
        <van-tab title="已完成"></van-tab>
      </van-tabs>
      <!-- <router-view></router-view> -->
    </div>
    <div class="container">
      <van-panel v-for="o in order" :key="o.id" :title="'订单号:'+o.id" :status="o.status">
        <div style="font-size:14px; color:darkgray; margin:10px 20px;line-height:20px;">
          <van-row><van-icon name="clock-o" style="position: relative;top:2px;right:3px;"/>时间:{{o.time}}</van-row>
          <van-row><van-icon name="gold-coin-o" style="position: relative;top:2px;right:3px;"/>金额:{{o.total}}</van-row>
          <van-row><van-icon name="location-o" style="position: relative;top:2px;right:3px;"/>地址:{{o.address.province+' '+o.address.city+' '+o.address.address}}</van-row>
        </div>
        <div slot="footer" v-show="o.status=='待确认'" style="text-align:right;">
          <van-button size="small" type="danger" @click="confirmHandler(o.id)">确认</van-button>
        </div>
      </van-panel>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      active:0,
      order:[]
    }
  },
  created(){
    this.findAllOrder()
  },
  computed:{
    ...mapState("order",["orders"]),
    ...mapState("user",["info"])
  },
  methods:{
    ...mapActions("order",["findOrderByCustomerId","confirmOrder"]),
    tabChangeHandler(){
      if(this.active == 0){
        this.order = this.orders
      }else if(this.active == 1){
        this.order = this.orders.filter((order)=>{return order.status==="待服务"})
      }else if(this.active == 2){
        this.order = this.orders.filter(o=>o.status=="待确认")
      }else if(this.active == 3){
        this.order = this.orders.filter(o=>o.status=="已完成")
      }
    },
    findAllOrder(){
      this.findOrderByCustomerId(this.info.id)
      .then(()=>{
        this.tabChangeHandler()
      })
    },
    confirmHandler(orderId){
      // 确认订单
      this.confirmOrder(orderId)
      .then((response)=>{
        // 刷新
        this.findAllOrder()
        // 提示
        this.$toast({ message:response.statusText,duration: 700 });
      })
    }
  }
}
</script>
<style>
.order{
  width: 100%;
  position: absolute;
}
.top{
  position: fixed;
  top: 200;
  right: 0;
  left:0;
  z-index: 2;
}
.container{
  margin-top: 50px;
  padding-bottom: 50px;
  
}
</style>