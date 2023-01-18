
import { stayService } from '../../services/stay.service.local'
import { store } from "../store.js"
import { SET_STAYS,  SET_STAY} from '../reducers/stay.reducer'

export async function loadStays(filterBy) {
    try {
        const stays = await stayService.query(filterBy)
        store.dispatch({ type: SET_STAYS, stays })
        return stays
    } catch (err) {
        console.log('Cannot load stays: ', err)
        throw err
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
