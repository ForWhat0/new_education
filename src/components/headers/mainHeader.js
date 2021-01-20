import {
    RestPagesHeaderWrapper,
    RestWrapper,
    RestWrapperInner,
    NavBarMain,
    LogoImg,
    NavBarVisuallyImpaired, RestWrapperBackground,
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
    const background = whiteTheme ? 'unset' : 'url(/diia_gradient.png)'
    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)

    return (
        <RestPagesHeaderWrapper>
            <RestWrapper>
                <NavBarVisuallyImpaired footer={footer} display={visuallyImpairedMode ? 'flex' : 'none'} locale={locale}/>
                <RestWrapperBackground background={background}>
                    <RestWrapperInner borderBottomColor={!visuallyImpairedModeWhiteTheme ? 'white' :color}  >
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
                </RestWrapperBackground>
            </RestWrapper>
        </RestPagesHeaderWrapper>
    )
}
