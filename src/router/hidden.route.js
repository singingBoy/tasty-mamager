import {lazy} from "react";

/**
 * 隐藏的页路由配置
 */
export default {
  name: '隐藏',
  path: '/hidden',
  hidden: true,
  children: [
    {
      name: '登录',
      path: '/login',
      exact: true,
      component: lazy(() => import('../pages/login/Login'))
    },
  ],
}
