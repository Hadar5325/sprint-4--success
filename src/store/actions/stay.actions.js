
import { stayService } from '../../services/stay.service.local'
import { store } from "../store.js"
import { SET_STAYS, SET_STAY, ADD_STAY, UPDATE_STAY, REMOVE_STAY, UPDATE_FILTER, SET_IS_FILTER_SHOWN } from '../reducers/stay.reducer'

export function getActionRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: ADD_STAY,
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}


export async function loadStay(stayId) {
    try {
        const stay = await stayService.getById(stayId)
        store.dispatch({ type: SET_STAY, stay })
        return stay
    } catch (err) {
        console.log('Cannot load stay: ', err)
        throw err
    }
}


export async function loadStays(filterBy) {
    const queryStringParams =`?txt=${filterBy.txt}&capacity=${filterBy.capacity.total}&startDate=${filterBy.datesRange.timeStampStart}&endDate=${filterBy.datesRange.timeStampEnd}&maxPrice=${filterBy.maxPrice}&region=${filterBy.region}&type=${filterBy.type}`

    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
    try {
        const stays = await stayService.query(filterBy)
        // console.log('Stays from DB:', stays)
        store.dispatch({
            type: SET_STAYS,
            stays
        })

    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    }

}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getActionRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        console.log('Added Stay', savedStay)
        store.dispatch(getActionAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export function updateStay(stay) {
    return stayService.save(stay)
        .then(savedStay => {
            console.log('Updated Stay:', savedStay)
            store.dispatch(getActionUpdateStay(savedStay))
            return savedStay
        })
        .catch(err => {
            console.log('Cannot save stay', err)
            throw err
        })
}

export function uptadeFilter(filterBy = stayService.getEmptyFilter()) {
    // console.log('from uptadeFilter:', filterBy)

    store.dispatch(({ type: UPDATE_FILTER, filterBy }))
    return filterBy
}


export function setIsFilterShown(isFilterShown) {
    store.dispatch(({ type: SET_IS_FILTER_SHOWN, isFilterShown }))

}
