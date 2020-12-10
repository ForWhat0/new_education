import {getNews, getNewsById, getNewsForMobile} from "../types/types"


const initialState={
    newsReducer:null,
    newsByID:null,
    allNewsForMobileSliderReducer:null
}

export const newsReducer = ( state = initialState , action )=>{
    switch (action.type){
        case getNews:{
            return {
                ...state,
                newsReducer:action.payload
            }
        }
        case getNewsForMobile:{
            return {
                ...state,
                allNewsForMobileSliderReducer:action.payload
            }
        }
        case getNewsById:{
            return {
                ...state,
                newsByID:action.payload
            }
        }
        default: return state
    }
}