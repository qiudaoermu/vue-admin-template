import request from '@/utils/request'

export function getDeviceList(params) {
  return request({
    url: '/screen/getDeviceList',
    method: 'post',
    params
  })
}
