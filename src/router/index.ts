import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import store from '../store/index'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/index.vue'),
  },
 
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home/index.vue'),
  // }
  // {
  //   path: '/ums',
  //   name: 'ums',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home/index.vue'),
  //   children: [
  //     {
  //       path: 'admin',
  //       name: 'admin',
  //       component: () => import(/* webpackChunkName: "about" */ '../views/Admin/index.vue'),
  //     },
  //     {
  //       path: 'admin1',
  //       name: 'admin1',
  //       component: () => import(/* webpackChunkName: "about" */ '../views/Admin/index.vue'),
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {

  const token = localStorage.getItem('token')
  if (token && store.state.menus.length === 0) {
    await store.dispatch('fetchMenu')
    let newRoutes: Array<RouteRecordRaw> = store.state.menus.map(p => {
      return {
        path: "/" + p.name,
        component: () => import(/* webpackChunkName: "about" */'../views/Home/index.vue'),
        name: p.name,
        children: p.children?.map(c => {
          return {
            path: c.name,
            component: () => import(/* webpackChunkName: "about" */`../views/${c.name.slice(0, 1).toUpperCase() + c.name.slice(1)}/index.vue`),
            name: c.name,
          }
        })
      }
    })
    router.addRoute({
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home/index.vue'),
    }, )
    // router.addRoute(
    //   {
    //     path: '*',
    //     name: 'NotFound',
    //     component: () => import('../views/NotFound/index.vue')
    //   }
    // )
    newRoutes.forEach(route => {
      router.addRoute(route)
    })
    console.log(newRoutes)


    next({path: to.path})
 
  } else {
    // console.log(to)
    next()
    console.log(routes)
  }


})

export default router
