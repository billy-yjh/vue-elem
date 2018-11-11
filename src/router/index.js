import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods.vue'
import Ratings from '../components/ratings.vue'
import Sellers from '../components/sellers.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/sellers',
      component: Sellers
    }
  ]
})
