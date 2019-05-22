// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/staff',
    children: [
      {
        path: '/staff',
        name: 'staff',
        component: PageView,
        meta: { title: '职工管理', icon: 'dashboard', permission: [ 'dashboard' ] },  
        children: [
          {
            path: '/staff/list',
            name: 'stafflist',
            component: () => import('@/views/staff/StaffList'),
            meta: { title: '职工列表', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/staff/create',
            name: 'staffcreate',
            component: () => import('@/views/staff/StaffCreation'),
            meta: { title: '职工新建', icon: 'dashboard', permission: [ 'dashboard' ] }
          }
        ]
      },
      {
        path: '/student',
        name: 'student',
        component: PageView,
        meta: { title: '学生管理', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/student/list',
            name: 'studentlist',
            component: () => import('@/views/student/StudentList'),
            meta: { title: '学生列表', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/student/create',
            name: 'studentcreate',
            component: () => import('@/views/student/StudentCreation'),
            meta: { title: '学生新建', icon: 'dashboard', permission: [ 'dashboard' ] }
          }
        ]
      },
      {
        path: '/permission',
        name: 'permission',
        component: PageView,
        meta: { title: '权限管理', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/permission/list',
            name: 'rolelist',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '角色列表', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/permission/create',
            name: 'rolecreate',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '角色新建', icon: 'dashboard', permission: [ 'dashboard' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
