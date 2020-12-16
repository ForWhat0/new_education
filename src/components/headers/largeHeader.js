import React from "react"
import {HeaderWrapper, WrapperInner, Main, NavBar, Footer, LogoImgMain} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import { useSelector} from "react-redux"
const {navButtons,register,logIn,title,subtitle,inputPlaceholder} = headerLsi

export default function LargeHeader({gmail,telegram,facebook}) {
    const {language} = useSelector(state=>state.app)
    return (
        <HeaderWrapper>
            <WrapperInner>
                <LogoImgMain
                    height='70px'
                    width='70px'
                    src='/headerLogo.svg'
                />
                <NavBar
                    language={language}
                    navButtons={navButtons}
                    register={register}
                    logIn={logIn}
                />
                <Main
                    logo1='/headerLogo.svg'
                    logo2='/headerSecondLogo.svg'
                    title={title[language]}
                    subtitle={subtitle[language]}
                />
                <Footer
                    gmail={gmail}
                    telegram={telegram}
                    facebook={facebook}
                    inputName='search'
                    inputFunc={()=>{return null}}
                    inputPlaceholder={inputPlaceholder[language]}
                />
            </WrapperInner>
        </HeaderWrapper>
    )
}
