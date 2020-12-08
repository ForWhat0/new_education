import {
    hideLoader,
    showLoader,
    showAlert,
    hideAlert,
    changeLanguage,
    getNewsById,
    getProjects,
    getNews,
    showExtraLoader, hideExtraLoader, getProjectById
} from '../types/types'


export function ChangeLanguage(language){
    return dispatch=>{
        dispatch({
            type:changeLanguage,
            payload:{ language }
        })
    }
}

export function ShowAlert(text,type){
    return dispatch=>{
        dispatch({
            type:showAlert,
            payload:{
                text,
                type
            }
        })
        setTimeout(()=>{
            dispatch(HideAlert())
        },3000)
    }
}

function HideAlert(){
    return{
        type:hideAlert
    }
}


export function ShowLoader(){
    return{
        type:showLoader
    }
}

export function HideLoader(){
    return{
        type:hideLoader
    }
}
export function ShowExtraLoader(){
    return{
        type:showExtraLoader
    }
}

export function HideExtraLoader(){
    return{
        type:hideExtraLoader
    }
}
