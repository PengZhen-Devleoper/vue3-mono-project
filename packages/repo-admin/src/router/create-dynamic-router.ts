import type { RouteRecordRaw, RouteComponent } from 'vue-router'
import { ExceptionUnFinished } from '@/components'
import { Layout, LayoutEmpty } from '@/layout'
import { arrayToTree } from 'peace-library'
import { menus } from '@/mock/menu'

const modules = import.meta.glob('../views/**/*.ts')
const menuTree = arrayToTree(menus, { id: 'id', parentId: 'parentId' })

/**
 * @description: 创建路由组件
 * @param {string} componentPath
 * @return {*}
 */
const createRouteComponent = (componentPath: string): RouteComponent => {
  if (componentPath) {
    return modules[`../${componentPath}`] || ExceptionUnFinished
  } else {
    return LayoutEmpty
  }
}

/**
 * @description: 创建路由表
 * @param {Array} menus
 * @param {any} parentMenu
 * @return {*}
 */
const createRoute = (menus: Array<any>, parentMenu?: any): Array<RouteRecordRaw> => {
  return menus.map((menu) => {
    if (Array.isArray(menu.children) && menu.children.length > 0) {
      const route: RouteRecordRaw = {
        name: menu.routeName,
        path: parentMenu ? `/${parentMenu.routePath}/${menu.routePath}` : `/${menu.routePath}`,
        component: createRouteComponent(menu.componentPath),
        meta: menu,
        children: createRoute(menu.children, menu)
      }

      return route
    } else {
      const route: RouteRecordRaw = {
        name: menu.routeName,
        path: parentMenu?.routePath ? `/${parentMenu.routePath}/${menu.routePath}` : `/${menu.routePath}`,
        meta: menu,
        component: createRouteComponent(menu.componentPath)
      }

      return route
    }
  })
}

const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    name: 'layout',
    path: '/',
    redirect: '/',
    component: Layout,
    children: createRoute(menuTree)
  }
]

export { dynamicRoutes }
