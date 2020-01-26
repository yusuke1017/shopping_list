import { combineReducers } from 'redux'
import materials from './materials'
import materialcat from './materialcat'
import dishcat from './dishcat'
import dishes from './dishes'
import menus from './menus'
import list from './list'

export default combineReducers({
    materials,
    materialcat,
    dishcat,
    dishes,
    menus,
    list,
})
