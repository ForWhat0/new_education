import {combineReducers} from 'redux'
import {appReducer} from "./appReducer"
import {newsReducer} from "./newsReducer"

export const rootReducer = combineReducers({
       app:appReducer,
       news:newsReducer
})