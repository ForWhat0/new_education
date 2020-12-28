import {RestPagesHeaderWrapper, RestWrapperInner, NavBarMain, LogoImg} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import {useSelector} from "react-redux"
import Link from "next/link"

const {register,logIn} = headerLsi

export default function MainHeader({whiteTheme,menu,footer}) {
    const {language} = useSelector(state=>state.app)
   const color = whiteTheme ? '#FFFFFF' : '#000'
    const globeDarkIcon = footer ? false : true
    const searchBarColor = whiteTheme ? '#FFFFFF' : 'transition'
    const background = whiteTheme ? 'unset' : 'url(https://epo.org.ua/wp-content/uploads/2020/11/diia_gradient_03.png)';
    return (
        <RestPagesHeaderWrapper>
            <RestWrapperInner borderBottomColor={color} background={background} >
                <Link href={"/"}>
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
        </RestPagesHeaderWrapper>
    )
}
