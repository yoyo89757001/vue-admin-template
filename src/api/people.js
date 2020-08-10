import request from '@/utils/request'

export function getPeople(data) {
  return request({
    url: 'app/person/findByPage',
    method: 'post',
    data
  })
}

export function deletePeople(id) {
  return request({
    url: '/app/person/deleteone',
    method: 'get',
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
