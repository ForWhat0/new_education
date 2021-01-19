import  {useEffect,useState} from 'react'
import { useSelector} from "react-redux"
import styled from 'styled-components'
import {app} from '../../Lsi/lsi'
import {useRouter} from "next/router";
import Link from "next/link";

const Select = styled.div`
font-size: 16px;
width:${props=>props.width};
color: ${props=>props.color};
background-color: transparent;
cursor:pointer;
position:relative;
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
     -webkit-transform: rotate(${props=>props.open});
  -moz-transform: rotate(${props=>props.open});
  -o-transform: rotate(${props=>props.open});
  -ms-transform: rotate(${props=>props.open});
  transform: rotate(${props=>props.open});
    color:${props=>props.color};
font-size: 24px;
    }
`
const DropDownContent=styled.ul`
z-index: 5;
background-color:white;
border-radius: 20px;
display:flex;
position:absolute;
width: 100%;
margin:5px 0 0 0;
padding:5px 0 5px 0;
flex-direction:column;
list-style-type:none;
box-shadow: 0px 0px 20px rgba(29,29,27,0.2);
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
export const ChangeLanguageSelector=({theme,globeDarkIcon})=>{
    const router = useRouter()
    let locale =  router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const {fontSize} = useSelector(state=>state.app)
    const {languages} = app
    const globeIcon = globeDarkIcon  ? "/changeLanguageIconDark.svg" : "changeLanguageIcon.svg"
    const color = theme ? "#3F3F3F" : globeDarkIcon ? "#3F3F3F" : "white"
    const visuallyModeIcon =   theme ? "/changeLanguageVisyalMode.svg" : globeDarkIcon ? "/changeLanguageVisyalMode.svg" : "/changeLanguageVisyalModeWhite.svg"
    const [localeState, setLocaleState] = useState(languages[router.locale])
    const [open, setOpen] = useState(false)


    useEffect(
        ()=>setLocaleState(languages[locale]),
        [locale]
    )

    return(
            <Select width={fontSize === 'normal' ? '163px' : '200px'} visuallyImpairedMode={visuallyImpairedMode}>
                <Content color={!visuallyImpairedModeWhiteTheme ? 'white' :color} onClick={()=>setOpen(!open)} url={!visuallyImpairedModeWhiteTheme ? '/changeLanguageVisyalModeWhite.svg' : visuallyImpairedMode ? visuallyModeIcon :  globeIcon} open ={open ? '180deg' : '0' }>
                    <div />
                    <li>{localeState}</li>
                    <i className="fa fa-caret-down"/>
                </Content>
                <DropDownContent  open ={open ? 'block' : 'none' }>
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