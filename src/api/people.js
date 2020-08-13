import request from '@/utils/request'

export function getPeople(data) {
  return request({
    url: 'app/person/findByPage',
    method: 'post',
    data
  })
}


export function getHistroy(data) {
  return request({
    url: 'app/findRecords',
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

export function getConfig() {
  return request({
    url: '/app/getConfig',
    method: 'get',
  })
}

export function getPeopleInfoFind(data) {
  return request({
    url: '/app/person/finds',
    method: 'post',
    data
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
