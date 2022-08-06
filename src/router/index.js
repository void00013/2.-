import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index/Index.vue'
import Login from '../views/login/Login.vue'
import Find from '../views/index/Find/Find.vue'
import SongDetail from '../views/index/songDetail/SongDetail.vue'
import SearchList from '../views/index/SearchList/SearchList.vue'
import UserCenter from '../views/UserCenter/UserCenter.vue'

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/login', component: Login },
  {
    path: '/index',
    redirect: '/index/find',
    component: Index,
    children: [
      { path: 'find', component: Find },
      { path: 'songdetail/:id', component: SongDetail, props: true },
      { path: 'searchlist/:ipt', component: SearchList, props: true },
    ]
  },
  {
    path: '/usercenter',
    component: UserCenter
  },
]

const router = createRouter({
  // 指定工作模式
  history: createWebHashHistory(),
  // 指定路由规则
  routes
})

export default router
