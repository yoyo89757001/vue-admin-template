import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '主页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/pepole',
    component: Layout,
   //  redirect: '/example/table',
     name: '人员管理',
     meta: { title: '人员管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/table',
        name: '员工',
        component: () => import('@/views/table/index'),
        meta: { title: '员工', icon: 'table' }
      },
      {
        path: '/tree',
        name: '访客',
        component: () => import('@/views/tree/index'),
        meta: { title: '访客', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: '/form',
        name: '设备配置',
        component: () => import('@/views/form/index'),
        meta: { title: '设备配置', icon: 'form' }
      }
    ]
  },

  {
    path: '/pepoleinfo',
    component: Layout,
    hidden:true,
    children: [
      {
        path: '/pepoleinfo',
        name: '新增人员',
        component: () => import('@/views/pepoleinfo/index'),
        meta: { title: '新增人员' }
      }
    ]
  },
  {
    path: '/pepoleinfo_visitors',
    component: Layout,
    hidden:true,
    children: [
      {
        path: '/pepoleinfo_visitors',
        name: '访客详情',
        component: () => import('@/views/pepoleinfo_visitors/index'),
        meta: { title: '访客详情' }
      }
    ]
  },
  {
    path: '/pepoleinfo_employee',
    component: Layout,
    hidden:true,
    children: [
      {
        path: '/pepoleinfo_employee',
        name: '员工详情',
        component: () => import('@/views/pepoleinfo_employee/index'),
        meta: { title: '员工详情' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    //redirect: '/nested/menu1',
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/index'), // Parent router-view
        name: '关于我们',
        meta: {title: '关于我们', icon: 'nested'}
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.inteyeligence.com',
        meta: { title: '公司官网', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
