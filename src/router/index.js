import analyse from './analyse.route';
import product from './product.route';

const routes = [
  analyse,
  product,
];

export default routes;

export function getAllRoutes(allRoutes = []) {
  function getChildRoutes(list, children) {
    children.forEach(d => {
      list.push(d);
      if (d.children && d.children.length) {
        getChildRoutes(list, d.children);
      }
    })
  }
  routes.forEach(column => {
    const {children = []} = column;
    getChildRoutes(allRoutes, children);
  });
  return allRoutes;
}

export function getCurrentRoutes(location) {
  const {pathname, current = []} = location;
  function getCurrentChildRoute(currentRoutes = [], child, parent) {
    for(let i = 0; i < child.length; i++) {
      const {path, children = []} = child[i];
      if (pathname === path) {
        currentRoutes.push(parent);
        currentRoutes.push(child[i]);
        break;
      } else if (children.length) {
        getCurrentChildRoute(currentRoutes, children, child[i]);
      }
    }
  }

  routes.forEach(column => {
    const {children = []} = column;
    getCurrentChildRoute(current, children, column);
  });
  return current;
}
