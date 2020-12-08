import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import styled from 'styled-components'
import {app} from '../../Lsi/lsi'
import {ChangeLanguage} from "../../redux/actions/actions"

const SelectWrapper = styled.div`
position: relative;
 width: min-content;
 margin-left:10px;
 margin-right:10px;
 display: flex;
align-items: center;
:after{
font-family: FontAwesome;
  content: '\f107';
  font-size: 28px;
  position: absolute;
  right:-1px;
  color: #434B67;
  pointer-events: none;
}
}
`
const Select = styled.select`
padding-right: 20px;
border:none;
font-size: 16px;
color: #3F3F3F;
background-color: transparent;
cursor:pointer;

-webkit-appearance: none;
-moz-appearance: none;
-ms-appearance: none;
 -o-appearance: none;
appearance: none;

:focus{
outline: none!important;
box-shadow: none!important;
}

::-ms-expand{
display: none;
}
`

export const ChangeLanguageSelector=()=>{
    const dispatch = useDispatch()
    const {languages} = app

    const changeLanguageCallback=(e)=>{
        let {value} = e.target;
        dispatch(ChangeLanguage(value))
    }

    return(
        <SelectWrapper >
            <Select
                onChange={changeLanguageCallback}
            >
                {
                    languages.map(language=>
                        <option value={language.languageType}>
                            {language.languageName}
                        </option>)
                }
            </Select>
        </SelectWrapper>
    )
}