import {
    hideLoader,
    showLoader,
    showAlert,
    hideAlert,
    changeLanguage,
    getNews,
    showExtraLoader, hideExtraLoader, getProjectById, getNewsForMobile, clickBurger, clickModal
} from '../types/types'
import client from "../../apollo/client"
import GET_NEWS from "../../queries/getNews"
import GET_NEWS_ALL_NEWS from "../../queries/getAllNews";

export function actionGetNews({after,before,first,last}) {
    return async dispatch=>{
        try{
            dispatch(ShowLoader())
            const news = await client.query( {
                query: GET_NEWS,
                variables: {
                    after:after,
                    before:before,
                    first:first,
                    last:last
                }
            } )
            dispatch({type:getNews,payload:news})
            dispatch(HideLoader())
        }
        catch (e){
            console.log(e.message)
        }
    }
}
export function actionGetNextNewsForMobile() {
    return async dispatch=>{
        try{
            dispatch(ShowLoader())
            const news = await client.query( {
                query: GET_NEWS_ALL_NEWS
            } )
            dispatch({type:getNewsForMobile,payload:news})
            dispatch(HideLoader())
        }
        catch (e){
            console.log(e.message)
        }
    }
}
export function ChangeLanguage(language){
    return dispatch=>{
        dispatch({
            type:changeLanguage,
            payload:{ language }
        })
    }
}
export function actionClickBurger(){
    return dispatch=>{
        dispatch({
            type:clickBurger
        })
    }
}
export function actionClickModal(){
    return dispatch=>{
        dispatch({
            type:clickModal
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
