import React from "react"
import {HeaderWrapper, WrapperInner, Main, NavBar, Footer, LogoImgMain} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import { useSelector} from "react-redux"
import {useRouter} from "next/router";
const {navButtons,register,logIn,title,subtitle,inputPlaceholder} = headerLsi

export default function LargeHeader({menu,contacts,title}) {
    const router = useRouter()
    const locale = router.locale
    return (
        <HeaderWrapper>
            <WrapperInner>
                <LogoImgMain
                    height='70px'
                    width='70px'
                    src='/headerLogo.svg'
                />
                <NavBar
                    navButtons={menu}
                    register={register[locale]}
                    logIn={logIn[locale]}
                />
                <Main
                    logo1='/headerLogo.svg'
                    logo2='/headerSecondLogo.svg'
                    title={title}
                    subtitle={subtitle[locale]}
                />
                <Footer
                    contacts={contacts}
                    inputName='search'
                    inputFunc={()=>{return null}}
                    inputPlaceholder={inputPlaceholder[locale]}
                />
            </WrapperInner>
        </HeaderWrapper>
    )
}
