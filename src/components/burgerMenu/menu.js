import {ALink, SignIn, StyledMenu,CircleBackground,Header,Ul,Li} from './menuStyled'
import {useDispatch, useSelector} from "react-redux"
import Link from "next/link"
import {headerLsi,events} from "../../Lsi/lsi"
import {StyledButton} from "../button/button";
import React from "react";
import Icon from "../icon/icon";
import {ChangeLanguageSelector} from "../headers/changeLanguageSelector";
import {LogoImg, Navmanu} from "../headers/headerStyledElements";
import {Link as ScrollLink} from "react-scroll";
import {actionClickBurger} from "../../redux/actions/actions";
import {useRouter} from "next/router";
import {cutUri, ParcUri} from "../hooks/hooks";
const {navButtons,register,logIn} = headerLsi
const Menu = ({menu}) => {
    const router = useRouter()
    const locale = router.locale
    const {language} = useSelector(state=>state.app)
    const {menuBurgerIsOpen} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const handlerCloseMenu=()=>{
        menuBurgerIsOpen === true  &&  dispatch(actionClickBurger())
    }
    const activeLink = {
       background:'linear-gradient(#FFDE00 30%,#00AEEF 60%)',
       text:'text',
       transparent:'transparent'
    }

    return (
        <StyledMenu open={menuBurgerIsOpen}>
            <CircleBackground/>
            <Header>
                <Link href={"/"}>
                    <a onClick={()=>handlerCloseMenu()} style={{zIndex:'6'}}>
                        <LogoImg
                            height='70px'
                            width='70px'
                            src='/headerLogo.svg'
                        />
                    </a>
                </Link>
            </Header>
                <Ul>
                    <Link href={'/calendar'} >
                        <Li  onClick={()=>handlerCloseMenu()}>
                            <ALink activeLink={router.pathname == '/calendar' && activeLink}>
                                {events.calendarEvents[locale]}
                            </ALink>
                        </Li>
                    </Link>
                    {
                        menu.map(button=>
                            button.children.length > 0 ?
                                            button.children.map(el=>
                                                el.path.charAt(0) === '#' ?
                                                    <Link href={`/${el.path}`} passHref>
                                                        <Li onClick={()=>handlerCloseMenu()}>
                                                            <ALink activeLink={router.asPath == `/${el.path}` && activeLink}>
                                                                {el.title}
                                                            </ALink>
                                                        </Li>
                                                    </Link>
                                                    :
                                                    <Link href={ ParcUri(el.path) }>
                                                        <Li onClick={()=>handlerCloseMenu()}>
                                                            <ALink activeLink={router.pathname == ParcUri(el.path) && activeLink}>
                                                                {el.title}
                                                            </ALink>
                                                        </Li>
                                                    </Link>
                                            )
                                :
                                <Link href={ParcUri(button.path)}>
                                    <Li onClick={()=>handlerCloseMenu()}>
                                        <ALink activeLink={router.pathname == ParcUri(button.path) && activeLink}>
                                            {button.title}
                                        </ALink>
                                    </Li>
                                </Link>
                        )
                    }
                    <ChangeLanguageSelector navMain={true} globeDarkIcon='/glassIconDark.svg' />
                    <SignIn style={{margin: '40px 0 0 0'}}>
                        <StyledButton style={{margin: '0 0 20px 0'}} func={null} text={logIn[locale]} />
                        <Link href='/register'>
                            <ALink style={{margin: '0 0 40px 0'}}>
                                {register[locale]}
                            </ALink>
                        </Link>
                    </SignIn>
                </Ul>

        </StyledMenu>
    )
}
export default Menu;