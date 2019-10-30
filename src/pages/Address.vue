<template>
  <div>
    <van-sticky>
      <van-nav-bar
          title="地址列表"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
    </van-sticky>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
        chosenAddressId:1,
        list:[]
    }
  },
  created(){
    this.findAddress();
  },
  computed:{
    ...mapState("address",["addresses"]),
    ...mapState("user",["info"])
  },
  methods:{
  ...mapActions("address",["findAddressByCustomerId"]),
    onClickLeft(){
      this.$router.go(-1)
    },
    onAdd(){
      this.$router.push("/saveorupdateaddress")
    },
    onEdit(item){
      this.$router.push({name:"saveorupdateaddress",query:{item}})
    },
    findAddress(){
      let id = this.info.id
      let name = this.info.name
      let promise = this.findAddressByCustomerId(id)
      promise.then((response)=>{
        response.data.forEach((item)=>{
          this.list.push({
            id:item.id,
            name:name,
            tel:item.telephone,
            address:item.province+" "+item.city+" "+item.area+" "+item.address
          })
        })
      })
    }
  }
}
</script>
<style scoped>
  .confirm{
    background-color: red;
    width: 100%;
    position: relative;
  }
  .confirm span{
    color: white;
    position: absolute;
    left:45%;
    top: 25%;
  }
</style>