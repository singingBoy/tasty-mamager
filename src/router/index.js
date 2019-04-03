import analyse from './analyse.route';
import product from './product.route';

export default [
  analyse,
  product,

  /*{
    path: "/home",
    component: lazy(() => import('../pages/home/Home'))
  },
  {
    path: "/login",
    component: lazy(() => import('../pages/login/Login')),
    routes: [
      {
        path: "/tacos/bus",
        component: Bus
      },
      {
        path: "/tacos/cart",
        component: Cart
      }
    ]
  }*/
];
