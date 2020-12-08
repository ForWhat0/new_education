import {  getProjects , getProjectById } from "../types/types"


const initialState={
    projectsReducer:null,
    projectByIdReducer:null
}

export const projectReducer = ( state = initialState , action )=>{
    switch (action.type){
        case getProjects:{
            return {
                ...state,
                projectsReducer:action.payload
            }
        }
        case getProjectById:{
            return {
                ...state,
                projectByIdReducer:action.payload
            }
        }
        default: return state
    }
}