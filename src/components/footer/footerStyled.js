import styled from 'styled-components'
import {LinkIcon} from "../headers/headerStyledElements"
import Icon from "../icon/icon";

export const FooterWrapper = styled.footer`
 background: #1D1D1B;
`
const LogosContainer = styled.div`
  display:flex;
  cursor:pointer;
`
const Wrapper = styled.div`
 width:80%;
 margin-left:10%;
 margin-top:30px;
`
export const Logos = (telegram,facebook,gmail)=>{
    return (
        <Wrapper>
            <LogosContainer>
                <a href={telegram}  target="_blank">
                    <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                </a>
                <a href={facebook} target="_blank">
                    <LinkIcon  className="fa fa-facebook" aria-hidden="true"/>
                </a>
                <a href={gmail} target="_blank">
                    <LinkIcon  className="fa fa-envelope" aria-hidden="true"/>
                </a>
            </LogosContainer>
        </Wrapper>
    )
}
const TextContainer = styled.div`
    margin-top: 40px;
    position: relative;
    display: flex;
    margin-left: 10%;
    width: 80%;
    @media screen and (max-width:1150px){
      flex-direction:column;
  }
`
const List = styled.ul`
position:${props=>props.position};
right:${props=>props.right};
padding-left: unset;
 @media screen and (max-width:1150px){
     position:unset;
  }
`
const ListElement = styled.li`
    margin: 0 0 20px 0;
    color:white;
    list-style-type: none;
`
const Link =styled.a`
color:blue;
`
export const Text =()=>{
    return(
        <TextContainer>
            <List position='relative' right='unset'>
                <ListElement>
                    Адреса: вулиця Кудряшова, 12/14, місто Київ, 03035, Україна
                </ListElement>
                <ListElement>
                    Телефон: +38 (044) 520-17-00
                </ListElement>
                <ListElement>
                    Електронная пошта: <Link href='monitoring.kyiv@gmail.com'>monitoring.kyiv@gmail.com</Link>
                </ListElement>
            </List>
            <List position='absolute' right='0'>
                <ListElement>
                    Реєстрація на курси: <Link href='monitoring.kyiv@gmail.com'>monitoring.kyiv@gmail.com</Link>
                </ListElement>
                <ListElement>
                    Фейсбук: КНП "Освітня Агенція Міста Києва"
                </ListElement>
            </List>
        </TextContainer>
    )
}
const CompanyContainer = styled.div`
width:80%;
margin-left:10%;
display:flex;
align-items:center;
flex-direction:column;
`
const Develop = styled.div`
display:flex;
align-items:center;
`
const DevelopText = styled.span`
color:${props=>props.color};
margin-right:10px;
text-align: center;
margin-bottom: ${props=>props.marginBottom};
`
export const Company =()=>{
return(
    <CompanyContainer>
        <Develop >
            <DevelopText marginBottom='unset' color='white'>
                Копанія розробник
            </DevelopText>
            <Icon src='/flexReality.svg' width='100px' height='50px' alt='Flex Reality' />
        </Develop>
        <DevelopText marginBottom='40px' color='#4F4F4F'>© КНП «ОСВІТНЯ АГЕНЦІЯ МІСТА КИЄВА» 2007-2020</DevelopText>
    </CompanyContainer>
)
}
