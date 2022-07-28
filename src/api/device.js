import request from '@/utils/request'

export function getDeviceList(params) {
  return request({
    url: '/device/getDeviceList',
    method: 'post',
    params
  })
}
export function addDevice(params) {
  return request({
    url: '/device/addDevice',
    method: 'post',
    data:params
  })
}
export function getproductList(params) {
  return request({
    url: '/device/productList',
    method: 'post',
    params
  })
}
