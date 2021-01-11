import {
    getNews,
    getNewsById,
    getNewsByTitle,
    getNewsForMobile,
    inputNewsByTitle,
} from "../types/types"


const initialState={
    newsReducer:null,
    newsByID:null,
    offset:3,
    offsetMobile:3,
    newsForMobileSliderReducer:null,
    newsForMobileSliderReducerPageInfo:null,
    inputNewsByTitle:'',
    newsByTitle:null
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
        case inputNewsByTitle:{
            return {
                ...state,
                inputNewsByTitle:action.payload
            }
        }
        case getNewsByTitle:{
            return {
                ...state,
                newsByTitle:action.payload.data.news.nodes
            }
        }
        default: return state
    }
}