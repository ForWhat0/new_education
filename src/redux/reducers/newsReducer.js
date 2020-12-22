import {getNews, getNewsById, getNewsForMobile} from "../types/types"


const initialState={
    newsReducer:null,
    newsByID:null,
    offset:3,
    offsetMobile:3,
    newsForMobileSliderReducer:null,
    newsForMobileSliderReducerPageInfo:null
}

export const newsReducer = ( state = initialState , action )=>{
    switch (action.type){
        case getNews:{
            return {
                ...state,
                newsReducer:action.payload.news,
                offset: action.payload.offset
            }
        }
        case getNewsForMobile:{
            return {
                ...state,
                newsForMobileSliderReducer:
                    state.newsForMobileSliderReducer ? state.newsForMobileSliderReducer.concat(action.payload.news.data.news.nodes) : action.payload.data.concat(action.payload.news.data.news.nodes),
                newsForMobileSliderReducerPageInfo:action.payload.news.data.news.pageInfo.offsetPagination.hasMore,
                offset: action.payload.offset
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