<template>
  <div class="layout">
    <router-view></router-view>
    <div>
      <van-tabbar v-model="active" @change="tabChangeHandler" active-color="#ee0a24">
        <van-tabbar-item name="/manager/home" icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item name="/manager/order" icon="orders-o">订单</van-tabbar-item>
        <van-tabbar-item name="/manager/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      active:0
    }
  },
  created(){
    if(this.token){
      //查询info
      this.getInfo(this.token)
    }else{
      this.$toast({ message:"请先登录",duration: 700 });
      // 跳转登录
      this.$router.push({path:"/"})
    }
  },
  computed:{
    ...mapState("user",["token","info"])
  },
  methods:{
    ...mapActions("user",["getInfo"]),
    tabChangeHandler(path){
      this.$router.push({path})
    }
  }
}
</script>