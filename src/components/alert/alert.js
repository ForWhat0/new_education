import React from 'react'
import {useSelector} from 'react-redux'
export const Alert = ()=>{
    const text = useSelector(state=>{ return state.app.alert })
    return(
        <div className="alert alert-primary" role="alert">
            {text ? text : 'somethings goes wrong'}
        </div>
    )
}