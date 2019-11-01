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
      <van-col span="6">
        <van-sticky :offset-top="45">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item @click="categoryId=c.id" v-for="c in categories" :key="c.id" :title="c.name"/>
          </van-sidebar>
        </van-sticky>
      </van-col>
      <van-col span="18">
        <div>
          <van-card
            v-for="p in findProductByCategoryId(categoryId)"
            :key="p.id"
            :price="p.price"
            :desc="p.description"  
            :title="p.name"
            :thumb="p.photo"
          >
          <div slot="footer">
            <van-stepper v-model="p.number" :key="p.id" :min="0" @change="numberChangeHandler(p)"/>
          </div>
          </van-card>
        </div>
      </van-col>
    </van-row>
    <van-submit-bar
      :price="total*100"
      button-text="提交订单"
      @submit="onSubmit"
    />

    
  </div>
</template>
<script>
import {mapState,mapActions, mapGetters,mapMutations} from 'vuex'
export default {
  data(){
    return{
      title:"",
      activeKey:0,
      categoryId:''
    }
  },
  created(){
    this.initData();
    this.findAllCategories();
  },
  computed:{
    ...mapState("category",["categories"]),
    ...mapState("product",["products"]),
    ...mapGetters("product",["findProductByCategoryId"]),
    ...mapGetters("shopcar",["total"]),
    ...mapState('shopcar',['orderLines'])
  },
  methods: {
    ...mapMutations("shopcar",["addShopcar"]),
    ...mapActions("category",["findAllCategories"]),
    ...mapActions("product",["findAllProducts"]),
    onSubmit(){
      this.$router.push({path:'/orderconfirm'})
    },
    numberChangeHandler(val){
      let {id:productId,name:productName,price,number} = val
      let orderLine = {productId,productName,price,number}
      this.addShopcar(orderLine)
    },
    initData(){
      this.activeKey = this.$route.query.index
      this.findAllProducts()
      this.categoryId = this.$route.query.category.id
    },
    onClickLeft(){
      this.$router.go(-1)
    }
    // changeCategory(id){
    //   this.findProductByCategoryId(id)
    // }
  }
}
</script>
<style>
</style>