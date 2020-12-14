import {RestPagesHeaderWrapper, RestWrapperInner, NavBarMain, LogoImg} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import {useSelector} from "react-redux"


const {navButtons,register,logIn,title,subtitle,inputPlaceholder} = headerLsi

export default function MainHeader({whiteTheme}) {
    const {language} = useSelector(state=>state.app)
   const color = whiteTheme ? '#FFFFFF' : '#000'
    const searchBarColor = whiteTheme ? '#FFFFFF' : 'transition'
    const background = whiteTheme ? 'unset' : 'url(https://epo.org.ua/wp-content/uploads/2020/11/diia_gradient_03.png)';
    return (
        <RestPagesHeaderWrapper>
            <RestWrapperInner borderBottomColor={color} background={background} >
                <LogoImg
                    height='70px'
                    width='70px'
                    src='/headerLogo.svg'
                />
                <NavBarMain
                    searchBarColor={searchBarColor}
                    color={color}
                    glassIcon= {whiteTheme ? '/glassIcon.svg' : '/glassIconDark.svg'}
                    changeLanguageIcon= {whiteTheme ? '/changeLanguageIcon.svg' : '/changeLanguageIconDark.svg'}
                    language={language}
                    navButtons={navButtons}
                    register={register}
                    logIn={logIn}
                />
            </RestWrapperInner>
        </RestPagesHeaderWrapper>
    )
}
