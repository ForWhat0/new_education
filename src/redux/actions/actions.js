import {
    hideLoader,
    showLoader,
    showAlert,
    hideAlert,
    changeLanguage,
    getNews,
    showExtraLoader,
    hideExtraLoader,
    getProjectById,
    getNewsForMobile,
    clickBurger,
    clickModal,
    clickVisuallyImpairedMode,
    clickOnOffImages,
    clickVisuallyImpairedModeOn,
    clickVisuallyImpairedModeOff,
    clickOnOffVisuallyImpairedModeWhiteTheme, changeFontSizeNormal
} from '../types/types'
import GET_MOORE_NEWS from "../../queries/get_moore_news";
import reduxClient from "../../apollo/reduxClient";

export function actionGetNews(offset,locale) {
    return async dispatch=>{
        try{
            dispatch(ShowLoader())
            const news = await reduxClient.query( {
                query: GET_MOORE_NEWS,
                variables: {
                    size:3,
                    offset,
                    language:locale
                }
            } )
            dispatch({type:getNews,payload:{news,offset}})
            dispatch(HideLoader())
        }
        catch (e){
            console.log(e.message)
        }
    }
}
export function actionGetNextNewsForMobile(offset,data,locale) {
    return async dispatch=>{
        try{
            dispatch(ShowLoader())
            const news = await reduxClient.query( {
                query: GET_MOORE_NEWS,
                variables: {
                    size:3,
                    offset,
                    language:locale
                }
            } )
            dispatch({type:getNewsForMobile,payload:{news,offset,data}})
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
export function ClickVisuallyImpairedModeOn(){
    return{
        type:clickVisuallyImpairedModeOn
    }
}
export function ClickVisuallyImpairedModeOff(){
    return{
        type:clickVisuallyImpairedModeOff
    }
}
export function ClickOnOffImages(){
    return{
        type:clickOnOffImages
    }
}
export function ClickOnOffWhiteTheme(string){
    return  dispatch=>{
        dispatch({type:clickOnOffVisuallyImpairedModeWhiteTheme,payload:string})
    }
}
export function ClickOnChangeFontSizeNormal(string){
    return  dispatch=>{
            dispatch({type:changeFontSizeNormal,payload:string})
    }
}

