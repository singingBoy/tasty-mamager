import {lazy} from "react";

/**
 * 商品管理路由配置
 */
export default {
  name: '商品',
  path: 'product',
  icon: 'shopping',
  children: [
    {
      name: '类目管理',
      path: '/product_classify',
      icon: 'appstore',
      component: lazy(() => import('../pages/product/product_classify/Product_Classify')),
      children: [
        {
          name: '类目详情',
          path: '/product_classify_detail',
          hidden: true,
          component: lazy(() => import('../pages/product/product_classify_detail/Product_Classify_Detail'))
        },
      ]
    },
    {
      name: '商品管理',
      path: '/product_manager',
      icon: 'shop',
      component: lazy(() => import('../pages/product/product_manager/Product_Manager')),
      children: [
        {
          name: '类目详情',
          path: '/product_detail',
          hidden: true,
          component: lazy(() => import('../pages/product/product_detail/Product_Detail'))
        },
      ]
    },
  ]
}
