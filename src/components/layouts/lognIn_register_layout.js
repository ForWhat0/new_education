import styled from 'styled-components'
import Head from "next/head"
import Icon from "../icon/icon"
import {LogInLsi} from "../../Lsi/lsi"
import {device} from "../deviceSizes/deviceSizes"
import Link from "next/link"

const Global = styled.div`
display:flex;
height:100vh;
position:relative;
overflow: hidden;
`
const Welcome = styled.div`
width:51%;
height:100%;
position:relative;
display:flex;
justify-content:center;
align-items:center;
@media screen and ${device.tablet}{
   width:auto;
  }
`
const Fields = styled.div`
width:49%;
height:100%;
background: rgba(0, 174, 239, 0.08);
position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
  
  @media screen and ${device.tablet}{
 width:100%;
   background: transparent;
  } 
`
export const CircleBackground = styled.div`
    height: ${({ height }) => height };
    width: ${({ width }) => width };
    left:${({ left }) => left };
    right:${({ right }) => right };
    bottom:${({ bottom }) => bottom };
    top:${({ top }) => top };
    background: ${({ background }) => background };
    border: ${({ border }) => border };
    border-radius: 50%;
    position: absolute;
    z-index:${({ zIndex }) => zIndex || '1' };
    @media screen and ${device.tablet}{
display: ${({ display }) => display };
  } 
`
const Content = styled.div`

width:${({ width }) => width };
display: flex;
flex-direction: column;
text-align: center;
z-index:2;
 @media screen and ${device.laptop}{
width:80%;
  } 
    @media screen and ${device.tablet}{
display: ${({ display }) => display };
width:95%;
  } 
  
h1{
margin: 0 0 30px 0;
}

h2{
margin: 30px 0 0 0;
}
`

const Header = styled.header`
width:100%;
position:absolute;
top: 2%;
display:flex;
align-items:center;

span{
    width: 36px;
    height: 36px;
    background: black;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 5%;
    top: 2%;
    z-index: 3;
    cursor:pointer;
}

div{
    left: 15%;
    z-index: 3;
}
`
const Logo = styled.div`
opacity:0;
@media screen and ${device.tablet}{
opacity:1;
  } 
`
const StyledHeader = ()=>{
    return(
        <Header>
            <Link  href='/'>
                <a>
                    <Logo>
                        <Icon src={'/headerLogo.svg'} width='88px' height='36px' alt='headerLogo'/>
                    </Logo>
                </a>
            </Link>
            <Link href='/'>
                <a>
                    <span>X</span>
                </a>
            </Link>
        </Header>
    )
}
export default function LogInRegisterLayout ({locale,siteInfo,title,children}){
    return(
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="/fonts/e-Ukraine_font/e-Ukraine-Regular.woff2"
                />
                <link rel="shortcut icon" href={siteInfo?.iconSite?.sourceUrl} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={siteInfo?.descrSite} />
                <title>{siteInfo?.titleSite}</title>
            </Head>
            <Global>
                <StyledHeader/>
                <CircleBackground
                    height='50px'
                    right='0'
                    width='50px'
                    background='transparent'
                    border='15px solid white'
                />
                <CircleBackground
                    height='500px'
                    left='-250px'
                    width='500px'
                    background='rgba(0, 174, 239, 0.08);'
                    top='10%'
                />


                <Welcome>

                    <CircleBackground
                        height='30px'
                        right='10%'
                        top='14%'
                        width='30px'
                        background='rgba(0, 174, 239, 0.08)'
                    />
                    <CircleBackground
                        height='120px'
                        left='150px'
                        width='120px'
                        background='#FFFDED'
                        bottom='15%'
                    />

                    <Content width='auto' display='none'>
                        <Link  href='/'>
                            <a>
                                <h1>{LogInLsi.welcome[locale]}</h1>
                                <Icon src={'/headerLogo.svg'} width='140px' height='50px' alt='headerLogo'/>
                                <h2>{title && title}</h2>
                            </a>
                        </Link>
                    </Content>

                </Welcome>


                <Fields>

                    <CircleBackground
                        height='40px'
                        left='10%'
                        top='7%'
                        width='40px'
                        background='transparent'
                        border='10px solid white'
                    />
                    <CircleBackground
                        height='500px'
                        left='-250px'
                        width='500px'
                        bottom='-250px'
                        background='transparent'
                        border='25px solid white'
                        display='none'
                    />

                    <Content width='50%'>
                        {children}
                    </Content>

                </Fields>


            </Global>
        </>
    )
}
