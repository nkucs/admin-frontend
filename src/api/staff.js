import { axios } from '@/utils/request'

const apis = {
  test: '/anything', // [映射] url名称: 实际url
  // 此处实际url: https://httpbin.org/anything
  // 基地址baseURL在vue.config.js中指定
  getstafflist: '/administrator/staff/staff_list',
  deletestaff: '/administrator/staff/delete_staff',
  getstaffdetail: '/administrator/staff/staff_details',
}

export function test(parameter) { // 其他文件使用本接口时调用test
  return axios({
    url: apis.test, // 此处url为上面定义的url
    method: 'get', // 一般 get 或 post
    params: parameter // get方法
    // data: parameter // post方法
  })
}

export function getstafflist(parameter) {
    return axios({
      url: apis.getstafflist, 
      method: 'get', 
      params: parameter 
    })
}

export function getstaffdetail(parameter) { 
  return axios({
    url: apis.getstaffdetail, 
    method: 'get', 
    params: parameter 
  })
}

export function deletestaff(parameter) { 
  return axios({
    url: apis.deletestaff, 
    method: 'post',
    data: parameter 
  })
}

  