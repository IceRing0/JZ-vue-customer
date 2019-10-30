<template>
  <div class="product">
    <van-sticky>
      <van-nav-bar
        title="产品分类"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-row>
      <van-sticky :offset-top="45">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item @click="changeCategory(c.id)" v-for="c in categories" :key="c.id" :title="c.name"/>
        </van-sidebar>
      </van-sticky>
      <div style="float: left;margin-left:100px;position: relative;bottom:400px;right:10px;width:75%;">
        <van-card
          v-for="(p) in products"
          :key="p.id"
          :price="p.price"
          :desc="p.description"  
          :title="p.name"
          :thumb="p.photo"
        >
        <div slot="footer" style="11">
          <van-stepper v-model="value" />
        </div>
        </van-card>
      </div>
    </van-row>
    <van-submit-bar
      :price="0"
      button-text="提交订单"
      @submit="onSubmit"
    />

    
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      title:"",
      activeKey:0,
      value:0
    }
  },
  watch:{
    products:{
      handler:function(newVal){
        console.log("===")
      },
      deep:true
    }
  },
  created(){
    this.initData();
    this.findAllCategories();
  
  },
  computed:{
    ...mapState("category",["categories"]),
    ...mapState("product",["products"]),
  },
  methods: {
    ...mapActions("category",["findAllCategories"]),
    ...mapActions("product",["findProductByCategoryId"]),
    onSubmit(){

    },
    add(key){
      if(this.products[key].num==null){
        this.products[key].num = 1
      }else{
        this.products[key].num += 1;
      }
      console.log(this.products[key].num)
    },
    initData(){
      this.activeKey = this.$route.query.index
      this.findProductByCategoryId(this.$route.query.category.id)
      // this.title = this.$route.query.category.id
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    changeCategory(id){
      this.findProductByCategoryId(id)
    }
  }
}
</script>
<style>
</style>