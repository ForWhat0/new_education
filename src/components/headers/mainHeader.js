import {
    RestPagesHeaderWrapper,
    RestWrapper,
    RestWrapperInner,
    NavBarMain,
    LogoImg,
    NavBarVisuallyImpaired, WrapperInner
} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import {useSelector} from "react-redux"
import Link from "next/link"
import React from "react";
import {useRouter} from "next/router";

const {register,logIn} = headerLsi

export default function MainHeader({whiteTheme,menu,footer}) {
    const {language} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
   const color = whiteTheme ? '#FFFFFF' : '#000'
    const globeDarkIcon = footer ? false : true
    const searchBarColor =  whiteTheme ? '#FFFFFF' : 'transition'
    const background = whiteTheme ? 'unset' : 'url(https://epo.org.ua/wp-content/uploads/2020/11/diia_gradient_03.png)'
    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)

    return (
        <RestPagesHeaderWrapper>
            <RestWrapper>
                <NavBarVisuallyImpaired footer={footer} display={visuallyImpairedMode ? 'flex' : 'none'} locale={locale}/>
                <RestWrapperInner borderBottomColor={!visuallyImpairedModeWhiteTheme ? 'white' :color} background={background} >
                    <Link  href={"/"}>
                        <a>
                            <LogoImg
                                height='70px'
                                width='70px'
                                src='/headerLogo.svg'
                            />
                        </a>
                    </Link>
                    <NavBarMain
                        footer={footer}
                        globeDarkIcon={globeDarkIcon}
                        searchBarColor={searchBarColor}
                        color={color}
                        glassIcon= {whiteTheme ? '/glassIcon.svg' : '/glassIconDark.svg'}
                        changeLanguageIcon= {whiteTheme ? '/changeLanguageIcon.svg' : '/changeLanguageIconDark.svg'}
                        language={language}
                        navButtons={menu}
                        register={register}
                        logIn={logIn}
                    />
                </RestWrapperInner>
            </RestWrapper>
        </RestPagesHeaderWrapper>
    )
}
