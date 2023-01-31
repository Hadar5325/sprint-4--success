
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js';
const fs = require('fs');
var stays = require('../data/stay.json')

// import { utilService } from './util.service.js'
// import { userService } from './user.service.local.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    getEmptyFilter,
    getParams,
    getNightsCount,
    getAllStays,
    getStaysByUserId
}
window.cs = stayService



async function getAllStays() {
    return storageService.query(STORAGE_KEY)
}

async function query(filterBy) {
    // console.log('filterBy at query:', filterBy)
    const staysFromStorage = await storageService.query(STORAGE_KEY)
    if (staysFromStorage.length) {
        var fillteredStays = staysFromStorage
        // console.log('from storge!!:', staysFromStorage)
    } else {
        const currStays = stays
        storageService.save(STORAGE_KEY, stays)
        fillteredStays = stays
    }
    // console.log('stayes at query:', fillteredStays)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        fillteredStays = fillteredStays.filter(stay => regex.test(stay.loc.region) || regex.test(stay.loc.country))
    }
    if (filterBy.type) {
        fillteredStays = fillteredStays.filter(stay => filterBy.type === stay.type)
    }
    if (filterBy.maxPrice) {
        fillteredStays = fillteredStays.filter(stay => stay.price <= filterBy.maxPrice)
    }
    if (filterBy.capacity) {
        fillteredStays = fillteredStays.filter(stay => stay.capacity >= filterBy.capacity.total)
    }
    if (filterBy.region && filterBy.region !== 'flexible') {
        console.log('filterBy.region at :', filterBy.region)
        console.log('fillteredStays at by region:', fillteredStays)
        fillteredStays = fillteredStays.filter(stay => {
            const stayRegion= stay.loc.region.toLowerCase()
            console.log('stay.loc.region.toLowerCase():',stayRegion )
            return filterBy.region === stayRegion
            // || (stay.loc.country.toLowerCase()) === filterBy.region
        })
    }
    // if (filterBy.datesRange.timeStampStart) {
    //     const { timeStampStart, timeStampEnd } = filterBy.datesRange
    //     fillteredStays = fillteredStays.filter((stay => {
    //         // if (!stay.orders) return
    //         return stay.orders?.every((order) => {
    //             return timeStampEnd <= order.startDate || timeStampStart >= order.endDate
    //         })
    //     }))
    // }
    return fillteredStays
}

async function getStaysByUserId(userId) {
    let myStays
    const stays = await getAllStays()
    myStays = stays.filter(stay => stay.host._id === userId)

    return myStays

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
        type: '',
        imgUrls: ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        price: '',
        summery: '',
        capacity: 0,
        amenities: []
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
    // console.log('nights at getNIhgts count:', nights)
    return nights

}


// function _makeStays(stays) {
//     for (let i = 0; i < 36; i++) {
//         const stay = {
//             _id: utilService.makeId(),
//             loc: utilService.drawItems(locations),
//             price: utilService.getRandomIntInclusive(500, 5000),
//             "statReviews": {
//                 "Cleanliness": utilService.getRandomIntInclusive(40, 50) / 10,
//                 "Communication": utilService.getRandomIntInclusive(40, 50) / 10,
//                 "CheckIn": utilService.getRandomIntInclusive(40, 50) / 10,
//                 "Accuracy": utilService.getRandomIntInclusive(40, 50) / 10,
//                 "Location": utilService.getRandomIntInclusive(40, 50) / 10,
//                 "Value": utilService.getRandomIntInclusive(40, 50) / 10,
//             },
//             capacity: utilService.getRandomIntInclusive(1, 10),
//             amenities: labels[utilService.getRandomIntInclusive[0, 21],
//                 utilService.getRandomIntInclusive[0, 21]],
//             imgUrls: [
//                 utilService.drawItems(imgUrlsTresure),
//                 utilService.drawItems(imgUrlsTresure)],
//             reviews: [{ by: { imgUrl: '' } }],
//             host: {},
//         }
//         stays.push(stay)
//     }
//     stays.forEach(stay => {
//         stay.host.pictureUrl = 'https://xsgames.co/randomusers/avatar.php?g=male'
//         stay.reviews.forEach((review) => {
//             review.by.imgUrl = `https://xsgames.co/randomusers/assets/avatars/male/${utilService.getRandomIntInclusive(1, 78)}.jpg`
//         })
//     })
//     return stays
//     //  utilService.shuffle(stays)
// }

export const labels = [
    'Caves', 'Tropical', 'Countryside', 'Skiing',
    'Private rooms', 'OMG', 'Boats', 'Amazing views',
    'Beachfront', 'Top of the world', 'Luxe',
    'Off-the-grid', 'Play', 'Iconic cities', 'New',
    'Campers', 'Golfing', 'Earth homes', 'Ryokans',
    'Casas particulares', 'Minsus',
    'Adapted', "Camping"
]

// const locations = [
//     { city: 'Cleveland', country: 'Ohio', region: 'Unites states' },
//     { city: 'Berlin', country: 'Germany', region: 'Eourope' },
//     { city: 'Khon kean', country: 'Thailand', region: 'Asia' },
//     { city: 'Ndjamena', country: 'Chad', region: 'Africa' },
//     { city: 'Tripoli', country: 'Tunisia', region: 'Middel east' },
//     { city: 'Lusaka', country: 'Zambia', region: 'Africa' },
//     { city: 'Brisbane', country: 'Australia', region: 'Australia' },
//     { city: 'Vancouver', country: 'Canada', region: 'North america' },
//     { city: 'Nimed', country: 'Kongo', region: 'Africa' },
//     { city: 'Alop', country: 'Tunisia', region: 'Middel east' },
//     { city: 'Miklu', country: 'Zambia', region: 'Africa' },
//     { city: 'Sydney', country: 'Australia', region: 'Australia' },
//     { city: 'Vancouver', country: 'Canada', region: 'North america' },
//     { city: 'Clinton', country: 'North Carolina', region: 'Unites states' },
//     { city: 'Panama city', country: 'Panama', region: 'South america' },
//     { city: 'Bogota', country: 'Colombia', region: 'South america' },
//     { city: 'Telsen', country: 'Argentina', region: 'South america' },
//     { city: 'London', country: 'United kingdom', region: 'United kingdom' },
//     { city: 'Aalborg', country: 'Denmark', region: 'europe' },
//     { city: 'Odense', country: 'Denmark', region: 'europe' },
//     { city: 'Brussels', country: 'Belgium', region: 'europe' },
//     { city: 'Granada', country: 'Spain', region: 'europe' },
//     { city: 'Perpignan', country: 'France', region: 'europe' },
//     { city: 'Nimes', country: 'France', region: 'europe' },
//     { city: 'Malaga', country: 'Spain', region: 'europe' },
//     { city: 'Lyon', country: 'France', region: 'europe' },
//     { city: 'Limoges', country: 'France', region: 'europe' },
//     { city: 'Dacca', country: 'India', region: 'Asia' },
//     { city: 'London', country: 'United kingdom', region: 'europe' },
//     { city: 'Roskilde', country: 'Denmark', region: 'europe' },
//     { city: 'Brussels', country: 'Belgium', region: 'europe' },
//     { city: 'Budapest', country: 'Hungary', region: 'europe' },
//     { city: 'Barcelona', country: 'Spain', region: 'europe' },
//     { city: 'Jaen', country: 'Spain', region: 'europe' },
//     { city: 'Marseille', country: 'France', region: 'europe' },
//     { city: 'Paris', country: 'France', region: 'europe' },
//     { city: 'Jaen', country: 'Spain', region: 'europe' },
//     { city: 'Lyon', country: 'France', region: 'europe' },
//     { city: 'Paris', country: 'France', region: 'europe' },
//     { city: 'Dacca', country: 'India', region: 'Asia' }
// ]

// const imgUrlsTresure = [
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436797/hzfu8ihyoecadrermn14.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436607/w0q3sn89rqfwyrxtsear.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436787/gcz7mgmxb6dcl4vz6h0a.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436368/noebywqae4x0u42srsv3.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436846/mwlexovwp7ekqlb6witg.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437006/kcsenznwf3pnka6hjwoh.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436876/bskkmribzul6cjzbprvi.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436359/abuiyexl2xyemq8uon4s.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437025/haliwehueqfkmxo1tv7j.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436546/ooe1vhteuu02af7ny3ex.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436380/ez5caladc00mgsssl6ws.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436811/ym5nh1anownexsyzgbqq.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436978/mhqf1tttzqr33ecrrwb2.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436306/be2v9wssznxs4hebudb4.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436419/jg5q36rc5mpn23kavp6b.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436811/ym5nh1anownexsyzgbqq.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437221/wczn7rdpbtjbcvgspakp.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436321/g2cs1w7tkxsx58penq9j.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436542/e96nrbkjz8mecvsbzukk.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436928/ouvft4oeavr7ceeha4gk.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437006/kcsenznwf3pnka6hjwoh.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437061/xwqh3jtahjqxod0p1a0c.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436329/cvylwkta0uannbxm3zns.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436886/cvc2yfmhfg9dabfkyiqw.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437361/h7fdhfrwoo9jtcgwqzn7.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436528/xfryowvexdic3k1gjush.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436835/pose0fy4kkms4qkln2hg.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436562/aflmntpgocp5l2zxikhl.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436917/mqkfjmfpmyqpqmzmqgau.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437009/zuu2udtrkcs6sxjiym40.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436536/zavqkvmzf6j6efydruzd.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437323/wcnoxi3mwy1a5dmxaccl.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437287/mns2lapesdourab6dn7u.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436804/m7h5fpqvy5ctvkysvg6o.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436876/bskkmribzul6cjzbprvi.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436837/fyczvvyuelceouxja8yy.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436329/cvylwkta0uannbxm3zns.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436511/ru9vwmfqgv3yvdvny3tw.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436287/my8eunlgiiflc2ohslgx.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437221/wczn7rdpbtjbcvgspakp.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437339/qgs3hrnx0accbjkzuh9s.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437256/d1wl601knflcsohxsqhk.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436372/d32ktdsaqfoiogz5dpvf.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436397/nde7l2hrwezdfzbvhczj.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg",
//     "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg"
// ]



// console.log('imgUrlsTresure.length:', imgUrlsTresure.length)


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
    "Staybon monoxide detector",
    "First aid kit",
    "Safety stayd",
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
    "Wide clearance to bed",
    "Wide entryway",
    "Waterfront",
    "Beachfront"
]

