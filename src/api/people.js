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

export function getPeopleInfo(id) {
  return request({
    url: '/app/person/find',
    method: 'get',
    params:{id}
  })
}

export function openCard() {
  return request({
    url: '/app/icCard/openCard',
    method: 'get',
  })
}

export function getDeviceKey(params) {
  return request({
    url: '/app/getDeviceKey',
    method: 'get',
    params
  })
}
