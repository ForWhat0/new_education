import {
    hideLoader,
    showLoader,
    getNews,
    getNewsForMobile,
    clickBurger,
    clickModal,
    clickOnOffImages,
    clickVisuallyImpairedModeOn,
    clickVisuallyImpairedModeOff,
    clickOnOffVisuallyImpairedModeWhiteTheme, changeFontSizeNormal, inputNewsByTitle, getNewsByTitle, scrollToElement
} from '../types/types'
import GET_MOORE_NEWS from "../../queries/get_moore_news";
import GET_NEWS_BY_TITLE from "../../queries/get-news-by-title";
import client from "../../apollo/client";

export function actionGetNews(offset,locale) {
    return async dispatch=>{
        try{
            dispatch(ShowLoader())
            const news = await client.query( {
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
            const news = await client.query( {
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

export function actionClickBurger(){
    return dispatch=>{
        dispatch({
            type:clickBurger
        })
    }
}
export function actionClickModal(obj){
    return dispatch=>{
        dispatch({
            type:clickModal,
            payload:obj
        })
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
const ChangeInput=(string)=>{
    return  dispatch=>{
        dispatch({type:inputNewsByTitle,payload:string})
    }
}

export function OnchangeInputSearchNews(string,locale) {
    if ( string.length ){
        return async dispatch=>{
            try{
                dispatch(ChangeInput(string))
                dispatch(ShowLoader())
                const news = await client.query( {
                    query: GET_NEWS_BY_TITLE,
                    variables: {
                        string,
                        language:locale
                    }
                } )
                dispatch({type:getNewsByTitle,payload:news})
                dispatch(HideLoader())
            }
            catch (e){
                console.log(e.message)
            }
        }
    }
    else {
        return  dispatch=>{
            dispatch(ChangeInput(string))
        }
    }
}
export const ScrollToElement = (string) =>{
    return  dispatch=>{
        dispatch({type:scrollToElement,payload:string})
    }
}