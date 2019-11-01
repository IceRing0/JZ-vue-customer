import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Manager from '../pages/Layout.vue'
import store from '../store'
import {getToken} from '../utils/auth'
import {Toast} from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
    beforeEnter: (to, from, next) => {
      let token = getToken();
      if(token){
        store.dispatch('user/getInfo',token)
        .then(()=>{
          next()
        })
      }else{
        Toast({ message:"请先登录",duration: 700 })
        next({path:"/"})
      }
    },
    children:[{
      path:"home",
      component:() => import('../pages/manager/Home.vue')
    },{
      path:"order",
      component:() => import('../pages/manager/Order.vue')
    },{
      path:"user",
      component:() => import('../pages/manager/User.vue')
    }]
  },
  {
    path: '/product',
    name: 'product',
    beforeEnter: (to, from, next) => {
      let token = getToken();
      if(token){
        store.dispatch('user/getInfo',token)
        .then(()=>{
          next()
        })
      }else{
        Toast({ message:"请先登录",duration: 700 })
        next({path:"/"})
      }
    },
    component: () => import('../pages/Product.vue')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../pages/Address.vue')
  },
  {
    path: '/saveorupdateaddress',
    name: 'saveorupdateaddress',
    beforeEnter: (to, from, next) => {
      let token = getToken();
      if(token){
        store.dispatch('user/getInfo',token)
        .then(()=>{
          next()
        })
      }else{
        Toast({ message:"请先登录",duration: 700 })
        next({path:"/"})
      }
    },
    component: () => import('../pages/SaveOrUpdateAddress.vue')
  },
  {
    path: '/orderconfirm',
    name: 'orderconfirm',
    beforeEnter: (to, from, next) => {
      let token = getToken();
      if(token){
        store.dispatch('user/getInfo',token)
        .then(()=>{
          next()
        })
      }else{
        Toast({ message:"请先登录",duration: 700 })
        next({path:"/"})
      }
    },
    component: () => import('../pages/OrderConfirm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
