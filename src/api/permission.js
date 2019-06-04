import { axios } from '@/utils/request'

const apis = {
  test: '/anything', // [映射] url名称: 实际url
  // 此处实际url: https://httpbin.org/anything
  // 基地址baseURL在vue.config.js中指定
  role_list: '/administrator/role/role_list',
  role_delete: '/administrator/role/role_delete',
  role_detail: '/administrator/role/role_detail',
  role_create: '/administrator/role/create_role',
  role_modify: '/administrator/role/modify_role',
  role_teacher_list: '/administrator/role/role-teacher-list',
  role_add_teacher_list: '/administrator/role/role-add-teacher-list',
  role_teacher_add: '/administrator/role/role-teacher',
  role_teacher_delete: '/administrator/role/role-teacher',
}

export function test(parameter) { // 其他文件使用本接口时调用test
  return axios({
    url: apis.test, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: parameter // get方法
    // data: parameter // post方法
  })
}

export function role_list(parameter) { // 其他文件使用本接口时调用role_list
    return axios({
        url: apis.role_list, // 此处url为上面定义的url
        method: 'post', // 一般 get 或 post
        data: parameter // post方法
    })
}

export function role_delete(parameter) { // 其他文件使用本接口时调用role_delete
    return axios({
        url: apis.role_delete, // 此处url为上面定义的url
        method: 'post', // 一般 get 或 post
        data: parameter // post方法
    })
}

export function role_create(parameter) { // 其他文件使用本接口时调用role_create
    return axios({
        url: apis.role_create, // 此处url为上面定义的url
        method: 'post', // 一般 get 或 post
        data: parameter // post方法
    })
}

export function role_modify(parameter) { // 其他文件使用本接口时调用role_modify
    return axios({
        url: apis.role_modify, // 此处url为上面定义的url
        method: 'post', // 一般 get 或 post
        data: parameter // post方法
    })
}

export function role_detail(parameter) { // 其他文件使用本接口时调用role_detail
    return axios({
        url: apis.role_detail, // 此处url为上面定义的url
        method: 'get', // 一般 get 或 post
        params: parameter // get方法
    })
}

export function role_teacher_list(parameter) { // 其他文件使用本接口时调用role_teacher_list
  return axios({
    url: apis.role_teacher_list, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: parameter // get方法
  })
}

export function role_add_teacher_list(parameter) { // 其他文件使用本接口时调用role_add_teacher_list
  return axios({
    url: apis.role_add_teacher_list, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: parameter // get方法
  })
}

export function role_teacher_add(parameter) { // 其他文件使用本接口时调用role_teacher_add
  return axios({
    url: apis.role_teacher_add, // 此处url为上面定义的url
    method: 'post', // 一般 get 或 post
    data: parameter // post方法
  })
}

export function role_teacher_delete(parameter) { // 其他文件使用本接口时调用role_teacher_delete
  return axios({
    url: apis.role_teacher_delete, // 此处url为上面定义的url
    method: 'delete', // 一般 get 或 post
    params: parameter // delete方法
  })
}