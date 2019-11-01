<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="确认订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div style="padding:20px; font-size:14px;">
      <van-row style="margin:10px 0;">
        <van-col span="4" style="font-size:25px; padding:10px 0 0 10px;"><van-icon name="location-o" /></van-col>
        <van-col span="20">
          <div style="margin-bottom:5px;">服务地址:</div>
          <div style="color:darkgray;">{{info.name}} {{addresses[0].telephone}}</div>
          <div style="color:darkgray;">{{addresses[0].province}} {{addresses[0].city}} {{addresses[0].area}} {{addresses[0].address}}</div>
        </van-col>
      </van-row>
      <van-divider />
      <van-row  style="margin:0 0 10px 0;">
        <van-col span="4" style="font-size:25px; padding:10px 0 0 10px;"><van-icon name="orders-o" /></van-col>
        <van-col span="20">
          <div style="margin-bottom:5px;">订单详情:</div>
          <van-row v-for="ol in orderLines" :key="ol.productId">
            <van-col span="6" style="color:darkgray;">{{ol.productName}}</van-col>
            <van-col span="6" style="color:darkgray;">￥{{ol.price}} </van-col>
            <van-col span="6" style="color:darkgray;">* {{ol.number}}</van-col>
            <van-col span="6" style="color:darkgray;">￥{{ol.price*ol.number}}</van-col>
          </van-row>
          <van-divider />
          <van-row type="flex" justify="end" style="padding-top:5px;">
            <van-col span="10" style="color:darkgray;">总金额:￥{{total}}</van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-divider />
      <van-row  style="margin:10px 0;">
        <van-col span="4" style="font-size:25px; padding:10px 0 0 10px;"><van-icon name="clock-o" /></van-col>
        <van-col span="20">
          <div style="margin-bottom:5px;">服务时间:</div>
          <div style="color:darkgray;">{{newDate}}</div>
        </van-col>
      </van-row>
      <van-divider />
      <van-row  style="margin:10px 0;">
        <van-col span="4" style="font-size:25px; padding:10px 0 0 10px;"><van-icon name="balance-o" /></van-col>
        <van-col span="20">
          <div style="margin-bottom:5px;">支付方式:</div>
          <div style="color:darkgray;">第三方平台(支付宝)</div>
        </van-col>
      </van-row>
      <van-button type="danger" size="large" @click="confirmOrderHandler" style="position:absolute; bottom:0px; left:0px;">确认</van-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapActions,mapGetters } from 'vuex'
export default {
  data(){
    return {
      newDate:moment().format('YYYY-MM-DD, HH:mm:ss')
    }
  },
  created(){
    this.findAddressByCustomerId(this.info.id)
  },
  computed:{
    ...mapState("user",["info"]),
    ...mapState("shopcar",["orderLines"]),
    ...mapState("address",["addresses"]),
    ...mapGetters("shopcar",["total"])
  },
  methods:{
    ...mapActions("address",["findAddressByCustomerId"]),
    ...mapActions("order",["saveOrder"]),
    onClickLeft(){
      this.$router.go(-1)
    },
    confirmOrderHandler(){
      let customerId = this.info.id
      let addressId = this.addresses[0].id
      let orderLines = this.orderLines
      let data = {customerId,addressId,orderLines}
      console.log(data)
      this.saveOrder(data)
      .then((response)=>{
        this.$toast({ message:"确认成功",duration: 700 })
        this.$router.push({path:'/manager/order'})
      })
    }
  }
}
</script>
