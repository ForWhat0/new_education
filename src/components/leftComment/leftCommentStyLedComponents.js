import styled from "styled-components";
import {device} from "../deviceSizes/deviceSizes";

export  const LoaderContainer = styled.div`
display: flex;
margin-top:20px;
width:100%;
align-items:center;
`
export  const Title = styled.h1`
 @media screen and ${device.tablet} {
 width:93.6%;
     margin-left:3.2%;
     font-size:20px;
     padding-top: 10px;
  }
  width:40%;
font-size:40px;
margin-bottom:20px;
margin-left: 10%;
line-height: 30px;
`

export const Container = styled.div`
  width:100%;
  position:absolute;
  z-index:0;
  background-color: ${props=>props.background};
  display:${props => props.display};
`
export const ContainerWrapper = styled.div`
  @media screen and ${device.tablet} {
     margin-left:3.2%;
      width:93.6%;
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
export const TextZno = styled.div`
 @media screen and ${device.tablet} {
   width:100%;
   margin-top:unset;
   margin-right:unset;
       height: 100px;
  }
position:relative;
margin-top:50px;
width:40%;
margin-right:10%;
`
export const SubTitle = styled.span`
font-size: 24px;
line-height: 30px;
 @media screen and ${device.tablet} {
  font-size: 16px;
  }
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
background-image: url('/${props=>props.background}');
  background-position: unset; 
  background-repeat: no-repeat; 
  background-size: contain; 
`
export const IconBackgroundZNO = styled.div`
width:100%;
height:100%;
position:absolute;
background-position: right; 
opacity:0.5;
z-index:0;
background-image: url('/${props=>props.background}');
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
export const Select = styled.select`
margin-top: 5px;
 background-color: white;
  border: 1px solid #1D1D1B;
    box-sizing: border-box;
    border-radius: 9px;
    padding: 10px;
    width:100%;
  display: inline-block;
  line-height: 1.5em;
  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
   background-image:
    linear-gradient(45deg, transparent 50%, #1D1D1B 50%),
    linear-gradient(135deg, #1D1D1B 50%, transparent 50%);
  background-position:
    calc(100% - 20px) calc(2em - 10px), calc(100% - 15px) calc(2em - 10px), calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;

`
export const Label = styled.label`
font-weight: normal;
text-align:start;
font-size: 16px;
margin-bottom: 5px;
`
export const Flex = styled.div`
  @media screen and ${device.laptop} {
   flex-direction:column;
  }
display:flex;
flex-direction:row;
justify-content:space-between;
`