import React from "react"
import {
    HeaderWrapper,
    WrapperInner,
    Main,
    NavBar,
    Footer,
    LogoImgMain,
    NavBarVisuallyImpaired
} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import { useSelector} from "react-redux"
import {useRouter} from "next/router";
const {navButtons,register,logIn,title,subtitle,inputPlaceholder} = headerLsi

export default function LargeHeader({menu,contacts,title}) {
    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    return (
        <HeaderWrapper background={visuallyImpairedMode ? 'none' : 'url(https://epo.org.ua/wp-content/uploads/2020/11/diia_gradient_03.png)'}>
            <WrapperInner>
                <NavBarVisuallyImpaired display={visuallyImpairedMode ? 'flex' : 'none'} locale={locale}/>
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
                    display={visuallyImpairedMode ? 'none' : 'block'}
                    minWidth={visuallyImpairedMode ? 'unset' : '220px'}
                    contacts={contacts}
                    inputName='search'
                    inputFunc={()=>{return null}}
                    inputPlaceholder={inputPlaceholder[locale]}
                />
            </WrapperInner>
        </HeaderWrapper>
    )
}
