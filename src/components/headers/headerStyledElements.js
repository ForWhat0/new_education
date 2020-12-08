import styled from 'styled-components'
import React from "react"
import Link from "next/link"
import {StyledButton} from "../button/button"
import {ChangeLanguageSelector} from './changeLanguageSelector'
import {SearchBarStyled} from "../searchBar/searchBar"
import Icon from "../icon/icon";

export const HeaderWrapper = styled.header`
    justify-content: flex-start;
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    flex: 1;
  height:468px;
  min-height: 105px;
  background-image: url(https://epo.org.ua/wp-content/uploads/2020/11/diia_gradient_03.png);
  background-size: cover;
  background-position: center;
  overflow: hidden;
`
 const Nav = styled.nav`
  width:100%;
  display:flex;
     justify-content: space-between;
    margin: 0px;
    padding: 24px 0px 5px 30px;
}
  align-items: center;
`
export const WrapperInner = styled.div`
  width:80%;
  position: absolute;
`
export const RestWrapperInner = styled.div`
  width:80%;
  margin-top: 20px;
  position: absolute;
  display:flex;
  align-items:center;
  padding-bottom:30px;
  border-bottom:1px solid #1D1D1B;
`
export const RestPagesHeaderWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    flex: 1;
  min-height: 105px;
`
 const ALink = styled.a`
  color: #1D1D1B;
  font-size: 16px;
  line-height: 15px;
      margin-right: 40px;
    list-style: none;
    text-decoration: none;
    display: inline;
`
 const Links = styled.a`
  width: 60%;
`
 const SignIn = styled.a`

`

 const Logo =({src,height,width,right,color,radius,padding,left})=>{
    return <LogoImg height={height} width={width} left={left} right={right} color={color} radius={radius} padding={padding} src={src}/>
}
const MainContent = styled.div`
  display:flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
`
const Logos = styled.div`
  display:flex;
`
export const LogoImg = styled.img`
  max-height:${props => props.height};
  margin-right:${props => props.right};
  margin-left:${props => props.left};
  max-width:${props => props.width};
  width:auto;
  background-color:${props => props.color};
  border-radius: ${props => props.radius};
  padding: ${props => props.padding};
`
const Title = styled.h1`
height: 42px;
margin-top:45px;
margin-bottom:20px;
font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 15px;
color: #1D1D1B;
display:flex;
align-items:center;
`
const Subtitle = styled.span`
    font-size: 16px;
    font-weight: 500;
`

export const NavBar =({language,navButtons,register,logIn})=>{
    return (
        <Nav>
            <Links>
                {navButtons.map(button=>
                    <Link href={button.href}>
                        <ALink>
                            {button[language]}
                        </ALink>
                    </Link>
                )}
            </Links>
            <SignIn>
                <Link href='/register'>
                    <ALink>
                        {register[language]}
                    </ALink>
                </Link>
                <StyledButton func={null} text={logIn[language]} />
            </SignIn>
        </Nav>
    )
}

export const Main =({logo1,logo2,title,subtitle})=>{
    return (
        <MainContent>
            <Logos>
                <Icon src={logo1} width='150px' height='60px'/>
                <Icon src={logo2} width='70px' height='60px'/>
            </Logos>
            <Title>
                {title}
            </Title>
            <Subtitle>
                {subtitle}
            </Subtitle>
        </MainContent>
    )
}
const FooterContainer = styled.div`
display:flex;
align-items: center;
margin-top:40px;
`

const ChangeLanguageContainer = styled.div`
display:flex;
align-items: center;
margin-left:20px;
`
const LinkIcon = styled.i`
background-color: white;
    border-radius: 30px;
    width: 30px;
    height: 30px;
    display: flex;
    padding: 5px;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #0072BC;
    margin-right:30px;
`
export const Footer =({inputName,inputFunc,inputPlaceholder,telegram,facebook,gmail})=>{
    return (
        <FooterContainer>
            <Logos>
                <a href={telegram}  target="_blank">
                    <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                </a>
                <a href={facebook} target="_blank">
                    <LinkIcon  className="fa fa-facebook" aria-hidden="true"/>
                </a>
                <a href={gmail} target="_blank">
                    <LinkIcon  className="fa fa-envelope" aria-hidden="true"/>
                </a>
            </Logos>

            <SearchBarStyled border='none' width='60%' inputFunc={inputFunc} name={inputName} inputPlaceholder={inputPlaceholder}/>

            <ChangeLanguageContainer>
                <Icon src='/changeLanguageIcon.svg'  width={'30px'} height='60px'/>
                <ChangeLanguageSelector/>
                <Icon src='/glassIcon.svg'  width={'30px'} height='60px'/>
            </ChangeLanguageContainer>
        </FooterContainer>
    )
}
