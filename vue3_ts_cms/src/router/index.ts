import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from "@/uitls/cache";
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

router.beforeEach((to) => {
  //判断是否携带token
  const token = localCache.getCache('LOGIN_TOKEN')
  if (to.path.startsWith('/main') && !token) {
    ElMessage.warning('请先登录!')
    return '/login'
  }
})

export default router
