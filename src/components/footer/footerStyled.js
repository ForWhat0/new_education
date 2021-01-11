import styled from 'styled-components'
import {LinkIcon} from "../headers/headerStyledElements"
import Icon from "../icon/icon";
import {footer} from "../../Lsi/lsi";

export const FooterWrapper = styled.footer`
 background: #1D1D1B;
`
const LogosContainer = styled.div`
  display:flex;
  cursor:pointer;
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
`
const Wrapper = styled.div`
 width:80%;
 margin-left:10%;
 margin-top:30px;
`
export const Logos = ({telegram,facebook,gmail})=>{
    return (
        <Wrapper>
            <LogosContainer>
                <a href={`https://telegram.im/${telegram}`}  target="_blank">
                    <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                </a>
                <a href={facebook} target="_blank">
                    <LinkIcon  className="fa fa-facebook" aria-hidden="true"/>
                </a>
                <a href={`mailto:?subject=${gmail}`} target="_blank">
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
    @media screen and (max-width:1200px){
      flex-direction:column;
  }
`
const List = styled.ul`
text-align:${props=>props.align};
position:${props=>props.position};
right:${props=>props.right};
padding-left: unset;
@media screen and (max-width:1300px){
     position:unset;
  }
 @media screen and (max-width:1200px){
     text-align:unset;
  }
`
const ListElement = styled.li`
    margin: 0 0 20px 0;
    color:white;
    list-style-type: none;
`
const Link =styled.a`
color:rgb(0,114,188);
`
export const Text =({
    locale,
    adress,
    gmail,
    phoneNumber,
    group
})=>{
    return(
        <TextContainer>
            <List position='relative' right='unset'>
                <ListElement>
                    {footer.adress[locale]} {adress}
                </ListElement>
                <ListElement>
                    {footer.phoneNumber[locale]} {phoneNumber}
                </ListElement>
                <ListElement>
                    {footer.email[locale]} <Link href={`mailto:?subject=${gmail}`} target="_blank" >{gmail}</Link>
                </ListElement>
            </List>
            <List align='end' position='absolute' right='0'>
                <ListElement>
                    {footer.courses[locale]} <Link href={`mailto:?subject=${gmail}`} target="_blank">{gmail}</Link>
                </ListElement>
                <ListElement>
                    {footer.group[locale]} {group}
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
a{
opacity: 0.5;
&:hover{
opacity:1;
}
}
`
const DevelopText = styled.span`
color:${props=>props.color};
margin-right:10px;
text-align: center;
margin-bottom: ${props=>props.marginBottom};
`
export const Company =({authorship,locale})=>{
return(
    <CompanyContainer>
        <Develop >
            <DevelopText marginBottom='unset' color='white'>
                {footer.developBy[locale]}
            </DevelopText>
            <a href='https://flexreality.pro/' target='_blank'>
                <Icon src='/flexReality.svg' width='100px' height='50px' alt='Flex Reality' />
            </a>
        </Develop>
        <DevelopText marginBottom='40px' color='#4F4F4F'>{authorship}</DevelopText>
    </CompanyContainer>
)
}
