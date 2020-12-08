import styled from "styled-components";
import {device} from "../deviceSizes/deviceSizes";

export  const LoaderContainer = styled.div`
display: flex;
margin-top:20px;
align-items:center;
`
export  const Title = styled.h1`
 @media screen and ${device.tablet} {
     margin-left:3%;
     font-size:20px;
  }
font-size:40px;
margin-bottom:10px;
margin-left: 10%;
`

export const Container = styled.div`
  width:100%;
  position:absolute;
  z-index:0;
  background-color: #F2F9FD;
  display:${props => props.display};
`
export const ContainerWrapper = styled.div`
  @media screen and ${device.tablet} {
    padding-bottom:20px;
     margin-left:3%;
      width:94%;
      flex-direction:column;
  }
    padding-bottom:40px;
  width:80%;
  margin-left:10%;
  display:flex;
  flex-direction:row;;
  flex: 1 1 301px;

`
export const Text = styled.div`
 @media screen and ${device.tablet} {
   width:100%;
   margin-right:unset;
       height: 100px;
  }
position:relative;
width:40%;
margin-right:10%;
`
export const SubTitle = styled.span`
font-size: 24px;
line-height: 15px;
`
export const IconBackground = styled.div`
 @media screen and ${device.tablet} {
   background-position: right; 
  }
width:100%;
height:100%;
position:absolute;
opacity:0.5;
z-index:0;
background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1000px-Apple_logo_black.svg.png');
  background-position: unset; 
  background-repeat: no-repeat; 
  background-size: contain; 
`
export const InputsFields = styled.div`
   @media screen and ${device.tablet} {
  width:100%;
  }
width:50%;
z-index:1;
`
export const Flex = styled.div`
  @media screen and ${device.laptop} {
   flex-direction:column;
  }
display:flex;
flex-direction:row;
justify-content:space-between;
`