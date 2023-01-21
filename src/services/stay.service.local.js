import { storageService } from './async-storage.service.js'
const fs = require('fs');
var stays = require('../data/stay.json')

// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay
}
window.cs = stayService


async function query(filterBy = { type: '', maxPrice: Infinity, capacity: Infinity }) {
    console.log('filterBy at query:', filterBy)
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
    // if (filterBy.capacity) {
    //     fillteredStays = fillteredStays.filter(stay => stay.capacity >= filterBy.capacity)
    // }
    return fillteredStays
}

function getById(id) {
    // const staysFromStorage = await storageService.query(STORAGE_KEY)

    // return storageService.get(STORAGE_KEY, stayId)
    return storageService.get('stay',id)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    console.log(stay,"from stay service")
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


function getEmptyStay() {
    return {
        name: '',
        type:'',
        imgUrls: ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        price: '',
        summery:'',
        capacity:0,
        amenities:[]
    }
}


