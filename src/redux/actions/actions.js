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
import {getProjectsAPI, getNewsForHome, getNewsByIdAPI} from "../../lib/api";

export function actionGetProjects(
    projectVariables
){
    return async dispatch=>{
        try{
            dispatch(ShowLoader())
           const projects = await getProjectsAPI(projectVariables)
            dispatch({type:getProjects,payload:projects})
            dispatch(HideLoader())
        }
        catch (e){
            console.log(e.message)
        }
    }
}

export function actionGetNews(
    newsVariables
){
    return async dispatch=>{ console.log('okok')
        try{
            dispatch(ShowLoader())
            const news = await getNewsForHome(newsVariables)
            dispatch({type:getNews,payload:news})
            dispatch(HideLoader())
        }
        catch (e){
console.log(e.message)
        }
    }
}

export function actionGetNewsById(
    id
){
    return async dispatch=>{
        try{
            dispatch(ShowExtraLoader())
            const news = await getNewsByIdAPI(id)
            dispatch({type:getNewsById,payload:news})
            dispatch(HideExtraLoader())
        }
        catch (e){
            console.log(e.message)
        }
    }
}
export function actionGetProjectById(
    id
){
    return async dispatch=>{
        try{
            dispatch(ShowLoader())
            const project = await getNewsByIdAPI(id)
            dispatch({type:getProjectById,payload:project})
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
