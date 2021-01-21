import {ALink, SignIn, StyledMenu,CircleBackground,Header,Ul,Li} from './menuStyled'
import {useDispatch, useSelector} from "react-redux"
import Link from "next/link"
import {headerLsi,events} from "../../Lsi/lsi"
import {StyledButton} from "../button/button";
import {ChangeLanguageSelector} from "../headers/changeLanguageSelector";
import {LogoImg} from "../headers/headerStyledElements";
import {actionClickBurger} from "../../redux/actions/actions";
import {useRouter} from "next/router";
import { ParcUri} from "../hooks/hooks";
const {register,logIn} = headerLsi

const Menu = ({menu}) => {
    const router = useRouter()
    const locale = router.locale
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
                        menu.map((button,i)=>
                            button.children.length > 0 ?
                                            button.children.map(el=>
                                                el.path.charAt(0) === '#' ?
                                                    <Link key={i+el.title} href={`/${el.path}`} passHref>
                                                        <Li onClick={()=>handlerCloseMenu()}>
                                                            <ALink activeLink={router.asPath == `/${el.path}` && activeLink}>
                                                                {el.title}
                                                            </ALink>
                                                        </Li>
                                                    </Link>
                                                    :
                                                    <Link key={i+el.title} href={ ParcUri(el.path) }>
                                                        <Li onClick={()=>handlerCloseMenu()}>
                                                            <ALink activeLink={router.pathname == ParcUri(el.path) && activeLink}>
                                                                {el.title}
                                                            </ALink>
                                                        </Li>
                                                    </Link>
                                            )
                                :
                                <Link key={i+button.title} href={ParcUri(button.path)}>
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
                        <Link href='/logIn'>
                            <a onClick={()=>handlerCloseMenu()}>
                                <StyledButton
                                    style={{margin: '0 0 20px 0'}}
                                    text={logIn[locale]}
                                />
                            </a>
                        </Link>
                        <Link href='/register'>
                            <ALink onClick={()=>handlerCloseMenu()} style={{margin: '0 0 40px 0'}}>
                                {register[locale]}
                            </ALink>
                        </Link>
                    </SignIn>
                </Ul>

        </StyledMenu>
    )
}
export default Menu;