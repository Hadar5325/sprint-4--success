// import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    getUserByIdWishList,
    remove,
    update,
    updateWishList,
    // changeScore,
    getEmptyCredentials
}

window.userService = userService


async function getUserByIdWishList(userId) {
    const user = await storageService.get('user', userId)
    return user.wishList
    // const user = await httpService.get(`user/${userId}`)
    // return user
}
async function updateWishList(userId, stayId) {
    console.log(userId)
    const user = await storageService.get('user', userId)

    // Check if it's already in wish list -> then remove from list
    if (user.wishList.find(element => element === stayId)) {

        // const newWishList = await storageService.remove('user', stayId)
        // console.log(newWishList)
    }
    user.wishList.push(stayId)
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user.wishList
}

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}


async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}


function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await httpService.put(`user/${_id}`, {_id, score})
    // const user = await storageService.get('user', _id)
    user.score = score
    // await storageService.put('user', user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}



async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        // const users = await storageService.query('user')
        // console.log('users', users)
        // const user = await users.find(user => user.username === userCred.username)
        if (user) {
            // socketService.login(user._id)
            return saveLocalUser(user)
        } else {
            throw new Error
        }
    } catch (err) {
        throw err
    }

}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.wishList = []
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    try{
         await httpService.post('auth/logout')
         console.log('log out succesfully:')
    }catch(err){ 
        console.log('Broblem while logging out:',err)
    }
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null)
}


function getEmptyCredentials(fullname = '', username = '', password = 'secret') {
    return { fullname, username, password }

}


