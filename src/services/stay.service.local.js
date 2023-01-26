
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
    getEmptyStay,
    getEmptyFilter,
    getParams,
    getNightsCount
}
window.cs = stayService


async function query(filterBy) {
    // console.log('filterBy at query:', filterBy)
    const staysFromStorage = await storageService.query(STORAGE_KEY)
    if (staysFromStorage.length) {
        var fillteredStays = staysFromStorage
    } else {
        fillteredStays = stays
        storageService.save(STORAGE_KEY, stays)
    }
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        fillteredStays = fillteredStays.filter(stay => regex.test(stay.loc.region) || regex.test(stay.loc.country))
    }
    if (filterBy.type) {
        fillteredStays = fillteredStays.filter(stay => {
            return stay.types.some((type) => {
                return type === filterBy.type
            })
        })
    }
    if (filterBy.maxPrice) {
        fillteredStays = fillteredStays.filter(stay => stay.price <= filterBy.maxPrice)
    }
    if (filterBy.capacity) {
        fillteredStays = fillteredStays.filter(stay => stay.capacity >= filterBy.capacity.total)
    }
    if (filterBy.region && filterBy.region !== 'flexible') {
        fillteredStays = fillteredStays.filter(stay => {
            return stay.loc.region.toLowerCase() === filterBy.region || (stay.loc.country.toLowerCase()) === filterBy.region
        })
    }
    if (filterBy.datesRange.timeStampStart) {
        const { timeStampStart, timeStampEnd } = filterBy.datesRange
        fillteredStays = fillteredStays.filter((stay => {
            return stay.orders.every((order) => {
                return timeStampEnd <= order.startDate || timeStampStart >= order.endDate
            })
        }))
    }
    if (fillteredStays) return fillteredStays
    // else return 'No results for now'
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
    console.log(stay, "from stay service")
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
        types: [],
        imgUrls: ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        price: '',
        summery: '',
        capacity: 0,
        amenities: [],
        orders: []
    }
}

function getEmptyFilter() {
    return {
        txt: '',
        type: '',
        region: '',
        maxPrice: Infinity,
        capacity: {
            adults: 1,
            kids: 0,
            infants: 0,
            pets: 0,
            total: 1
        },
        datesRange: {
            startDate: Date.now(),
            endDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
            totalNights: getNightsCount(Date.now(), Date.now() + (1000 * 60 * 60 * 24 * 7))
        }
    }
}

function getParams(filterBy) {
    const params = `?txt=${filterBy.txt}&capacityTotal=${filterBy.capacity.total}&capacityAdult=${filterBy.capacity.adults}&capacityKids=${filterBy.capacity.kids}&capacityInfants=${filterBy.capacity.infants}&capacityPets=${filterBy.capacity.pets}&startDate=${filterBy.datesRange.timeStampStart}&endDate=${filterBy.datesRange.timeStampEnd}&totalNights=${filterBy.datesRange.totalNights}&maxPrice=${filterBy.maxPrice}&region=${filterBy.region}&type=${filterBy.type}`
    return params
}


function getNightsCount(start, end) {
    const diff = end - start
    const nights = (diff / 1000 / 60 / 60 / 24) - 1
    console.log('nights at getNIhgts count:', nights)
    return nights

}

export const labels = [
    'Caves', 'Tropical', 'Countryside', 'Skiing',
    'Private rooms', 'OMG', 'Boats', 'Amazing views',
    'Beachfront', 'Top of the world', 'Luxe',
    'Off-the-grid', 'Play', 'Iconic cities', 'New',
    'Campers', 'Golfing', 'Earth homes', 'Ryokans',
    'Casas particulares', 'Minsus',
    'Adapted'
]

export const amenities = [
    "TV",
    "Cable TV",
    "Internet",
    "Wifi",
    "Air conditioning",
    "Wheelchair accessible",
    "Pool",
    "Kitchen",
    "Free parking on premises",
    "Doorman",
    "Gym",
    "Elevator",
    "Hot tub",
    "Heating",
    "Family/kid friendly",
    "Suitable for events",
    "Washer",
    "Dryer",
    "Smoke detector",
    "Carbon monoxide detector",
    "First aid kit",
    "Safety card",
    "Fire extinguisher",
    "Essentials",
    "Shampoo",
    "24-hour check-in",
    "Hangers",
    "Hair dryer",
    "Iron",
    "Laptop friendly workspace",
    "Self check-in",
    "Building staff",
    "Private entrance",
    "Stay-darkening shades",
    "Hot water",
    "Bed linens",
    "Extra pillows and blankets",
    "Ethernet connection",
    "Luggage dropoff allowed",
    "Long term stays allowed",
    "Ground floor access",
    "Wide hallway clearance",
    "Step-free access",
    "Wide doorway",
    "Flat path to front door",
    "Well-lit path to entrance",
    "Disabled parking spot",
    "Step-free access",
    "Wide doorway",
    "Wide clearance to bed",
    "Step-free access",
    "Wide doorway",
    "Step-free access",
    "Wide entryway",
    "Waterfront",
    "Beachfront"
]