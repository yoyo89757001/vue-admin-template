import request from '@/utils/request'

export function getPeople(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'post',
    params
  })
}

export function deletePeople(id) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'post',
    params:{id}
  })
}

export function getDeviceKey(params) {
  return request({
    url: '/app/getDeviceKey',
    method: 'get',
    params
  })
}
