import { storageService } from './async-storage.service.js'
const fs = require('fs');
var stays = require('../data/order.json')

// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyorder,
}
window.cs = orderService


async function query(filterBy) {
    // console.log('filterBy at query:', filterBy)
    const staysFromStorage = await storageService.query(STORAGE_KEY)
    if (staysFromStorage.length) {
        var fillteredStays = staysFromStorage
    } else {
        fillteredStays = stays
        storageService.save(STORAGE_KEY, stays)
    }

    if (filterBy.type) {
        // const regex = new RegExp(filterBy.txt, 'i')
        fillteredStays = fillteredStays.filter(stay => filterBy.type === stay.type)
    }
    if (filterBy.maxPrice) {
        fillteredStays = fillteredStays.filter(stay => stay.price <= filterBy.maxPrice)
    }
    if (filterBy.capacity) {
        fillteredStays = fillteredStays.filter(stay => stay.capacity >= filterBy.capacity.total)
    }
    if (filterBy.region && filterBy.region !== 'flexible') {
        fillteredStays = fillteredStays.filter(stay => {
            return stay.loc.region === filterBy.region
        })
    }
    return fillteredStays
}

function getById(id) {
    // const staysFromStorage = await storageService.query(STORAGE_KEY)

    // return storageService.get(STORAGE_KEY, stayId)
    return storageService.get('stay', id)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        // stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}


function getEmptyorder() {
    return {
        _id: null,
        hostId: null,
        buyer: {},
        totalPrice: null,
        startDate: null,
        endDate: null,
        guests: {},
        stay: {},
        msgs: [],
        status: null 
    }
}

