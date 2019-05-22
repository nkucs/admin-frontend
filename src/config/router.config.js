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
        component: BlankLayout,
        meta: { title: '职工管理', icon: 'dashboard', permission: [ 'dashboard' ] },  
        children: [
          {
            path: '/list',
            name: 'stafflist',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '职工列表', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/create',
            name: 'staffcreate',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '职工新建', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/modify',
            name: 'staffmodify',
            component: () => import('@/views/staff/StaffModify'),
            meta: { title: '职工信息修改', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/info',
            name: 'staffinfo',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '职工详情', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
        ]
      },
      {
        path: '/student',
        name: 'student',
        component: BlankLayout,
        meta: { title: '学生管理', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/list',
            name: 'studentlist',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '学生列表', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/create',
            name: 'studentcreate',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '学生新建', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/modify',
            name: 'studentmodify',
            component: () => import('@/views/permission/RoleModify'),
            meta: { title: '学生信息修改', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/info',
            name: 'studentinfo',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '学生详情', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
        ]
      },
      {
        path: '/permission',
        name: 'permission',
        component: BlankLayout,
        meta: { title: '权限管理', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/list',
            name: 'rolelist',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '角色列表', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/create',
            name: 'rolecreate',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '角色新建', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/modify',
            name: 'rolemodify',
            component: () => import('@/views/permission/RoleModify'),
            meta: { title: '角色修改', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/distribution',
            name: 'roledistribution',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '角色分配', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
          {
            path: '/info',
            name: 'roleinfo',
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '角色详情', icon: 'dashboard', permission: [ 'dashboard' ] }
          },
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
