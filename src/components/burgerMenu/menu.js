import {ALink, SignIn, StyledMenu,ChangeLanguageContainer} from './menuStyled'
import {useSelector} from "react-redux"
import Link from "next/link"
import {headerLsi} from "../../Lsi/lsi"
import {StyledButton} from "../button/button";
import React from "react";
import Icon from "../icon/icon";
import {ChangeLanguageSelector} from "../headers/changeLanguageSelector";
const {navButtons,register,logIn} = headerLsi
const Menu = () => {
    const {language} = useSelector(state=>state.app)
    const {menuBurgerIsOpen} = useSelector(state=>state.app)
    return (
        <StyledMenu open={menuBurgerIsOpen}>
                {navButtons.map(button=>
                    <Link href={button.href}>
                        <a>
                            {button[language]}
                        </a>
                    </Link>

                )}
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