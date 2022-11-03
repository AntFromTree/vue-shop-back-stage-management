import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
<<<<<<< HEAD
import Home from '@/components/Home'
import WelCome from '@/components/WelCome'
import User from '@/components/user/User'
import Admin from '@/components/user/Admin'
import GoodsType from '@/components/goods/GoodsType'
import Goods from '@/components/goods/Goods'
import Order from '@/components/order/Order'
=======

>>>>>>> 97a76d379deaad1e160653f0adf8e5595599a099
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
<<<<<<< HEAD
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: 'welcome',
    children: [
      { path: '/welcome', component: WelCome },
      { path: '/user', component: User },
      { path: '/admin', component: Admin },
      { path: '/goodsType', component: GoodsType },
      { path: '/goods', component: Goods },
      { path: '/order', component: Order },
    ]
=======
>>>>>>> 97a76d379deaad1e160653f0adf8e5595599a099
  }
]

const router = new VueRouter({
  routes
})
<<<<<<< HEAD
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next('/login');
  next()
})
=======
>>>>>>> 97a76d379deaad1e160653f0adf8e5595599a099

export default router
