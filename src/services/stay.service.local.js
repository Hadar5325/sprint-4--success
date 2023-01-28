
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js';
// const fs = require('fs');
// var stays = require('../data/stay.json')

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
    getAllStays
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
    } else {
        _arrangeStays(stays)
        fillteredStays = stays
        storageService.save(STORAGE_KEY, stays)
    }
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
    console.log('nights at getNIhgts count:', nights)
    return nights

}

function _arrangeStays(stays) {
    stays.forEach(stay => {
        return stay._id = utilService.makeId()
    })
    console.log('stays at _arrangeStays :', stays)
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

const stays = [
    {

        "name": "Westin Kaanapali KORVN 2BR",
        "types": [
            "National parks",
            "Skiing",
            "Top of the world"
        ],
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg"
        ],
        "orders": [
            {
                "id": 1234,
                "startDate": 1675261292000,
                "endDate": 1790342492000
            },
            {
                "id": 1235,
                "startDate": 1786809926000,
                "endDate": 1877869956000
            },
            {
                "id": 1239,
                "startDate": 1676920026000,
                "endDate": 1678930026000
            }
        ],
        "price": 595,
        "summary": "Westin Kaanapali Ocean Resort Villas North timeshare - Pay resort: $14-20/day, stays under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ \"The Space\" for cleaning/etc AND brief explanation about timeshare reservations - Want guaranteed view for additional cost? Must be weekly rental, other restrictions - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.",
        "capacity": 8,
        "amenities": [
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
            "Step-free access",
            "Wide doorway",
            "Wide clearance to bed",
            "Step-free access",
            "Wide doorway",
            "Step-free access",
            "Wide entryway",
            "Waterfront",
            "Beachfront"
        ],
        "bathstays": 2,
        "bedstaysNum": 3,
        "bads": 5,
        "bedstays": {
            "bedstay1": "1 double bed",
            "bedstay2": "2 single beds",
            "bedstay3": "2 single beds"
        },
        "stayType": "Entire home/apt",
        "host": {
            "_id": "1evJq",
            "fullname": "Patty And Beckett",
            "location": "Eureka, California, United States",
            "about": "Adventurous couple loves to travel :)",
            "responseTime": "within an hour",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_x_medium",
            "isSuperhost": true,
            "id": "36133410"
        },
        "loc": {
            "country": "United States",
            "countryCode": "US",
            "city": "Maui",
            "address": "Lahaina, HI, United States",
            "lat": -156.6917,
            "lan": 20.93792
        },
        "statReviews": {
            "Cleanliness": 4.5,
            "Communication": 4.8,
            "CheckIn": 5,
            "Accuracy": 4.6,
            "Location": 4.5,
            "Value": 4.7
        },
        "reviews": [
            {
                "at": "2016-06-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc004",
                    "fullname": "Kiesha",
                    "imgUrl": "https://robohash.org/10711825?set=set1",
                    "id": "10711825"
                },
                "txt": "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedstay unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter."
            },
            {
                "at": "2016-07-28T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb204",
                    "fullname": "Chris",
                    "imgUrl": "https://robohash.org/70072865?set=set1",
                    "id": "70072865"
                },
                "txt": "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. "
            },
            {
                "at": "2016-09-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb703",
                    "fullname": "Kim",
                    "imgUrl": "https://robohash.org/71179725?set=set1",
                    "id": "71179725"
                },
                "txt": "We had the perfect location for a stay, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves."
            },
            {
                "at": "2017-01-07T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb37f",
                    "fullname": "Tracy",
                    "imgUrl": "https://robohash.org/65593239?set=set1",
                    "id": "65593239"
                },
                "txt": "Beautiful location. Patty & Peter were super helpful and easy to work with!"
            },
            {
                "at": "2017-04-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb105",
                    "fullname": "Duyen",
                    "imgUrl": "https://robohash.org/26215688?set=set1",
                    "id": "26215688"
                },
                "txt": "Great spot for the kids and family and close to beach and everything at the resort. We will definitely be back."
            },
            {
                "at": "2017-05-09T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fabbe",
                    "fullname": "Binh",
                    "imgUrl": "https://robohash.org/117390236?set=set1",
                    "id": "117390236"
                },
                "txt": "The unit and the Westin offer variety of amenities you can possibly ask for. Sofa beds are very comfortable to sleep in. But there is charge for ocean view upgrade. Overall, I highly recommend to book with Patty and Peter. "
            },
            {
                "at": "2018-02-24T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb4af",
                    "fullname": "Samy",
                    "imgUrl": "https://robohash.org/15143517?set=set1",
                    "id": "15143517"
                },
                "txt": "We spent a great week at Patty and Peter's place. The place was exactly as shown in the pictures, very comfortable, nice view, with all amenities. The resort is great with several pools, a long beach, many restaurants, and of course a lot of great activities all around."
            },
            {
                "at": "2018-06-16T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb87b",
                    "fullname": "Breanne",
                    "imgUrl": "https://robohash.org/78173091?set=set1",
                    "id": "78173091"
                },
                "txt": "This place was perfect for my family. We had plenty of stay to spread out and the service could not have been any better"
            },
            {
                "at": "2018-06-29T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb713",
                    "fullname": "Kimberly",
                    "imgUrl": "https://robohash.org/100535039?set=set1",
                    "id": "100535039"
                },
                "txt": "We love Westin Kaanapalli"
            }
        ],
        "likedByUsers": []
    },
    {

        "name": "Belle chambre à côté Metro Papineau",
        "types": [
            "Campers",
            "OMG",
            "Luxe"
        ],
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg"
        ],
        "orders": [
            {
                "id": 1234,
                "startDate": 2775819926000,
                "endDate": 2875839934567
            },
            {
                "id": 1235,
                "startDate": 1786809926000,
                "endDate": 1877869956000
            },
            {
                "id": 1239,
                "startDate": 1676920026000,
                "endDate": 1678930026000
            }
        ],
        "statReviews": {
            "Cleanliness": 4.8,
            "Communication": 4.8,
            "CheckIn": 4.6,
            "Accuracy": 4.8,
            "Location": 4.8,
            "Value": 4.5
        },
        "bathstays": 2,
        "bedstaysNum": 3,
        "bads": 5,
        "bedstays": {
            "bedstay1": "1 double bed",
            "bedstay2": "2 single beds",
            "bedstay3": "2 single beds"
        },
        "price": 30,
        "summary": "Chambre dans un bel appartement moderne avec balcon, ascenseur et terrasse. Private room in a beautiful modern apartment  with balcony, elevator and patio. La chambre est fermée avec une lit double. Vous aurez accès à une salle de bain avec une douche, terrasse. L'appartement est climatisé.  Votre chambre est équipé d'une connexion Wi-Fi illimité. Vous serez proche du centre ville, au pied du pont Jacques Staytier et à distance de marche de toutes les commodités (métro, supermarché, pharmacie",
        "capacity": 2,
        "amenities": [
            "TV",
            "Wifi",
            "Air conditioning",
            "Kitchen",
            "Elevator",
            "Buzzer/wireless intercom",
            "Heating",
            "Family/kid friendly",
            "Washer",
            "Dryer",
            "Smoke detector",
            "Staybon monoxide detector",
            "Essentials",
            "Iron",
            "translation missing: en.hosting_amenity_50"
        ],
        "roomType": "Private room",
        "host": {
            "_id": "sysUO",
            "fullname": "Angel",
            "location": "Montreal, Québec, Canada",
            "about": "",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/12be1141-74de-4f04-bf28-82c3ed589d11.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/12be1141-74de-4f04-bf28-82c3ed589d11.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "80344827"
        },
        "loc": {
            "country": "Canada",
            "countryCode": "CA",
            "city": "Montreal",
            "address": "Montréal, QC, Canada",
            "lat": -73.54985,
            "lan": 45.52797
        },
        "reviews": [
            {
                "at": "2016-07-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc058",
                    "fullname": "Rowan",
                    "imgUrl": "https://robohash.org/81703602?set=set1",
                    "id": "81703602"
                },
                "txt": "The place was great, as was the host! I would recommend staying here."
            },
            {
                "at": "2016-07-08T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb274",
                    "fullname": "Adriana",
                    "imgUrl": "https://robohash.org/64310987?set=set1",
                    "id": "64310987"
                },
                "txt": "J'ai adoré rester là. Très acceuillant."
            },
            {
                "at": "2016-07-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb87c",
                    "fullname": "Emma",
                    "imgUrl": "https://robohash.org/23709900?set=set1",
                    "id": "23709900"
                },
                "txt": "Angel est un hôte très sympa et arrangeant ! L'appartement est agréable à vivre et propre. Proche du métro et du centre ville. Nous avons passé un très bon séjour !"
            },
            {
                "at": "2016-08-02T04:00:00.000Z",
                "by": {
                    "_id": "622f3408e36c59e6164fc082",
                    "fullname": "Jeffery",
                    "imgUrl": "https://robohash.org/44882622?set=set1",
                    "id": "44882622"
                },
                "txt": "Angel was warm and welcoming and has a beautiful apartment. I'd recommend his place to anyone visiting downtown Montreal!"
            }
        ],
        "likedByUsers": []
    },
    {

        "name": "Monte dos Burgos - Cosy Room",
        "types": [
            "Campers",
            "Private rooms",
            "Casas particulares"
        ],
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436329/cvylwkta0uannbxm3zns.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437168/vbmfmdmwrxt7xfwbsw7c.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg"
        ],
        "orders": [
            {
                "id": 1234,
                "startDate": 2775819926000,
                "endDate": 2875839934567
            },
            {
                "id": 1235,
                "startDate": 1786809926000,
                "endDate": 1877869956000
            },
            {
                "id": 1239,
                "startDate": 1676920026000,
                "endDate": 1678930026000
            }
        ],
        "statReviews": {
            "Cleanliness": 4.7,
            "Communication": 5,
            "CheckIn": 4.7,
            "Accuracy": 4.9,
            "Location": 4.8,
            "Value": 4.6
        },
        "bathstays": 2,
        "bedstaysNum": 3,
        "bads": 5,
        "bedstays": {
            "bedstay1": "1 double bed",
            "bedstay2": "2 single beds",
            "bedstay3": "2 single beds"
        },
        "price": 26,
        "summary": "The neighbourhood is a quiet, family residential area, 20 minutes by bus from the historic center of Porto and 20 minutes from the beach (Matosinhos - where you may eat very GOOD fish!). You will love to stay in a very spacious, familiar and bright room, where you can enjoy a large and flowery garden, comfortable kitchen and laundry with washer and dryer machine. My space is good for couples, solo adventures, and business travelers!",
        "capacity": 2,
        "amenities": [
            "Wifi",
            "Kitchen",
            "Free parking on premises",
            "Pets live on this property",
            "Cat(s)",
            "Washer",
            "Dryer",
            "First aid kit",
            "Fire extinguisher",
            "Essentials",
            "Shampoo",
            "Lock on bedroom door",
            "Hangers",
            "Hair dryer",
            "Iron",
            "Laptop friendly workspace",
            "translation missing: en.hosting_amenity_49",
            "translation missing: en.hosting_amenity_50"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Private room",
        "host": {
            "_id": "sysUO",
            "fullname": "Patrícia Sousa Casimiro",
            "location": "Senhora da Hora, Porto, Portugal",
            "about": "",
            "responseTime": "a few days or more",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/87b9ccba-154a-4546-8cbe-8bdb25ddb36c.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/87b9ccba-154a-4546-8cbe-8bdb25ddb36c.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "80558077"
        },
        "loc": {
            "country": "Portugal",
            "countryCode": "PT",
            "city": "Porto",
            "address": "Porto, Porto District, Portugal",
            "lat": -8.63082,
            "lan": 41.18075
        },
        "reviews": [
            {
                "at": "2016-08-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fad68",
                    "fullname": "Celeste",
                    "imgUrl": "https://robohash.org/38181630?set=set1",
                    "id": "38181630"
                },
                "txt": "We had a very nice stay in the house and felt at home. The room is big and light, we had a private bathroom, could use the kitchen and the nice garden. Patricia picked us up at the station of the metro, the bus is near. Patricia and Chris are very open and welcoming people, we talked about Portugal, Fado, Porto ... Also, they gave us several tips to see in Porto. When we are in Porto again we will come back!! We really recommand to stay here. Thanks Patricia and Casimiro!"
            },
            {
                "at": "2016-08-14T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fadf0",
                    "fullname": "Martin",
                    "imgUrl": "https://robohash.org/32511082?set=set1",
                    "id": "32511082"
                },
                "txt": "Patricia and Chris has been wonderful hosts. They help us very much with all questions we had. We enjoyed our stay very much."
            },
            {
                "at": "2016-08-15T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164faedf",
                    "fullname": "Sandra",
                    "imgUrl": "https://robohash.org/66617047?set=set1",
                    "id": "66617047"
                },
                "txt": "Une chambre très spacieuse et une salle de bain privée : au top ! \r\nChristian et Patricia ont été très accueillants et nous nous sommes tout de suite sentis comme chez nous ! "
            },
            {
                "at": "2016-08-20T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb3ed",
                    "fullname": "Erika",
                    "imgUrl": "https://robohash.org/78636529?set=set1",
                    "id": "78636529"
                },
                "txt": "Des hôtes très accueillant et à l'écoute de leurs invités! De supers adresses à conseiller. \r\nUne maison décorée avec goût et avec une sublime salle de bain privée.\r\nLe centre est très facile d'accès en bus stay inaccessible en voiture. \r\nTrès facile de se garer dans la rue de nos hôtes.\r\nUn excellent rapport qualité prix!"
            },
            {
                "at": "2016-08-22T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb9bd",
                    "fullname": "Guy",
                    "imgUrl": "https://robohash.org/88496638?set=set1",
                    "id": "88496638"
                },
                "txt": "Patricia et Casimir ont été très accueillants et nous ont donné toutes les informations pratiques pour se rendre au centre de Porto en bus. La chambre est spacieuse et la salle de bain privée est juste à coté. Le quartier est très calme et le séjour était très agréable."
            }
        ],
        "likedByUsers": []
    },
    {

        "name": "Heroísmo IV",
        "types": [
            "Castles",
            "Ryokans",
            "Amazing views"
        ],
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg"
        ],
        "orders": [
            {
                "id": 1234,
                "startDate": 2775819926000,
                "endDate": 2875839934567
            },
            {
                "id": 1235,
                "startDate": 1786809926000,
                "endDate": 1877869956000
            },
            {
                "id": 1239,
                "startDate": 1676920026000,
                "endDate": 1678930026000
            }
        ],
        "statReviews": {
            "Cleanliness": 4.7,
            "Communication": 4.8,
            "CheckIn": 5,
            "Accuracy": 4.5,
            "Location": 4.8,
            "Value": 4.5
        },
        "bathstays": 2,
        "bedstaysNum": 3,
        "bads": 5,
        "bedstays": {
            "bedstay1": "1 double bed",
            "bedstay2": "2 single beds",
            "bedstay3": "2 single beds"
        },
        "price": 29,
        "summary": "If the dates you wish are not available, we have other options in the same location. You can find them on my profile. My goal is for you to have your days with the most comfort i can propose. I want you to taste all the feelings in Porto, as our food, as our best places, our best pointviews. I just love to help you enjoying this beautiful city :)",
        "capacity": 2,
        "amenities": [
            "TV",
            "Cable TV",
            "Internet",
            "Wifi",
            "Kitchen",
            "Free street parking",
            "Heating",
            "First aid kit",
            "Safety stayd",
            "Fire extinguisher",
            "Essentials",
            "Shampoo",
            "24-hour check-in",
            "Hangers",
            "Hair dryer",
            "translation missing: en.hosting_amenity_49",
            "translation missing: en.hosting_amenity_50",
            "Room-darkening shades",
            "Hot water",
            "Bed linens",
            "Extra pillows and blankets",
            "Microwave",
            "Refrigerator",
            "Dishes and silverware",
            "Cooking basics",
            "Stove",
            "Single level home",
            "Long term stays allowed",
            "Host greets you",
            "Handheld shower head"
        ],
        "bathrooms": 1,
        "bedrooms": 0,
        "roomType": "Entire home/apt",
        "host": {
            "_id": "sysUO",
            "fullname": "Apartments2Enjoy",
            "location": "Porto, Porto District, Portugal",
            "about": "Welcome!\r\nThe apartments has all the things to provide you a perfect days in Porto. It is located in a very central area, inside a typical oporto building. \r\nI will give you lots of informations about Porto, my personal tips, and I'll always be available to help you with anything. All I want is for you to go home knowing Porto and inevitably loving the city! :)\r\n\r\n",
            "responseTime": "within a day",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/f3e85f0c-e28d-4698-9da9-2f203aea1f3d.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/f3e85f0c-e28d-4698-9da9-2f203aea1f3d.jpg?aki_policy=profile_x_medium",
            "isSuperhost": true,
            "id": "9320470"
        },
        "loc": {
            "country": "Portugal",
            "countryCode": "PT",
            "city": "Porto",
            "address": "Porto, Porto, Portugal",
            "lat": -8.59275,
            "lan": 41.1462
        },
        "reviews": [
            {
                "at": "2016-02-06T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb449",
                    "fullname": "Tejovra",
                    "imgUrl": "https://robohash.org/41111599?set=set1",
                    "id": "41111599"
                },
                "txt": "Nuno and Francisca were extremely kind and helpful people. They made us feel very welcome and the house is surprisingly spacious. The wifi connection did struggle in our room but maybe we just had bad luck. They were even kind enough to extend our stay last minute. The service was top quality and the shower was amazing. Highly recommend staying here."
            },
            {
                "at": "2016-02-21T05:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fafcc",
                    "fullname": "Sara",
                    "imgUrl": "https://robohash.org/52749020?set=set1",
                    "id": "52749020"
                },
                "txt": "Muito simpáticos e atenciosos. O apartamento é muito confortável e com pequenos detalhes que fazem a diferença. Muito perto do metro, o que é óptimo para deslocações necessárias."
            },
            {
                "at": "2016-03-06T05:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164faf68",
                    "fullname": "Jennifer",
                    "imgUrl": "https://robohash.org/55700681?set=set1",
                    "id": "55700681"
                },
                "txt": "Bonjour, Notre séjour a été très agréable. Nous avons été très bien accueillies. Nuno nous a donné de nombreux conseils, lieux de visites... Le logement était également très bien. Nous avons vraiment pu profiter de Porto. Le métro est tout proche du logement. C'était vraiment un très bon séjour. Merci encore. "
            },
            {
                "at": "2016-03-22T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb5b1",
                    "fullname": "Irune",
                    "imgUrl": "https://robohash.org/13478831?set=set1",
                    "id": "13478831"
                },
                "txt": "Our stay at Heroísmo IV was the perfect Airbnb experience. When we got there, Francisca was waiting for us. She was extremely nice and accommodating, she showed us the apartment and gave us a map of the city and plenty of tips about what to visit, where to eat, etc. The apartment is really small but has absolutely everything you need. It's clean, new, has a really nice kitchen, a very comfortable bed and is near the city center (we walked everyday). I highly recommend staying at Nuno's place. ¡Gracias por todo, Francisca! Porto is a beautiful city, we hope to come back soon!"
            },
            {
                "at": "2016-04-30T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb0c1",
                    "fullname": "Marlene",
                    "imgUrl": "https://robohash.org/61125497?set=set1",
                    "id": "61125497"
                },
                "txt": "A nice litte appartement. We arrived very late but were kindly greeted by the host. She showed us arround and gave us very useful tips (where to go/ where to eat/ etc.). The appartement is located directly to a metro station and has a Lidl and other grocery stores very near by.  It was a perfect stay!"
            },
            {
                "at": "2016-05-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fae67",
                    "fullname": "Елизавета",
                    "imgUrl": "https://robohash.org/20996941?set=set1",
                    "id": "20996941"
                },
                "txt": "Квартира не большая и очень уютная. В ней есть все необходимое. Отличное расположение рядом с метро. Я получила много полезной информации при заселении. Во время сильного дождя в ней сыро, но это не испортило отдых."
            },
            {
                "at": "2016-08-05T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb3e7",
                    "fullname": "Teresa",
                    "imgUrl": "https://robohash.org/5868654?set=set1",
                    "id": "5868654"
                },
                "txt": "Desde o primeiro contacto, a comunicação foi muito fácil e clara. Colostayam à nossa disposição uma série de hipóteses de transporte a partir do aeroporto, bem como a possibilidade de termos em casa cabazes de alimentos. Assim que chegamos, com toda a sua simpatia, tinhamos a Mariana à nossa espera, recebeu-nos explicando os vários  pontos importantes para quem chega: locais a visitar, restaurantes, transportes...\r\nGostámos muito do espaço, do Porto, fazemos questão de voltar em breve. Local excelente!"
            },
            {
                "at": "2016-08-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbf5b",
                    "fullname": "Joyce",
                    "imgUrl": "https://robohash.org/39810791?set=set1",
                    "id": "39810791"
                },
                "txt": "Francisca was very friendly and was waiting for us, she took the time to explain us everything about the flat, she even let us good adresses of restaurants, coffees and places to visit in Porto.\r\nThe flat is 10 minutes by foot from the center, with no stairs to climb, good for our heavy luggages! It is very calm and we even had a table outside where we took our breakfasts. The flat is tiny but very functional, clean, and well equipped.\r\nIt is perfect for a short time in Porto."
            },
            {
                "at": "2016-08-27T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbaad",
                    "fullname": "Jess",
                    "imgUrl": "https://robohash.org/35186577?set=set1",
                    "id": "35186577"
                },
                "txt": "The apartment is great value for money and the location is fantastic. We arrived before the check in time but were greeted promptly and could leave our luggage to explore the city straight away. Francisca gave us a lot of good advice and recommendations for the city, which was very helpful. "
            },
            {
                "at": "2016-09-27T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164faeed",
                    "fullname": "Jennifer",
                    "imgUrl": "https://robohash.org/34970659?set=set1",
                    "id": "34970659"
                },
                "txt": "Thank you for hosting us Nuno. Our trip was perfect. The host was very kind. And the apartment is beautiful, near the center and is well think : it has everything for a few days."
            },
            {
                "at": "2016-12-11T05:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fab65",
                    "fullname": "Joana",
                    "imgUrl": "https://robohash.org/60496781?set=set1",
                    "id": "60496781"
                },
                "txt": "Estúdio muito simpático e limpo. Ideal para uma ou duas pessoas, para explorar o Porto durante um par de dias. Estação de metro à porta. Perto da zona histórica do Porto — faz-se bem a pé. Pastelaria ideal para pequeno almoço mesmo à porta."
            },
            {
                "at": "2017-01-01T05:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb749",
                    "fullname": "Nicolas",
                    "imgUrl": "https://robohash.org/106998486?set=set1",
                    "id": "106998486"
                },
                "txt": "L'emplacement est parfait, dans un quartier calme et à proximité immédiate du métro et du centre-ville. Seul bémol: l'absence d'eau chaude à la douche (un seul ballon d'eau chaude disponible pour plusieurs appartements), franchement regrettable en plein coeur de l'hiver. Ce qui du coup entraîne un rapport qualité-prix un peu cher"
            },
            {
                "at": "2017-03-17T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb10c",
                    "fullname": "Marina",
                    "imgUrl": "https://robohash.org/115887917?set=set1",
                    "id": "115887917"
                },
                "txt": "El apartamento esta genial, es pequeño pero tiene todo lo necesario, cama super grande y cómoda, el apartamento está en general como nuevo y se ve exactamente como las fotos, estaba todo suuuuper limpio y tienen un radiador que calienta el habitáculo en muy poco tiempo. Nos recibió Rita, y de maravilla, nos dio un montón de información sobre Porto en un momento y nos dejó un montón de mapas e info útil. la zona es tranquila y tiene un montos de aparcamiento seguro en la misma calle. Aun que no está en el mismo centro de la ciudad se llega a el en un paseo de poco más de 10 mins, además en la misma puerta hay una parada de metro. Ha sido una experiencia genial quedarnos aquí para visitar la ciudad. Muchas gracias por la amabilidad, si volvemos a la ciudad no dudaríamos en volver a quedarnos aquí."
            },
            {
                "at": "2017-04-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fad5b",
                    "fullname": "Diogo",
                    "imgUrl": "https://robohash.org/122269906?set=set1",
                    "id": "122269906"
                },
                "txt": "Gostamos muito do espaco, pequeno mas muito agradavel. Excelente para passar apenas uns dias. Obrigada ao Nuno que esperou por nos ate tarde e que ainda tirou um tempinho para nos explistay e dar umas dicas sobre a cidade! Aconselho!"
            },
            {
                "at": "2017-06-02T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb79e",
                    "fullname": "Anastasia",
                    "imgUrl": "https://robohash.org/9456078?set=set1",
                    "id": "9456078"
                },
                "txt": "Небольшая, но очень уютная квартирка со всем необходимым! Завтракать на свежем воздухе очень приятно, в кухне можно приготовить все, что захочешь! Очень гостеприимная хозяйка, рассказала много интересного о местах поблизости и в городе!"
            },
            {
                "at": "2017-06-18T04:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fab70",
                    "fullname": "Raphael",
                    "imgUrl": "https://robohash.org/32418543?set=set1",
                    "id": "32418543"
                },
                "txt": "Excelente Studio, muito bem localizado e com todas as comodidades necessárias para uma pequena estadia."
            },
            {
                "at": "2017-06-30T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbc99",
                    "fullname": "Judith",
                    "imgUrl": "https://robohash.org/47537690?set=set1",
                    "id": "47537690"
                },
                "txt": "The flat is situated right next to a metro station. Also perfect, if you arrive by stay - free parking just in front. 15 mins walk to downtown but lot of cheap cafes and restaurants full of locals around.\nThe check-in was perfect. We got lots of information, what to do/see/where to eat. Thanks for that. \nThe Apartement is very small but for a short city visit, big enough. If you stay for a week or so, I would recommend a larger Apartement.  "
            },
            {
                "at": "2017-07-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb694",
                    "fullname": "Marta",
                    "imgUrl": "https://robohash.org/20010340?set=set1",
                    "id": "20010340"
                },
                "txt": "Fantástica estancia en Oporto. Apartamento pequeño pero suficiente para pasar unos días en  Oporto una pareja. Situado un poco a las afueras pero muy buena comunicación  con el centro (parada de metro y autobús enfrente del apartamento).\nAtención inmejorable del anfitrión, respondiendo muy rápido a nuestras consultas y gestionando nuestra llegada. El único fallo es que la lavadora no se podía utilizar. Muy recomendable para pasar unos días en Oporto relación calidad-precio.\n"
            },
            {
                "at": "2017-07-30T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fadc4",
                    "fullname": "Aron",
                    "imgUrl": "https://robohash.org/31601157?set=set1",
                    "id": "31601157"
                },
                "txt": "We had a very nice welcome where we received tips about the neighbourhood. Those we tried turned out excellent. It's a 15 to 20 minute walk to the centre, the room is small but it has everything you need and is well maintained. Very close to the subway, a small outdoor area where you can sit. \nTip: sandwiches (pork with cheese) from casa guedes"
            },
            {
                "at": "2017-11-15T05:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fba79",
                    "fullname": "Márcio",
                    "imgUrl": "https://robohash.org/50134628?set=set1",
                    "id": "50134628"
                },
                "txt": "Excelente relação preço qualidade, muito boa comodidade e excelentes acessos. Muitas opções para as refeições por perto e metro à porta. Recomendo."
            }
        ],
        "likedByUsers": []
    },
    {

        "name": "Home, Sweet, Harlem. Welcome!",
        "types": [
            "Beach",
            "Play",
            "Iconic cities"
        ],
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg"
        ],
        "orders": [
            {
                "id": 1234,
                "startDate": 2775819926000,
                "endDate": 2875839934567
            },
            {
                "id": 1235,
                "startDate": 1786809926000,
                "endDate": 1877869956000
            },
            {
                "id": 1239,
                "startDate": 1676920026000,
                "endDate": 1678930026000
            }
        ],
        "statReviews": {
            "Cleanliness": 4.5,
            "Communication": 4.8,
            "CheckIn": 5,
            "Accuracy": 4.9,
            "Location": 4.6,
            "Value": 4.4
        },
        "bathstays": 2,
        "bedstaysNum": 3,
        "bads": 5,
        "bedstays": {
            "bedstay1": "1 double bed",
            "bedstay2": "2 single beds",
            "bedstay3": "2 single beds"
        },
        "price": 110,
        "summary": "Welcome! Upgrades Added as of January 2018 This listing is located in the Spanish Harlem Section of Manhattan. I offer a cozy apartment that has great transportation in and out the city! The area has a lot of ethnic restaurants and a lot of local, active residents. This residence is great for a quick, inexpensive stay in New York whether its for business, travel, or personal purposes. I am glad to welcome all guests!",
        "capacity": 3,
        "amenities": [
            "TV",
            "Wifi",
            "Air conditioning",
            "Kitchen",
            "Free street parking",
            "Heating",
            "Smoke detector",
            "Staybon monoxide detector",
            "Essentials",
            "Shampoo",
            "Lock on bedroom door",
            "Hangers",
            "Iron",
            "Laptop friendly workspace",
            "translation missing: en.hosting_amenity_49",
            "translation missing: en.hosting_amenity_50",
            "Private living room",
            "Hot water",
            "Bed linens",
            "Extra pillows and blankets",
            "Refrigerator",
            "Dishes and silverware",
            "Cooking basics",
            "Oven",
            "Stove",
            "Host greets you"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Entire home/apt",
        "host": {
            "_id": "sysUO",
            "fullname": "Kevin",
            "location": "New York, New York, United States",
            "about": "Welcome Everyone! Thank you for stopping by. \r\n\r\nI was born and raised in Manhattan and I am here to help  share the New York City Experience with others through Airbnb!  I am easy to connect with and very reachable and always willing to interact with people. \r\n\r\nI am big on cleanliness and hospitality. I strive on making Guests feel as comfortable as possible. \r\n\r\nI hope you would like to get a chance to visit my location and enjoy the hosting I provide. If you have any questions/ comments, feel free to contact me. \r\n",
            "responseTime": "within a few hours",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/61b62b90-e38b-4609-a3c4-ff5ff06b5c08.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/61b62b90-e38b-4609-a3c4-ff5ff06b5c08.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "24800102"
        },
        "loc": {
            "country": "United States",
            "countryCode": "US",
            "city": "New York",
            "address": "New York, NY, United States",
            "lat": -73.93955,
            "lan": 40.79733
        },
        "reviews": [
            {
                "at": "2016-03-26T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb8b4",
                    "fullname": "Christine",
                    "imgUrl": "https://robohash.org/47877926?set=set1",
                    "id": "47877926"
                },
                "txt": "Kevin was very welcoming and thorough with all information. The description of the property was accurate. It's also near the MTA if you want to get to another part of the city. Kevin got in touch before I arrived, and his brother was there to meet me and show me where everything was, which was great. Last but not least, he had provided a great information on the local area with recommendations for places to eat, etc., which I found really useful.\r\n"
            },
            {
                "at": "2016-04-17T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdb9",
                    "fullname": "Hector",
                    "imgUrl": "https://robohash.org/36832696?set=set1",
                    "id": "36832696"
                },
                "txt": "Kevin was nice. And he was very responsive via text, which I appreciate. The listing is in East Harlem, which isn't for everyone. The area is not very posh, but, for me, it feels like home, so I tend to stay there whenever I go to New York. The listing description was accurate enough, with respect to the way the apartment looks. If you can't deal with noise at night, however, this might not be the place for you. The neighbors were surprisingly noisy in the wee hours of the night and virtually silent during the day. This apartment is close to the subway, which was very useful."
            },
            {
                "at": "2016-04-23T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdca",
                    "fullname": "Jaime",
                    "imgUrl": "https://robohash.org/37244180?set=set1",
                    "id": "37244180"
                },
                "txt": "Kevin was very helpful and communicative during the whole time. The apartment is very nice, and within walking distance to the subway. Would definitely stay there again."
            },
            {
                "at": "2016-04-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fae69",
                    "fullname": "Anan",
                    "imgUrl": "https://robohash.org/30380132?set=set1",
                    "id": "30380132"
                },
                "txt": "I had a wonderful stay at Kevin's apartment. The apartment is very close to the six train line. Everything in the apartment was spotless clean. I definitely recommend this apartment to others. Thank you Kevin for hosting me!"
            },
            {
                "at": "2016-05-04T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbf23",
                    "fullname": "Yamilis",
                    "imgUrl": "https://robohash.org/5684819?set=set1",
                    "id": "5684819"
                },
                "txt": "Kevin fue excelente anfitrión. Se mantuvo en contacto con nosotros y fue muy comprensivo aún cuando llegamos más tarde de la hora acordada para el check in porque nos perdimos en el subway. También fue muy comprensivo para acordar el check out de acuerdo a la hora que fue más conveniente para nosotros, aún cuando también se nos hizo tarde. Nos proveyó de un matress de aire para nuestra amiga que vino de M.A. y se quedó una noche con nosotros. El barrio nos pareció bien, no tuvimos ningún incidente. Muchos puertoriqueños y Dominicanos, así que nos sentimos como en casa. Todo fue muy cómodo y limpio. Los vecinos hicieron mucho ruido en las noches, pero no fue problema para nosotros. Una sugerencia sería poner un espejo de cuerpo completo en alguna parte del apartento. En resumen, el apartamento fue perfecto para nosotros, nos volveríamos a quedar y claro que lo recomendaría! Muchas Gracias Kevin por tu ayuda!"
            },
            {
                "at": "2016-05-08T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb6a4",
                    "fullname": "Leonam",
                    "imgUrl": "https://robohash.org/44604680?set=set1",
                    "id": "44604680"
                },
                "txt": "Kevin was really thoughtful about everything. He gave me all information needed while staying on his house. The house was very clean."
            },
            {
                "at": "2016-05-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc063",
                    "fullname": "Amy",
                    "imgUrl": "https://robohash.org/4923470?set=set1",
                    "id": "4923470"
                },
                "txt": "Kevin is a really nice host, flexible and very responsive. The apartment is a 4th-floor walk up, well-maintained and exactly as advertised in the listing. The apartment has all the basic things--it's especially nice to have a kitchen and comfy sofa. There's no TV and wifi, but you probably don't need it anyway since you are here to see New York city! It is just a short 5-min walk from the subway station, so very convenient. Street noise is not a problem although you can hear the neighbors at times (the kids next door can be noisy). East Harlem is a bustling Latino neighborhood with many local eateries and shops. The food selection is supposed to be great (too bad we didn't get to try any). There is a grocery store right outside the building. There're always locals hanging out in front but we were never bothered. All and all, a good choice if you are looking to stay in this part of the city."
            },
            {
                "at": "2016-05-17T04:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fab7d",
                    "fullname": "Vlad",
                    "imgUrl": "https://robohash.org/61270769?set=set1",
                    "id": "61270769"
                },
                "txt": "Kevin was an excellent host. Everything was absolutely as described. The apartment is lovely and very clean. There are numerous windows in every room and there is plenty of light! Would definitely stay again!"
            },
            {
                "at": "2016-05-19T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbe7b",
                    "fullname": "Derick",
                    "imgUrl": "https://robohash.org/63351088?set=set1",
                    "id": "63351088"
                },
                "txt": "Great experience, we enjoyed ourselves for the night we stayed, only issue really were the neighbors being loud all night made it hard to sleep."
            },
            {
                "at": "2016-05-21T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbefb",
                    "fullname": "Derek",
                    "imgUrl": "https://robohash.org/794527?set=set1",
                    "id": "794527"
                },
                "txt": "Kevin's place is exactly as other reviewers describe it:  nice and clean, spacious and very convenient as a base to explore and enjoy NYC. \r\n\r\nThe Neighborhood is definitely classic East Harlem.  Very real NYC vibe. Not a tourist area.  \r\n\r\nThe neighbors are noisy sometimes, so if you are a light sleeper, that could be a problem. But I didn't have any trouble. \r\n\r\nIt would have been nice to have wireless, but I didn't come to NYC to play online, so I didn't mind that too much.  \r\n\r\nKevin was a very nice, responsive host! "
            },
            {
                "at": "2016-05-22T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb484",
                    "fullname": "Shiann",
                    "imgUrl": "https://robohash.org/26290842?set=set1",
                    "id": "26290842"
                },
                "txt": "Kevin made my friend and I feel really welcomed. The apartment was very clean!"
            },
            {
                "at": "2016-05-26T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb208",
                    "fullname": "Stephanie",
                    "imgUrl": "https://robohash.org/73751485?set=set1",
                    "id": "73751485"
                },
                "txt": "Me and my husband stayed in the apartment this was our first time using this site and Kevin made us feel like we are regulars. We stayed one night and it was wonderful. Kevin contacted us right away and was really good with getting us whatever we need to stay there. The area is the only bad thing but when we went in the apartment you really forget about the outside."
            },
            {
                "at": "2016-05-29T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb52c",
                    "fullname": "Virginie",
                    "imgUrl": "https://robohash.org/8842288?set=set1",
                    "id": "8842288"
                },
                "txt": "Kevin is easy to get in touch with and waited for us to arrive Even if it was already late in the evening. He even asked if everything was fine during our stay.\nThe appartment is perfectly situated to visit Manhattan island. Just note the neighbours are noisy if it is important to you."
            },
            {
                "at": "2016-06-06T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb803",
                    "fullname": "Ada",
                    "imgUrl": "https://robohash.org/65358522?set=set1",
                    "id": "65358522"
                },
                "txt": "Kevin was absolutely wonderful. He was very responsive and communicative and I could tell he takes great pride in being an exceptional host. His place was exactly as described, as shown in the pictures and also very clean. The neighborhood is great and the room is a great price for someone looking to stay in the city and explore. It's right next to the trains, neighborhood gems but also commonly known stores for anyone who isn't familiar with the area. "
            },
            {
                "at": "2016-06-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbc21",
                    "fullname": "Fernando",
                    "imgUrl": "https://robohash.org/75294316?set=set1",
                    "id": "75294316"
                },
                "txt": "everything was correct , very good condition to this price"
            },
            {
                "at": "2016-06-14T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdfe",
                    "fullname": "Francesca",
                    "imgUrl": "https://robohash.org/56355386?set=set1",
                    "id": "56355386"
                },
                "txt": "This is my first time using Airbnb. Kevin responded quickly to my inquiry about booking his apartment. Once booked he was very easy to reach via phone or text if I needed to. His one bedroom apartment was very clean and nicely furnished. It is central to a lot of restaurants and neighborhood shopping should you need something and a couple blocks from the subway and buses. Kevin was a great host. He was there to greet me, show me around the apartment and tell me a bit about the area. He also has maps and booklets about what to visit while in New York City. There is wifi in the apartment which is great. Kevin checked in with me just to make sure everything was ok during my trip. I had a wonderful stay at his apartment and would book it again! "
            },
            {
                "at": "2016-06-20T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb4de",
                    "fullname": "Alex",
                    "imgUrl": "https://robohash.org/45975680?set=set1",
                    "id": "45975680"
                },
                "txt": "Kevin was a phenomenal host, he was very accommodating about arrival and check out times and provided me with a ton of useful information to navigate the area and make my stay as pleasant as possible. The apartment is two blocks from the subway and easy to navigate from. I would definitely recommend staying at Kevin's for all those considering a trip to New York."
            },
            {
                "at": "2016-06-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbd08",
                    "fullname": "Johanna",
                    "imgUrl": "https://robohash.org/75777207?set=set1",
                    "id": "75777207"
                },
                "txt": "The apartment is as described. Kevin is very pleasant and was kind to helped me bring my belongings to the apartment. The apartment is cozy in a great location. I will definitely be using this apartment again"
            },
            {
                "at": "2016-07-03T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb7a6",
                    "fullname": "Bandele",
                    "imgUrl": "https://robohash.org/5357325?set=set1",
                    "id": "5357325"
                },
                "txt": "Kevin's a great guy, but if you're looking for a hotel-like experience, this is NOT it... This however, IS a genuine NYC experience. Noisy & inconsiderate neighbors, dirty streets, dangerous vibes... All in all your safe, and anyone you actually talk to will be cool... Kevin was also very considerate and did everything he could to add comfort to my stay, he even warned me of the noisy neighbors in advance... This place is good for people who already know NYC, and need an affordable, SHORT-TERM (like 1-2days), place to crash uptown..."
            },
            {
                "at": "2016-07-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb80a",
                    "fullname": "Bryan",
                    "imgUrl": "https://robohash.org/73430217?set=set1",
                    "id": "73430217"
                },
                "txt": "This place was cozy, comfortable and very clean. The AC was very helpful during the heat waves. Good shower and great WiFi connection as well."
            }
        ],
        "likedByUsers": []
    },
    {
        "_id": "622f337a75c7d36e498aaafd",
        "name": "DOUBLE ROOM IN THE HEART OF BCN",
        "types": [
            "Amazing views",
            "Off-the-grid",
            "Countryside"
        ],
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436852/y3scgbn8d6evumdpwdp4.jpg"
        ],
        "orders": [
            {
                "id": 1234,
                "startDate": 2775819926000,
                "endDate": 2875839934567
            },
            {
                "id": 1235,
                "startDate": 1786809926000,
                "endDate": 1877869956000
            },
            {
                "id": 1239,
                "startDate": 1676920026000,
                "endDate": 1678930026000
            }
        ],
        "statReviews": {
            "Cleanliness": 4.5,
            "Communication": 4.6,
            "CheckIn": 4.9,
            "Accuracy": 4.8,
            "Location": 4.3,
            "Value": 4.5
        },
        "bathstays": 2,
        "bedstaysNum": 3,
        "bads": 5,
        "bedstays": {
            "bedstay1": "1 double bed",
            "bedstay2": "2 single beds",
            "bedstay3": "2 single beds"
        },
        "price": 25,
        "summary": "Lit room with balcony. The apartment is in the center, just meters from the Palau de la Musica Catalana. Well connected, a few minutes from Las Ramblas and the Born. Very close to the beach and Ciutadella Park",
        "capacity": 2,
        "amenities": [
            "Wifi",
            "Kitchen",
            "Paid parking off premises",
            "Smoking allowed",
            "Heating",
            "Washer",
            "Essentials",
            "Shampoo",
            "Lock on bedroom door",
            "Hangers",
            "Hair dryer",
            "Iron",
            "translation missing: en.hosting_amenity_49",
            "translation missing: en.hosting_amenity_50",
            "Hot water",
            "Bed linens",
            "Host greets you"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Private room",
        "host": {
            "_id": "sysUO",
            "fullname": "Isabel",
            "location": "Barcelona, Catalonia, Spain",
            "about": "Mi nombre es Isabel, pero me llamo Isa. Nací en Vigo (Galicia). Con 20 años me fuí a vivir a Madrid con intención de ser actriz; ahora resido en Barcelona desde los 28. Soy una joven de 43 años, cantante de Jazz. Me gusta salir, pero también quedarme en casa a leer o ver alguna buena película.\r\nHe compartido piso muchos años, pero estas serán mis primeras experiencias como anfitriona.\r\n\r\n¡Sed bienvenidos!\r\n",
            "responseTime": "within an hour",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "35858044"
        },
        "loc": {
            "country": "Spain",
            "countryCode": "ES",
            "city": "Barcelona",
            "address": "Barcelona, Catalonia, Spain",
            "lat": 2.17561,
            "lan": 41.38701
        },
        "reviews": [
            {
                "at": "2016-02-24T05:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb95e",
                    "fullname": "Pierre",
                    "imgUrl": "https://robohash.org/58999873?set=set1",
                    "id": "58999873"
                },
                "txt": "Una instancia muy céntrica en uno de estos edificios antiguos del Barri Gotic. No es poco haber conseguido estar en el centro de Barcelona en la misma semana del Mobile World Congress. Isabel es un encanto de anfitrión."
            },
            {
                "at": "2016-03-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fafa6",
                    "fullname": "Isabelle",
                    "imgUrl": "https://robohash.org/26247027?set=set1",
                    "id": "26247027"
                },
                "txt": "The host canceled this reservation 2 days before arrival. This is an automated posting."
            },
            {
                "at": "2016-04-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbaf2",
                    "fullname": "Hélène",
                    "imgUrl": "https://robohash.org/46103953?set=set1",
                    "id": "46103953"
                },
                "txt": "Chambre très bien située et hôtesse très sympathique. Merci encore Isabel pour l'accueil !"
            },
            {
                "at": "2016-04-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdc3",
                    "fullname": "Daniel",
                    "imgUrl": "https://robohash.org/25801559?set=set1",
                    "id": "25801559"
                },
                "txt": "Sheets weren't clean... Shower has very low water pressure. Room is only good for sleeping. It's in a good location but that's about it. Isabel could've provided more information about what's around the house during check in... Overall just decent enough to sleep"
            },
            {
                "at": "2016-04-25T04:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fabad",
                    "fullname": "Maria Isabel",
                    "imgUrl": "https://robohash.org/60712702?set=set1",
                    "id": "60712702"
                },
                "txt": "Isabel est accueillante. L'appartement est charmant, correspond aux images. Très bien situé, à côté de Palau de la musica, dans un vieil immeuble plein de charme un peu désuet. Amateurs de confort et décor \"tendance\" s'abstenir. Chez Isabel on se trouve dans une authentique ambiance d'artiste. Merci beaucoup, je garderai le souvenir de cet accueil lié aux souvenirs de Barcelone."
            },
            {
                "at": "2016-05-04T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb967",
                    "fullname": "Aitana",
                    "imgUrl": "https://robohash.org/53206905?set=set1",
                    "id": "53206905"
                },
                "txt": "Es un piso con mucho encanto, muy tranquilo y en un lugar inmejorable. La anfitriona, Isabel, es amable y facilitadora. El piso es una construcción antigua, lo que le da un ambiente genial pero también hace que el agua de la ducha salga con poquísima presión y sea un poco incómodo a veces. A parte de esto, si tuviese que poner alguna queja sería la hora del chekout, ya que las diez de la mañana me parece un poco pronto. \r\nEn conjunto tuvimos una muy buena experiencia y repetiríamos sin duda."
            },
            {
                "at": "2016-05-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbb88",
                    "fullname": "Valentina",
                    "imgUrl": "https://robohash.org/69740054?set=set1",
                    "id": "69740054"
                },
                "txt": "Isabel was a wonderful host even if she was not there. She was in touch with me by mobile constantly. Thank you so much!\r\nThe house it's nice and was very clean and quite in the night.Perfect location. All you need for few days in Barcelona!"
            },
            {
                "at": "2016-05-16T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb715",
                    "fullname": "Jeremy",
                    "imgUrl": "https://robohash.org/53581405?set=set1",
                    "id": "53581405"
                },
                "txt": "Isabel's place was perfect. It was cozy, clean and quiet. She was a very gracious host and was always there to answer my questions about getting around Barcelona. "
            },
            {
                "at": "2016-05-25T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb0b2",
                    "fullname": "Mei-Lin",
                    "imgUrl": "https://robohash.org/40994614?set=set1",
                    "id": "40994614"
                },
                "txt": "Great room with lots of sunlight in a charming apartment. Fantastic location."
            },
            {
                "at": "2016-06-10T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb1f7",
                    "fullname": "Taneli",
                    "imgUrl": "https://robohash.org/8010736?set=set1",
                    "id": "8010736"
                },
                "txt": "Isa was a kind and gracious host with a lovely appartment in a centric and vibrant area. We loved our stay and surely will visit again."
            },
            {
                "at": "2016-06-16T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb623",
                    "fullname": "Natasha",
                    "imgUrl": "https://robohash.org/25592253?set=set1",
                    "id": "25592253"
                },
                "txt": "SUPER cute place with lots of charm!! Perfect for my first trip to Barcelona:) Amazing location! Gracias Isabel for helping me find last minute accommodations! \r\n"
            },
            {
                "at": "2016-06-23T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc013",
                    "fullname": "Elizabeth",
                    "imgUrl": "https://robohash.org/78467282?set=set1",
                    "id": "78467282"
                },
                "txt": "Isabel was a great host. She met me at the local bar where she worked and took me to her home a street away. The flight of stairs up to here place was a bit daunting but I can see why she lives up there.. It was beautiful! The room and whole place was clean, tidy and very welcoming. I saw Isabel twice, when I arrived and when I left, but it was perfect. \n\nThe facilities were great. The pressure in the shower was weak but it didn't bother me one bit. It is a bit noisy being in the heart of the city, but I can imagine it would be anywhere in this area. It was lovely to have a balcony, and the location was very convenient. Thanks.x"
            },
            {
                "at": "2016-06-28T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb0af",
                    "fullname": "Monika",
                    "imgUrl": "https://robohash.org/11966400?set=set1",
                    "id": "11966400"
                },
                "txt": "Isabel was good host. Location is perfect."
            },
            {
                "at": "2016-07-03T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb23a",
                    "fullname": "Margaux",
                    "imgUrl": "https://robohash.org/78589438?set=set1",
                    "id": "78589438"
                },
                "txt": "Super piso, super barrio! \r\nThe guest welcomed us well."
            },
            {
                "at": "2016-07-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb21c",
                    "fullname": "Elisabeth",
                    "imgUrl": "https://robohash.org/4965921?set=set1",
                    "id": "4965921"
                },
                "txt": "It was really nice to stay at Isabels place. She is very uncomplicated and nice and the flat is super located for exploring bcn. For me it was perfect!:)"
            },
            {
                "at": "2016-07-23T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbd7f",
                    "fullname": "Ingrid",
                    "imgUrl": "https://robohash.org/6058273?set=set1",
                    "id": "6058273"
                },
                "txt": "IT was the perfect stay to Discover the city-a super location with sometimes noisy tourists (even we we're tourists but hopefully not so noisy) but that's part of the location i guess :-). We loved the colourful house and we Will Be go back for a next stay. thank you!"
            },
            {
                "at": "2016-07-30T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb1ac",
                    "fullname": "Liliane",
                    "imgUrl": "https://robohash.org/27060110?set=set1",
                    "id": "27060110"
                },
                "txt": "Isa is a very lovely, sensitive, artistic and gorgeous person. She is respectful of one's privacy but always ready to give support when asked upon. Be it in spoken or written form I always got my answers from her within no times. She also proofed to be very flexible in terms of arrival and departure times which I appreciated a great deal. If you are a fan of jazz music (like I am), make sure to double check ahead of time about her current concert dates so as not to miss your hostess on stage like I did (grumble ;-)).\n\nThe room I occupied was the smaller one of two that Isabel rents out. So if her flat is fully rented out there can be a maximum of 4 guests plus your hostess in the flat, which can cause some bathroom jam, especially during the hot and humid summer times, when the need for a cool shower is inherent to everyone's desire. \nMy room was as depicted. If you plan on using it for double occupancy, I recommend taking Isa's larger room (unless the two of you are very much in love and want to cuddle up close ;-)). Also, if you need a table for writing, ask for the larger room as well, which comes along with one.\nThe flat itself is absolutely enchanting and furnished with love and an artistic eye to details. It's location is a dream for touristic explorations with anything within walking distance. \nTherefore, I can easily recommend both Isabel and her flat to anyone wishing to immerge himself into the local customs and get a good doze of what it is like \"to live like a true Barcelonian\".  \n\nQuerida Isa, muchas gracias por tu hospedalid génial! Volveré a ciencia cierta!\nSaludos y besos\nLiliana"
            },
            {
                "at": "2016-08-10T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb8e1",
                    "fullname": "Murat",
                    "imgUrl": "https://robohash.org/35246459?set=set1",
                    "id": "35246459"
                },
                "txt": "The apartment is very centrally located, in the heart of the gothic part of the city and a couple of blocks from the Placa de Catalunya which makes transportation and sightseeing very easy. It's a 20 minute walk from the beach which is a plus. It's located in a very old building on the top floor, so it is rather stuffy and warm in the apartment. The room overlooks a very narrow street/alley so it's rather dark and it's easy to hear the noise coming from the street and the neighboring apartments. There are a few other rooms in the house that are being rented out, so other people will be staying in the house which makes it a necessity to lock the room when you leave the apartment. \n\nIt's important to note that this place has a very strict check out time. On our last day, we had an evening flight but had to check out in the morning. When we asked if we could check out late, Isa told us to take our stuff to the train station and use the lockers there, but the train station does not have lockers. We ended up renting a locker  at a place called \"Barcelona lockers\". That, I would say changed all the plans for the last day. \n\n"
            },
            {
                "at": "2016-08-26T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbcb4",
                    "fullname": "Mina",
                    "imgUrl": "https://robohash.org/121053?set=set1",
                    "id": "121053"
                },
                "txt": "I was happy to experience Isabels home as described here. It was spacious, bright and original, with lovely colours and beautiful artwork surrounding me in every room. Isabel is a creative, sensitive and respectful person, with an open mind- yet she has the necessary boundaries that are required to organize an environment where so many different people are going to stay and hopefully enjoy. \nThe street itself is very lively, but the noises didn't bother me at all as i could easily block them out with earplugs. The location could not have been more sentral, still it's on \"the right side\" of the Rambla, where you can find more independent shops, restaurants, cafes and bars compared to the same leveled streets towards Raval. It is an old and very charming building, so if you want an minimalistic experience with cold, stainless steel and elevators this is not the place for you! And perhaps you are not the right person for this place either ;) I had to leave earlier due to illness, and was so sorry i couldn't stay throughout the whole month as planned. Hope to be seeing Isabel and her welcoming surroundings again one day "
            },
            {
                "at": "2016-09-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb85f",
                    "fullname": "Jessy",
                    "imgUrl": "https://robohash.org/2935800?set=set1",
                    "id": "2935800"
                },
                "txt": "Isabel was an amazing host. She is incredible and super considerate. The apartment was by no means the best location in Barcelona, I walked everywhere and never needed a map or a taxi. Arriving late at night was always fine and there was never any disturbing street noise. The block is super cute with awesome little shops that are open during the day. Best neighborhood to be in and incredible city ! Muchísima gracias Isabel, estas invitada a visitar Los Ángeles, todo fue increíble !❤️"
            }
        ],
        "likedByUsers": []
    }
]

