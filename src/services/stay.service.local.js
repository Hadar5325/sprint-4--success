import { storageService } from './async-storage.service.js'
const fs = require('fs');
var stays = require('../data/stay.json')

// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    // save,
    // remove,
    // getEmptyCar,
    // addCarMsg
}
window.cs = stayService


async function query(filterBy = { type: '', maxPrice: Infinity, maxCapacity: Infinity }) {
    const staysFromStorage = await storageService.query(STORAGE_KEY)
    if (staysFromStorage.length) {
        var fillteredStays = staysFromStorage
    } else {
        fillteredStays = stays
        storageService.save(STORAGE_KEY, stays)
    }

    if (filterBy.type) {
        const regex = new RegExp(filterBy.txt, 'i')
        fillteredStays = fillteredStays.filter(stay => regex.test(stay.type))
    }
    if (filterBy.maxPrice) {
        fillteredStays = fillteredStays.filter(stay => stay.price <= filterBy.maxPrice)
    }
    if (filterBy.maxCapacity) {
        fillteredStays = fillteredStays.filter(stay => stay.capacity <= filterBy.maxCapacity)
    }
    return fillteredStays
}

function getById(id) {
    // const staysFromStorage = await storageService.query(STORAGE_KEY)

    // return storageService.get(STORAGE_KEY, carId)
    return storageService.get('stay',id)
}





