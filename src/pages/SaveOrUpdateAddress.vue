<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="编辑地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-address-edit
      :area-list="areaList"
      :address-info="this.$route.query.item==null?{'name':info.name}:this.$route.query.item"
      :columns-placeholder="['请选择', '请选择', '请选择']"
      :show-delete="this.$route.query.item==null?false:true"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      address:{},
      areaList:{
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '顺义县',
          120100: '天津市',
          120200: '蓟县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          110201: '张镇',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
        }
      }
    }
  },
  computed:{
    ...mapState("user",["info"])
  },
  methods:{
    ...mapActions("address",["saveOrUpdateAddress","deleteAddressById","findAddressByCustomerId"]),
    onClickLeft(){
      this.$router.go(-1)
    },
    onSave(content){
      if(this.$route.query.item){
        this.address.id = this.$route.query.item.id
      }
      this.address.province = content.province
      this.address.city = content.city
      this.address.area = content.county
      this.address.address = content.addressDetail
      this.address.telephone = content.tel
      this.address.customerId = this.info.id
      this.saveOrUpdateAddress(this.address)
      .then((response)=>{
        this.findAddressByCustomerId(this.info.id)
        this.$toast({ message: response.statusText,duration: 700 })
        this.$router.go(-1)
      })
    },
    onDelete(){
      this.deleteAddressById(this.$route.query.item.id)
      .then((response)=>{
        this.findAddressByCustomerId(this.info.id)
        this.$toast({ message: response.statusText,duration: 700 })
        this.$router.go(-1)
      })
    }
  }
}
</script>