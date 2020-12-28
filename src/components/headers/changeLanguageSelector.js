import React, {useEffect,useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import styled from 'styled-components'
import {app} from '../../Lsi/lsi'
import {ChangeLanguage} from "../../redux/actions/actions"
import {useRouter} from "next/router";
import Link from "next/link";

const SelectWrapper = styled.div`
position: relative;
 width: min-content;
 margin-left:10px;
 margin-right:10px;
 display: flex;
align-items: center;
:after{
font-family: FontAwesome;
  font-size: 28px;
  position: absolute;
  right:-1px;
  color: ${props=>props.color};
  pointer-events: none;
}
}
`
const Select = styled.div`
font-size: 16px;
width: 163px;
color: ${props=>props.color};
background-color: transparent;
cursor:pointer;
position:relative;
`
const Option = styled.option`
color: ${props=>props.color};
`

const Content=styled.ul`
display:flex;
margin:0;
padding:0;
align-items:center;

div{
width:30px;
height:30px;
background: url(${props=>props.url}) no-repeat;
margin-right: 10px;
}

li{
list-style-type:none;
margin-right:5px;
 color:${props=>props.color};
}

i{
position:absolute;
right:0;
    transform: rotateX(${props=>props.open});
    color:${props=>props.color};
font-size: 24px;
    }
`
const DropDownContent=styled.ul`
z-index: 5;
background-color:white;
border-radius: 0 0 28px 28px;
display:flex;
position:absolute;
width: 100%;
margin:0;
padding:0;
flex-direction:column;
list-style-type:none;
border:${props=>props.border};
display:${props=>props.open};
text-align:center;

li{
text-align:center;
}

li a{
display: block;
    width: 100%;
    padding: 3px;
    font-size: 14px;
}

`
export const ChangeLanguageSelector=({theme,navMain,globeDarkIcon})=>{
    const router = useRouter()
    let locale =  router.locale
    const {languages} = app
    const border = navMain ? '1px solid black' : 'unset'
    const globeIcon = globeDarkIcon  ? "/changeLanguageIconDark.svg" : "changeLanguageIcon.svg"
    const color = theme ? "#3F3F3F" : globeDarkIcon ? "#3F3F3F" : "white"
    const [localeState, setLocaleState] = useState(languages[router.locale])
    const [open, setOpen] = useState(false)

    useEffect(
        ()=>setLocaleState(languages[locale]),
        [locale]
    )

    return(
            <Select>
                <Content color={color} onClick={()=>setOpen(!open)} url={globeIcon} open ={open ? '180deg' : '0' }>
                    <div />
                    <li>{localeState}</li>
                    <i className="fa fa-caret-down"></i>
                </Content>
                <DropDownContent border={border} open ={open ? 'block' : 'none' }>
                    {router.locales.map((locale) => (
                        <li onClick={()=>setOpen(false)}   key={locale} >
                            <Link scroll={false} href={router.asPath} locale={locale}>
                                <a>{languages[locale]}</a>
                            </Link>
                        </li>
                    ))}
                </DropDownContent>
            </Select>
    )
}