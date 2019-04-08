import {lazy} from "react";

/**
 * 统计分析路由配置
 */
export default {
  name: '统计',
  path: '/statistic',
  icon: 'fund',
  children: [
    {
      name: '用户分析',
      path: '/',
      icon: 'area-chart',
      exact: true,
      component: lazy(() => import('../pages/analyse/users_analyse/Users_Analyse'))
    },
    {
      name: '订单分析',
      path: '/orders_analyse',
      icon: 'stock',
      component: lazy(() => import('../pages/analyse/orders_analyse/Orders_Analyse'))
    },
  ],
}
