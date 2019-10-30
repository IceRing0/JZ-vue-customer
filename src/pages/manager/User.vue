<template>
  <div class="user">
    <van-nav-bar
      title="我的"
    />
    <div class="top-img">
      <img :src="info.avatar" alt="">
      <div>{{info.name}}</div>
    </div>
    <br>
    <div class="container">
      <div class="address" @click="addressHandler">
        <span>常用地址</span>
      </div>
      <van-divider />
      <div class="logout" @click="logoutHandler">
        <span>退出 </span>
      </div>
      <van-divider />
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  computed:{
    ...mapState("user",["info"])
  },
  methods:{
    ...mapActions("user",["logout"]),
    logoutHandler(){
      this.logout()
      .then(()=>{
        this.$router.push({name:"login"})
        this.$toast({ message: '退出成功',duration: 700 })
      })
    },
    addressHandler(){
       this.$router.push({path:"/address"})
    }

  }
}
</script>
<style scoped>
  .top-img{
    margin-top: 30px;
    text-align: center
  }
  .top-img img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .top-img div{
    margin-top: 10px;
    color: #ee0a24;
    font-weight: bold;
  }
  .container {
    padding: 0 20px;
  }
  .container span {
    padding: 0 20px;
    color: #ee0a24;
  }
</style>