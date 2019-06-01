import { axios } from '@/utils/request'

const apis = {
  test: '/anything', // [映射] url名称: 实际url
  // 此处实际url: https://httpbin.org/anything
  // 基地址baseURL在vue.config.js中指定
  role_detail: '/administrator/role/role_detail',
  role_create: '/administrator/role/create_role',
  role_modify: '/administrator/role/modify_role',
  student_list:'/administrator/student/student_list',
  student_delete:'/administrator/student/student_delete'
}

export function test(parameter) { // 其他文件使用本接口时调用test
    return axios({
      url: apis.test, // 此处url为上面定义的url
      method: 'get', // 一般 get 或 post
      params: parameter // get方法
      // data: parameter // post方法
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

export function student_list(parameter){
    return axios({
        url:apis.student_list,
        method:'post',
        data:parameter
    })
}

export function student_delete(parameter){
    return axios({
        url:apis.student_delete,
        method:'post',
        data:parameter
    })
}
  