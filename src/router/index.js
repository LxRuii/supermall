import Vue from "vue";
import VueRouter from 'vue-router';
// 懒加载我们的文件
const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

// 1.安装插件
Vue.use(VueRouter)

// 2.1配置映射关系
const routes = [
  {// 重定向
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  // 商品详情路由,动态路由的方式：id
  {
    path: '/detail/:iid',
    component: Detail
  }
]

// 2.创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出
export default router