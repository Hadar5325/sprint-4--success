
import { stayService } from '../../services/stay.service.local'
import { store } from "../store.js"
import { SET_STAYS, REMOVE_TOY, ADD_TOY, UPDATE_TOY } from '../reducers/stay.reducer'

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
