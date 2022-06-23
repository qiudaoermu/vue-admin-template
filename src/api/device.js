import request from '@/utils/request'

export function getDeviceList(params) {
  return request({
    url: '/screen/getDeviceList',
    method: 'post',
    params
  })
}
export function addDevice(params) {
  return request({
    url: '/screen/addDevice',
    method: 'post',
    data:params
  })
}
export function getproductList(params) {
  return request({
    url: '/screen/productList',
    method: 'post',
    params
  })
}
