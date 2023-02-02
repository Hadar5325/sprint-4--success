import { httpService } from './http.service'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder
}

const ROUTE = 'order'

function query(filterBy = {}) {
  return httpService.get(ROUTE, {filterBy})
}

function getById(orderId) {
  return httpService.get(`${ROUTE}/${orderId}`)
}
// function getByBuyerId(userId) {
//   return httpService.get(`${ROUTE}/${userId}`)
// }
// function getByHostId(hostId) {
//   return httpService.get(`${ROUTE}/${hostId}`)
// }

function remove(orderId) {
  return httpService.delete(`${ROUTE}/${orderId}`)
}

function save(order) {
  if (order._id) {
    return httpService.put(`${ROUTE}/${order._id}`, order)
  } else {
    return httpService.post(ROUTE, order)
  }
}


function getEmptyOrder() {
    return {
        // _id: '',
        hostId: '',
        buyer: {},
        totalPrice: '',
        startDate: '',
        endDate: '',
        guests: '',
        stay: '',
        msgs: '',
        status: '' 
    }
}





