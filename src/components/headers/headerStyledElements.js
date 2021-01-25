import styled from 'styled-components'
import Link from "next/link"
import {StyledButton} from "../button/button"
import {ChangeLanguageSelector} from './changeLanguageSelector'
import {SearchBarStyled} from "../searchBar/searchBar"
import Icon from "../icon/icon";
import {AnimationSearchBarStyled} from "../searchBar/animationSearchBar";
import {device} from "../deviceSizes/deviceSizes";
import Burger from "../burgerMenu/burgerMenu";
import {ParcUri} from "../hooks/hooks";
import {ClickOnChangeFontSizeNormal,
    ClickOnOffImages, ClickOnOffWhiteTheme,
    ClickVisuallyImpairedModeOff, ClickVisuallyImpairedModeOn, OnchangeInputSearchNews
} from "../../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {headerLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";

export const LargeHeaderDesktop = styled.div`
display:block;
@media screen and ${device.laptop}{
    display:none;
}
`
export const LargeHeaderMobile = styled.div`
display:none;
@media screen and ${device.laptop}{
    display:block;
     background: url(/diia_gradient.png);
     padding-bottom: 20px;
}
@media screen and ${device.mobileL}{
     padding-bottom: unset;
}
`

export const HeaderWrapper = styled.header`
    justify-content: flex-start;
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    flex: 1;
  
  background: ${props=>props.background};
  background-size: cover;
  background-position: center;
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
   @media screen and ${device.laptop}{
     width:auto;
    padding-left:unset;
  }
`
export const WrapperInner = styled.div`
  width:80%;
  @media screen and ${device.laptop}{
    width:100%;
    
  }
 
`
export const RestWrapper = styled.div`
   width:80%;
    @media screen and ${device.laptop}{
  width:100%;
  }
`
export const RestWrapperBackground = styled.div`
width:100%;
@media screen and ${device.laptop}{
     background: ${props=>props.background};
  }
`
export const RestWrapperInner = styled.div`
  margin-top: 20px;
  display:flex;
  padding-bottom: 10px;
  align-items:center;
  border-bottom:1px solid ${props=>props.borderBottomColor};
   @media screen and ${device.laptop}{
   
     margin-left:10%;
  background-size: cover;
  width:80%;
  margin-top: unset;
  background-position: center;
   padding-bottom:unset;
  border-bottom:unset;
  justify-content: space-between;
  }
  @media screen and ${device.tablet}{
     padding-left: 3.2%;
  width:93.6%;
   margin-left:unset;
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

 const Links = styled.div`
  width: 100%;
   @media screen and ${device.laptop}{
    display:none;
  }
`
const LargeLinks = styled.div`
   @media screen and ${device.laptop}{
    display:none!important;
  }
`
const RegisterLink = styled.a`
  color:${props=>props.color};  
  cursor:pointer;
  font-size: 16px;
  line-height: 15px;
      margin-right: 40px;
    list-style: none;
    text-decoration: none;
    display: inline;
    display:flex;
    align-items:center;
    @media screen and (max-width:1290px){
     margin-right: unset;
     margin-bottom:20px;
  }
`
const ChangeLanguageAndSearchContainer = styled.div`
display:flex;
@media screen and (max-width:1290px){
    flex-direction: column;
    align-items: flex-end;
  }
`
 const SignIn = styled.div`
display:flex;
margin-left: 60px;
align-items:center;
   @media screen and ${device.laptop}{
     top:unset!important;
     right: ${props=>props.right};
     margin-left: unset;
  }
`
const SignInMain = styled.div`
display:flex;
padding-bottom: 10px;
 align-items:center;
@media screen and (max-width:1290px){
     flex-direction:column;
  }
`


const MainContent = styled.div`
  display:flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
  @media screen and ${device.laptop}{
    margin-top: unset;
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

const Title = styled.h1`
height: 42px;
margin-top:45px;
margin-bottom:20px;
font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 15px;
display:flex;
align-items:center;
@media screen and ${device.laptop}{
    margin:unset;
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


 const SliderRound = styled.span`
 border: 1px solid white;
    position: absolute;
    cursor: pointer;
    border-radius: 34px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    
    &:before{
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }
 `
const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
    `
const InputCheckbox = styled.input`
display:none;
&:checked{
& ~ ${SliderRound}{
      background-color: #1D1D1B;  
&::before {   
   
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
    }
&::focus{
box-shadow: 0 0 1px #2196F3;
}  
}          
    }
`

const NavVisually = styled.nav`
display:${props=>props.display};
position:relative;
border-bottom: 1px solid ${props=>props.border};
padding: 30px 0 30px 0;
align-items: center;
color:${props=>props.color};
 @media screen and ${device.laptop}{
    display:none;
  }
`
const Choose = styled.div`
display: flex;
margin-right:30px;
span{
display: flex;
align-items: center;
}
`
const Handle = styled.div`
margin-left:10px;
display:flex;
`
const NormalVersion = styled.div`
position:absolute;
right:0;
display:flex;
cursor:pointer;
@media screen and (max-width:1300px){
     top:50px;
  }
  span{
  display: flex;
    align-items: center;
  }
`
const ColorStrong = styled.strong`
    border: 1px solid;
    margin-right:5px;
    cursor:pointer;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    padding: 8px;
     text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props=>props.background};
    color: ${props=>props.color};
    font-size:16px;
`
const Font = styled.strong`
margin-right:5px;
color:${props=>props.color};
background:${props=>props.background};
font-size:${props=>props.font};
border:1px solid white;
  border-radius: 50%;
    width: 10px;
    height: 10px;
    padding: 8px;
     text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
`
export const NavBarVisuallyImpaired=({locale,display,footer})=>{
    const dispatch = useDispatch()
    const {images} = useSelector(state=>state.app)
    const {fontSize} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const background = (string)=>{
        if (!visuallyImpairedModeWhiteTheme && fontSize===string){
            return 'white'
        }
        else if (fontSize===string){
            return 'black'
        }
    }
    const color = (string)=>{
        if (!visuallyImpairedModeWhiteTheme && fontSize===string){
            return 'black'
        }
        else if (fontSize===string){
            return 'white'
        }
    }
   return(
       <NavVisually border={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'} color={!visuallyImpairedModeWhiteTheme ? 'white' : footer ? 'white' : 'black'} display={display}>
           <Choose>
               <span>{headerLsi.fontSize[locale]}</span>
               <Handle>
                   <Font
                       onClick={()=>dispatch(ClickOnChangeFontSizeNormal('normal'))}
                       color={color('normal')}
                       background={background('normal')}
                       font='12px'
                   >
                       A
                   </Font>
                   <Font
                       onClick={()=>dispatch(ClickOnChangeFontSizeNormal('medium'))}
                       color={color('medium')}
                       background={background('medium')}
                       font='14px'
                   >
                       A
                   </Font>
                   <Font
                       onClick={()=>dispatch(ClickOnChangeFontSizeNormal('large'))}
                       color={color('large')}
                       background={background('large')}
                       font='16px'
                   >
                       A
                   </Font>
               </Handle>
           </Choose>
           <Choose>
               <span>{headerLsi.image[locale]}</span>
               <Handle>
                   <Switch>
                       <InputCheckbox checked={images} onChange={()=>null} onClick={()=>dispatch(ClickOnOffImages())} type="checkbox" />
                       <SliderRound/>
                   </Switch>
               </Handle>
           </Choose>
           <Choose>
               <span>{headerLsi.colorSite[locale]}</span>
               <Handle>
                   <ColorStrong background='white' color='black' onClick={()=>dispatch(ClickOnOffWhiteTheme(true))}>A</ColorStrong>
                   <ColorStrong background='black' color='white'  onClick={()=>dispatch(ClickOnOffWhiteTheme(false))}>A</ColorStrong>
               </Handle>
           </Choose>
           <NormalVersion onClick={()=>dispatch(ClickVisuallyImpairedModeOff())}>
               <span>{headerLsi.normalVersion[locale]}</span>
               <Handle>
                       <Icon  src='/glassIconDark.svg'  width='30px' height='30px'/>
               </Handle>
           </NormalVersion>
       </NavVisually>
   )
}
export const NavBar =({navButtons,register,logIn})=>{
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const color=!visuallyImpairedModeWhiteTheme ? 'white' : 'black'
    return (
        <Nav>
            <LargeLinks>
                <Navmanu  color={color} role="navigation">
                    <ul>
                        {
                            navButtons.map((button,index)=>
                                button.children.length > 0 ?
                                    <li key={index}><a href="#" aria-haspopup="true">{button.title} <i className="fa fa-caret-down"/></a>
                                        <ul className="dropdown" aria-label="submenu">
                                            {
                                                button.children.map((el,i)=>
                                                    el.path.charAt(0) === '#' ?
                                                        <Link key={i} href={`/${el.path}`} passHref>
                                                            <li><a>{el.title}</a></li>
                                                        </Link>
                                                        :
                                                        <Link key={i} href={ParcUri(el.path)}>
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
                                    <Link key={index} href={ParcUri(button.path)}>
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

            <SignInMain  top='45px'>
                <Link href='/register'>
                    <RegisterLink color={color} >
                        {register}
                    </RegisterLink>
                </Link>
                <Link href='/logIn'>
                    <a>
                        <StyledButton  text={logIn} />
                    </a>
                </Link>
            </SignInMain>
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
export const NavBarMain =({footer,globeDarkIcon,searchBarColor,color,navButtons,glassIcon})=>{
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const router = useRouter()
    const locale = router.locale
    const {inputNewsByTitle} = useSelector(state=>state.news)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)

    return (
        <NavMain>
            <Links>
                <Navmanu color={!visuallyImpairedModeWhiteTheme ? 'white' : color} role="navigation">
                    <ul>
                        {
                            navButtons.map((button,indexNavBarMain)=>
                                button.children.length > 0 ?
                                    <li key={indexNavBarMain}>
                                        <a href="#" aria-haspopup="true">
                                        {button.title}
                                        <i  className="fa fa-caret-down"/>
                                        </a>
                                        <ul className="dropdown" aria-label="submenu">
                                            {
                                                button.children.map((el,index)=>
                                                    el.path.charAt(0) === '#' ?
                                                        <Link key={index} href={`/${el.path}`} passHref>
                                                            <li><a>{el.title}</a></li>
                                                        </Link>

                                                        :
                                                        <Link key={index} href={ParcUri(el.path)}>
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
                                    <Link key={indexNavBarMain} href={ParcUri(button.path)}>
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
            <ChangeLanguageAndSearchContainer>
                <ChangeLanguageContainer minWidth={visuallyImpairedMode ? 'none' : '220px'} >
                    <ChangeLanguageSelector globeDarkIcon={globeDarkIcon} />
                    <Glass display={visuallyImpairedMode ? 'none' : 'block'} onClick={()=>dispatch(ClickVisuallyImpairedModeOn())}>
                        <Icon  src={glassIcon}  width={'30px'} height='30px'/>
                    </Glass>
                </ChangeLanguageContainer>
                <SignIn>
                    <AnimationSearchBarStyled
                        background={footer && 'white'}
                        color={!visuallyImpairedModeWhiteTheme ? 'white' : searchBarColor}
                        inputFunc={(e)=>dispatch(OnchangeInputSearchNews(e.target.value,locale))}
                        value={inputNewsByTitle}
                        inputPlaceholder={headerLsi.inputPlaceholder[locale]}
                    />
                    <Link href='/logIn'>
                        <a>
                            <ArrowIcon
                                style={{fontSize:'29px',marginLeft:'20px'}}
                                color={!visuallyImpairedModeWhiteTheme ? 'white' : color}
                                displayUserIcon='none'
                                className="fa fa-user-circle"
                                aria-hidden="true"
                            />
                        </a>
                    </Link>
                </SignIn>
            </ChangeLanguageAndSearchContainer>
            <Burger footer={footer} color={!visuallyImpairedModeWhiteTheme ? 'white' : color}/>
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
margin-bottom:40px;
align-items: center;
margin-top:40px;
`

const ChangeLanguageContainer = styled.div`
display:flex;
justify-content: flex-end;
min-width:${props=>props.minWidth};
align-items: center;
margin-left:30px;
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
display:${props=>props.display};
margin-left:20px;
  cursor:pointer;
`
export const LinkIcon = styled.i`
    font-size: 16px;
    color:${props=>props.color};
`
const Logos = styled.div`
  display:flex;
  cursor:pointer;

    @media screen and ${device.laptop}{
    display:none;
  }
  a{
  border:${props=>props.border};
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

export const Footer =({inputName,contacts,display,minWidth})=>{
    const dispatch = useDispatch()
    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const {inputNewsByTitle} = useSelector(state=>state.news)
    const telegram = contacts.telegramLink && contacts.telegramLink
    const facebook = contacts.facebookLink && contacts.facebookLink
    const gmail = contacts.gmail && contacts.gmail
    const color = visuallyImpairedMode ? '#1D1D1B' : '#0072BC'
    const border = visuallyImpairedMode ? '1px solid' : 'unset'
    return (
        <FooterContainer>
            <Logos  border={border}>
                <a href={`https://telegram.im/${telegram}`}  target="_blank">
                    <LinkIcon color={color}  className="fa fa-paper-plane" aria-hidden="true"/>
                </a>
                <a href={facebook} target="_blank">
                    <LinkIcon  color={color} className="fa fa-facebook" aria-hidden="true"/>
                </a>
                <a href={`mailto:?subject=${gmail}`} target="_blank">
                    <LinkIcon color={color} className="fa fa-envelope" aria-hidden="true"/>
                </a>
            </Logos>


                <SearchBarStyled
                    display = 'none'
                    value={inputNewsByTitle}
                    border={border}
                    width='100%'
                    inputFunc={(e)=>dispatch(OnchangeInputSearchNews(e.target.value,locale))}
                    name={inputName}
                    inputPlaceholder={headerLsi.inputPlaceholder[locale]}/>

            <ChangeLanguageContainer minWidth={minWidth} position='relative'>
                    <ChangeLanguageSelector  theme='white' />
                    <Glass  display={display} onClick={()=>dispatch(ClickVisuallyImpairedModeOn())}>
                        <Icon  src='/glassIcon.svg'  width='30px' height='30px'/>
                    </Glass>
            </ChangeLanguageContainer>
        </FooterContainer>
    )
}
