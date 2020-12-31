import styled from 'styled-components'
import Link from "next/link"
import { Link as ScrollLink} from 'react-scroll'
import {StyledButton} from "../button/button"
import {ChangeLanguageSelector} from './changeLanguageSelector'
import {SearchBarStyled} from "../searchBar/searchBar"
import Icon from "../icon/icon";
import {AnimationSearchBarStyled} from "../searchBar/animationSearchBar";
import {device} from "../deviceSizes/deviceSizes";
import Burger from "../burgerMenu/burgerMenu";
import {cutUri, ParcUri} from "../hooks/hooks";

export const HeaderWrapper = styled.header`
    justify-content: flex-start;
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    flex: 1;
  height:480px;
  background: url(https://epo.org.ua/wp-content/uploads/2020/11/diia_gradient_03.png);
  background-size: cover;
  background-position: center;
  overflow: hidden;
    @media screen and ${device.laptop}{
    height: 150px;
    width:unset;
padding: 30px;
}
@media screen and ${device.mobileL}{
      padding: 30px 0 30px 10px;
    height: auto;
  }
  
`
 const Nav = styled.nav`
  display:flex;
  position:relative;
     justify-content: space-between;
    margin: 0px;
    padding: 24px 0px 5px 0;
  align-items: center;
`
const NavMain = styled.nav`
  width:100%;
  position:relative;
  display:flex;
     justify-content: space-between;
    margin: 0px;
    padding-left:40px;
  align-items: center;
`
export const WrapperInner = styled.div`
  width:80%;
  @media screen and ${device.laptop}{
    width:100%;
    
  }
 
`
export const RestWrapperInner = styled.div`
  width:80%;
  margin-top: 20px;
  display:flex;
  align-items:center;
  padding-bottom:30px;
  border-bottom:1px solid ${props=>props.borderBottomColor};
   @media screen and ${device.laptop}{
     background: ${props=>props.background};
     padding-left: 15px;
  background-size: cover;
  width:100%;
  margin-top: unset;
  background-position: center;
   padding-bottom:unset;
  border-bottom:unset;
  }
`
export const RestPagesHeaderWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    flex: 1;
  min-height: 70px;
`
 const ALink = styled.a`
  color: ${props=>props.color};
  font-size: 16px;
  line-height: 15px;
      margin-right: 40px;
    list-style: none;
    text-decoration: none;
    display: inline;
`
 const Links = styled.a`
  width: 100%;
   @media screen and ${device.laptop}{
    display:none;
  }
`
const LargeLinks = styled.a`
   @media screen and ${device.laptop}{
    display:none!important;
  }
`
const RegisterLink = styled.a`
  color: #1D1D1B;
  font-size: 16px;
  line-height: 15px;
      margin-right: 40px;
    list-style: none;
    text-decoration: none;
    display: inline;
    display:flex;
    align-items:center
`
 const SignIn = styled.div`
display:flex;
@media screen and (max-width:1400px){
      top:${props=>props.top};
    position: absolute;
    right: 0;
  }
   @media screen and ${device.laptop}{
     top:unset!important;
     right: ${props=>props.right};
  }
`
const SignInMain = styled.div`
display:flex;
padding-bottom: 10px;
@media screen and (max-width:1400px){
      top:${props=>props.top};
    position: absolute;
    right: 0;
  }
   @media screen and ${device.laptop}{
     display:none;
  }
`
const BurgerAndSearchIconsMain = styled.div`
 display:none;
   @media screen and ${device.laptop}{
     display:flex;
         position: absolute;
    width: 8%;
    align-items: center;
    right: 0;
  }
   @media screen and ${device.tablet}{
     width:12%;
  }
  @media screen and (max-width:470px){
     width:15%;
     top: 16px;
  }
   @media screen and ${device.mobileM}{
     width:20%;
  }
`
 const Logo =({src,height,width,right,color,radius,padding,left})=>{
    return <LogoImg height={height} width={width} left={left} right={right} color={color} radius={radius} padding={padding} src={src}/>
}
const MainContent = styled.div`
  display:flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
  @media screen and ${device.laptop}{
    margin-top: unset;
  }
`
const Logos = styled.div`
  display:flex;
  cursor:pointer;
    @media screen and ${device.laptop}{
    display:none;
  }
  a{
  width: 30px;
    height: 30px;
    margin-right: 30px;
    background-color: white;
    border-radius: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
}
  }
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
export const LogoImgMain = styled.img`
  display:none;
  position: absolute;
  max-height:${props => props.height};
  max-width:${props => props.width};
  padding: ${props => props.padding};
     @media screen and ${device.laptop}{
    display:block;
    top:8%;
  }
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
@media screen and ${device.laptop}{
    margin-top:30px;
    font-size: 30px;
  }
  @media screen and ${device.tablet}{
    font-size: 18px;
  }
    @media screen and ${device.mobileL}{
    display:none;
  }
`
const Subtitle = styled.span`
    font-size: 16px;
    font-weight: 500;
    @media screen and ${device.mobileL}{
    display:none;
  }
`
const Dropdown = styled.div`
    float: left;
  overflow: hidden;
  `

export const Navmanu = styled.nav`
a {
  text-decoration: none;
}
ul {
  display:${props=>props.display};
  flex-direction:${props=>props.fDirection};
  list-style: none;
  margin: 0;
  padding-left: 0;
}

li {
  color: #1D1D1B;
  display: block;
  float: left;
  position: relative;
  text-decoration: none;
  transition-duration: 0.5s;
  padding:0 20px 10px 5px;
  @media screen and ${device.laptop}{
    float: unset;
  }
}
  
li a {
  color: ${props=>props.color};
   @media screen and ${device.laptop}{
    text-align:left;
  }
}

li a:hover,
li:focus-within {
  cursor: pointer;
 color:rgb(0,114,188);
}

li:focus-within a {
  outline: none;
}

ul li ul {
box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
  z-index:5;
  background:#fff;
  padding: 20px 20px 0 20px;
  width: max-content;
  border-radius:29px;
  visibility: hidden;
  opacity: 0;
  min-width: 200px;
  position: absolute;
  transition: all 0.5s ease;
  margin-top: 10px;
  left: 0;
  display: none;
   @media screen and ${device.laptop}{
    padding:unset;
     position: relative;
  }
}
ul li ul li{
padding:unset;
margin-bottom:20px;
@media screen and ${device.laptop}{
    padding:10px;
  }
}
ul li ul li a{
color:black;
}
ul li:hover > ul,
ul li:focus-within > ul,
ul li ul:hover,
ul li ul:focus {
   visibility: visible;
   opacity: 1;
   display: block;
}

ul li ul li {
  clear: both;
  width: 100%;
}

i {
color:${props=>props.color};
margin-left:10px;
font-size:17px;
}
`

export const NavBar =({language,navButtons,register,logIn})=>{
    return (

        <Nav>
            <LargeLinks>
                <Navmanu role="navigation">
                    <ul>
                        {
                            navButtons.map(button=>
                                button.children.length > 0 ?
                                    <li><a href="#" aria-haspopup="true">{button.title} <i className="fa fa-caret-down"></i></a>
                                        <ul className="dropdown" aria-label="submenu">
                                            {
                                                button.children.map(el=>
                                                    el.path.charAt(0) === '#' ?
                                                        <Link href={`/${el.path}`} passHref>
                                                            <li><a>{el.title}</a></li>
                                                        </Link>
                                                        :
                                                        <Link href={ParcUri(el.path)}>
                                                            <li>
                                                                <a>
                                                                    { el.title}
                                                                </a>
                                                            </li>
                                                        </Link>
                                                )
                                            }
                                        </ul>
                                    </li>
                                    :
                                    <Link href={ParcUri(button.path)}>
                                        <li>
                                            <a>
                                                {button.title}
                                            </a>
                                        </li>
                                    </Link>
                            )
                        }
                    </ul>
                </Navmanu>
            </LargeLinks>

            <SignInMain top='45px'>
                <Link href='/register'>
                    <RegisterLink>
                        {register}
                    </RegisterLink>
                </Link>
                <StyledButton func={null} text={logIn} />
            </SignInMain>
            <BurgerAndSearchIconsMain>
                <AnimationSearchBarStyled color='transparent'/>
                <Burger dark='true'/>
            </BurgerAndSearchIconsMain>
        </Nav>
    )
}
const ArrowIcon = styled.i`
    font-size: 30px;
    color: ${props=>props.color};
    cursor:pointer;
     @media screen and ${device.laptop}{
     display:${props=>props.displayUserIcon};
  }
`
export const NavBarMain =({globeDarkIcon,navMain,footer,searchBarColor,color,language,navButtons,register,logIn,changeLanguageIcon,glassIcon})=>{
    return (
        <NavMain>
            <Links>
                <Navmanu color={color} role="navigation">
                    <ul>
                        {
                            navButtons.map(button=>
                                button.children.length > 0 ?
                                    <li><a href="#" aria-haspopup="true">{button.title} <i  className="fa fa-caret-down"></i></a>
                                        <ul className="dropdown" aria-label="submenu">
                                            {
                                                button.children.map(el=>
                                                    el.path.charAt(0) === '#' ?
                                                        <Link href={`/${el.path}`} passHref>
                                                            <li><a>{el.title}</a></li>
                                                        </Link>

                                                        :
                                                        <Link href={ParcUri(el.path)}>
                                                            <li>
                                                                <a>
                                                                    { el.title}
                                                                </a>
                                                            </li>
                                                        </Link>
                                                )
                                            }
                                        </ul>
                                    </li>
                                    :
                                    <Link href={ParcUri(button.path)}>
                                        <li>
                                            <a>
                                                {button.title}
                                            </a>
                                        </li>
                                    </Link>
                            )
                        }
                    </ul>
                </Navmanu>
            </Links>
            <ChangeLanguageContainer top='25px' position='absolute' right='100px'>
                    <ChangeLanguageSelector globeDarkIcon={globeDarkIcon} />
                    <Glass>
                        <Icon  src={glassIcon}  width={'30px'} height='30px'/>
                    </Glass>
            </ChangeLanguageContainer>
            <SignIn right='68px' top='25px'>
                <AnimationSearchBarStyled color={searchBarColor}/>
                <ArrowIcon
                    color={color}
                    displayUserIcon='none'
                    className="fa fa-user-circle"
                    aria-hidden="true"
                    onClick={()=>console.log('click')}
                />
            </SignIn>
            <Burger color={color}/>
        </NavMain>
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
@media screen and ${device.mobileL}{
      display:none;
  }
`

const ChangeLanguageContainer = styled.div`
display:flex;
min-width:220px;
align-items: center;
margin-left:20px;
position: ${props=>props.position};
right:${props=>props.right};
@media screen and (max-width:1400px){
      top:${props=>props.top};
  }
   @media screen and ${device.laptop}{
     top:unset;
      display:none;
  }
 
`
const Glass = styled.div`
  
  right: 0;
    position: absolute;
  
`
export const LinkIcon = styled.i`
    font-size: 16px;
    color: #0072BC; 
`
export const Footer =({inputName,inputFunc,inputPlaceholder,contacts})=>{
    const telegram = contacts.telegramLink && contacts.telegramLink
    const facebook = contacts.facebookLink && contacts.facebookLink
    const gmail = contacts.gmail && contacts.gmail
    return (
        <FooterContainer>
            <Logos>
                <a href={`https://telegram.im/${telegram}`}  target="_blank">
                    <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                </a>
                <a href={facebook} target="_blank">
                    <LinkIcon  className="fa fa-facebook" aria-hidden="true"/>
                </a>
                <a href={`mailto:?subject=${gmail}`} target="_blank">
                    <LinkIcon  className="fa fa-envelope" aria-hidden="true"/>
                </a>
            </Logos>

            <SearchBarStyled border='none' width='100%' inputFunc={inputFunc} name={inputName} inputPlaceholder={inputPlaceholder}/>

            <ChangeLanguageContainer position='relative'>
                    <ChangeLanguageSelector  theme='white' />
                    <Glass>
                        <Icon  src='/glassIcon.svg'  width='30px' height='30px'/>
                    </Glass>
            </ChangeLanguageContainer>
        </FooterContainer>
    )
}
