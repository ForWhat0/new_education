import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";

const Container = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  z-index:0;
  background: ${props => props.align} 50% / 25% auto no-repeat url(${props => props.src});
  display:${props => props.display};
  @media screen and ${device.tablet} {
   display:none;
  }
`


export const StyledDivWithIconBackGround =({display,src,align})=>{
    return (
        <Container src={src} display={display} align={align}/>
    )
}