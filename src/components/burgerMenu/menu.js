import {ALink, SignIn, StyledMenu,ChangeLanguageContainer} from './menuStyled'
import {useDispatch, useSelector} from "react-redux"
import Link from "next/link"
import {headerLsi} from "../../Lsi/lsi"
import {StyledButton} from "../button/button";
import React from "react";
import Icon from "../icon/icon";
import {ChangeLanguageSelector} from "../headers/changeLanguageSelector";
import {Navmanu} from "../headers/headerStyledElements";
import {Link as ScrollLink} from "react-scroll";
import {actionClickBurger} from "../../redux/actions/actions";
const {navButtons,register,logIn} = headerLsi
const Menu = ({menu}) => {
    const {language} = useSelector(state=>state.app)
    const {menuBurgerIsOpen} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const handlerCloseMenu=()=>{
        menuBurgerIsOpen === true  &&  dispatch(actionClickBurger())
    }
    return (
        <StyledMenu open={menuBurgerIsOpen}>
            <Navmanu display='flex' fDirection='column'>
                <ul>
                    {
                        menu.map(button=>
                            button.children.length > 0 ?
                                <li><a href="#" aria-haspopup="true">{button.title} <i  className="fa fa-caret-down"></i></a>
                                    <ul className="dropdown" aria-label="submenu">
                                        {
                                            button.children.map(el=>
                                                el.path.charAt(0) === '#' ?
                                                    <Link href={`/${el.path}`} passHref>
                                                        <li>{el.title}</li>
                                                    </Link>
                                                    :
                                                    <Link href={el.path}>
                                                        <li onClick={()=>handlerCloseMenu()}>
                                                            <a href="#">
                                                                {el.title}
                                                            </a>
                                                        </li>
                                                    </Link>
                                            )
                                        }
                                    </ul>
                                </li>
                                :
                                <Link href={button.path}>
                                    <li onClick={()=>handlerCloseMenu()}>
                                        <a href="#">
                                            {button.title}
                                        </a>
                                    </li>
                                </Link>
                        )
                    }
                </ul>
            </Navmanu>
            <SignIn>
                <StyledButton func={null} text={logIn[language]} />
                <Link href='/register'>
                    <ALink>
                        {register[language]}
                    </ALink>
                </Link>
            </SignIn>
            <ChangeLanguageContainer>
                <Icon  src='/glassIconDark.svg'  width={'30px'} height='60px'/>
                <ChangeLanguageSelector />
                <Icon src='/changeLanguageIconDark.svg'  width={'30px'} height='60px'/>
            </ChangeLanguageContainer>
        </StyledMenu>
    )
}
export default Menu;