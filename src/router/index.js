import Vue from 'vue'
import VueRouter  from 'vue-router'
import Hello from '@/components/Hello'
import About from '@/components/About'
import Coins from '@/components/Coins.vue'
import Player from '@/components/Players.vue'

import Test from  '@/components/Logins.vue'
import UtilityResource   from "../services/utilityService"

Vue.use(VueRouter)

const router =new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/coins/:id',
      name: 'Coins',
      component: Coins
    },
    {
      path: '/players',
      name: 'Players',
      component: Player
    },
    {
      path: '/logins',
      name: 'Logins',
      component: Test
    },
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.path !== '/logins')
  {
    let isAuthenticated = UtilityResource.CheckLoggedInUser();
    console.log("wef");
    if (!isAuthenticated)
    {
      next('/logins')
    } 
    else
    {
      next()
    } 
  }
  else
    {
      next()
    }
})

export default router;