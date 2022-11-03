import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import WelCome from '@/components/WelCome'
import User from '@/components/user/User'
import Admin from '@/components/user/Admin'
import GoodsType from '@/components/goods/GoodsType'
import Goods from '@/components/goods/Goods'
import Order from '@/components/order/Order'
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
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next('/login');
  next()
})

export default router
