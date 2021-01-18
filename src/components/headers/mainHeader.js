import {
    RestPagesHeaderWrapper,
    RestWrapper,
    RestWrapperInner,
    NavBarMain,
    LogoImg,
    NavBarVisuallyImpaired,
} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import {useSelector} from "react-redux"
import Link from "next/link"
import {useRouter} from "next/router";

const {register,logIn} = headerLsi

export default function MainHeader({whiteTheme,menu,footer}) {
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
   const color = whiteTheme ? '#FFFFFF' : '#000'
    const globeDarkIcon = !footer
    const searchBarColor =  whiteTheme ? '#FFFFFF' : 'transition'
    const background = whiteTheme ? 'unset' : 'url(/diia_gradient_03.webp)'
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
                        navButtons={menu}
                        register={register}
                        logIn={logIn}
                    />
                </RestWrapperInner>
            </RestWrapper>
        </RestPagesHeaderWrapper>
    )
}
