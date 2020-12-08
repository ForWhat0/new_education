import {combineReducers} from 'redux'
import {appReducer} from "./appReducer"
import {projectReducer} from "./projectReducer"
import {newsReducer} from "./newsReducer"

export const rootReducer = combineReducers({
       app:appReducer,
       projects:projectReducer,
       news:newsReducer
})