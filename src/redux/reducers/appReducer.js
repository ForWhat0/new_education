import {
    hideLoader,
    showLoader,
    showAlert,
    hideAlert,
    changeLanguage,
    showExtraLoader,
    hideExtraLoader
} from '../types/types'

const initialState = {
    loading:false,
    extraLoading:false,
    alert:null,
    title:'HOME',
    type:'success',
    language:'ukr'
}

export const appReducer = ( state = initialState,action ) =>{
    switch (action.type){
        case changeLanguage:{
            return {
                ...state,
                language: action.payload.language
            }
        }
        case showLoader:{
            return {
                ...state,
                loading: true
            }
        }
        case hideLoader:{
            return {
                ...state,
                loading: false
            }
        }
        case showExtraLoader:{
            return {
                ...state,
                extraLoading: true
            }
        }
        case hideExtraLoader:{
            return {
                ...state,
                extraLoading: false
            }
        }
        case showAlert:{
            return {
                ...state,
                type:action.payload.type,
                alert: action.payload.text
            }
        }
        case hideAlert:{
            return {
                ...state,
                alert: null
            }
        }
        default:return state
    }
}