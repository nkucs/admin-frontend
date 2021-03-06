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
        redirect: '/staff/list',
        meta: { title: '职工管理', icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: '/staff/list',
            name: 'stafflist',
            component: () => import('@/views/staff/StaffList'),
            meta: { title: '职工列表', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/staff/creation',
            name: 'staffcreation',
            component: () => import('@/views/staff/StaffCreation'),
            meta: { title: '职工新建', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/staff/modification',
            name: 'staffmodification',
            hidden: true,
            component: () => import('@/views/staff/StaffModification'),
            meta: { title: '职工信息修改', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/staff/detail',
            name: 'staffdetail',
            hidden: true,
            component: () => import('@/views/staff/StaffDetail'),
            meta: { title: '职工详情', icon: 'dashboard', permission: ['dashboard'] }
          },
        ]
      },
      {
        path: '/student',
        name: 'student',
        component: PageView,
        redirect: '/student/list',
        meta: { title: '学生管理', icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: '/student/list',
            name: 'studentlist',
            component: () => import('@/views/student/StudentList'),
            meta: { title: '学生列表', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/student/creation',
            name: 'studentcreation',
            component: () => import('@/views/student/StudentCreation'),
            meta: { title: '学生新建', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/student/modification',
            name: 'studentmodification',
            hidden: true,
            component: () => import('@/views/student/StudentModification'),
            meta: { title: '学生信息修改', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/student/detail',
            name: 'studentdetail',
            hidden: true,
            component: () => import('@/views/student/StudentDetail'),
            meta: { title: '学生详情', icon: 'dashboard', permission: ['dashboard'] }
          },
        ]
      },
      {
        path: '/permission',
        name: 'permission',
        redirect: '/permission/list',
        component: PageView,
        meta: { title: '权限管理', icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: '/permission/list',
            name: 'rolelist',
            component: () => import('@/views/permission/RoleList'),
            meta: { title: '角色列表', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/permission/creation',
            name: 'rolecreation',
            component: () => import('@/views/permission/RoleCreation'),
            meta: { title: '角色新建', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/permission/distribution',
            name: 'roledistribution',
            hidden: true,
            component: () => import('@/views/permission/RoleDistribution'),
            meta: { title: '角色分配', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/permission/detail',
            name: 'roledetail',
            hidden: true,
            component: () => import('@/views/permission/RoleDetail'),
            meta: { title: '角色详情', icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/permission/modification',
            name: 'rolemodification',
            hidden: true,
            component: () => import('@/views/permission/RoleModification'),
            meta: { title: '角色修改',  icon: 'dashboard', permission: ['dashboard'] }
          },
          {
            path: '/permission/import',
            name: 'roleimport',
            hidden: true,
            component: () => import('@/views/permission/RoleImport'),
            meta: { title: '成员导入',  icon: 'dashboard', permission: ['dashboard'] }
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
