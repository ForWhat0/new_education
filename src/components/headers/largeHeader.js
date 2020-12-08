import React from "react"
import {HeaderWrapper,WrapperInner,Main,NavBar,Footer} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import {useSelector} from "react-redux"

const {navButtons,register,logIn,title,subtitle,inputPlaceholder} = headerLsi

export default function HomePageHeader() {
    const {language} = useSelector(state=>state.app)
    return (
        <HeaderWrapper>
            <WrapperInner>
                <NavBar
                    language={language}
                    navButtons={navButtons}
                    register={register}
                    logIn={logIn}
                />
                <Main
                    logo1='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1000px-Apple_logo_black.svg.png'
                    logo2='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1000px-Apple_logo_black.svg.png'
                    title={title[language]}
                    subtitle={subtitle[language]}
                />
                <Footer
                    inputName='search'
                    inputFunc={()=>{return null}}
                    inputPlaceholder={inputPlaceholder[language]}
                />
            </WrapperInner>
        </HeaderWrapper>
    )
}
