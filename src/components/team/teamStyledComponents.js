import styled from "styled-components";
import {device} from "../deviceSizes/deviceSizes";

export const PhotoContainer = styled.div`
   position: relative;
    border-radius: 3px;
    margin-bottom:20px;
    flex: none;
    margin-bottom: 0;
     text-align: center;
    display: flex;
    justify-content: center;
  width: 100%;
    height: 100%;
`
export const EmployerContainer = styled.div`
    height: 360px;
  text-align: center;
    position: relative;
    @media screen and ${device.tablet}{
    height: 250px;
  }
`
export const EmployerPhoto = styled.img`
margin-bottom:20px;
object-fit: cover;
box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
width:100%;    
  top:${props => props.top};
  height: 100%;
    position: absolute;
    left: 0;
  border-radius: 30px;
   @media screen and ${device.tablet}{
 top:unset;
 height: ${props => props.height};
 margin-bottom:unset;
  }
`
export const EmployerName = styled.div`
display:${props => props.display};
    font-size: 24px;
        position: absolute;
    bottom: 0px;
      @media screen and ${device.tablet}{
  font-size: 12px;
  }
`
export const Global = styled.div`

width:100%;
display:flex;
margin: 40px 0 40px 0;
flex-direction:row;
 @media screen and (max-width: 1290px){
    height: auto;
    flex-direction:column;
  }
`
export const Text = styled.div`
background-color:rgba(157, 157, 157, 0.08);
width: 44%;
height:453px;
 @media screen and (max-width: 1290px){
  width: 100%;
  margin-bottom:20px;
  height:auto;
  }

`
export const TextInner = styled.div`
max-width: 25%;
display:flex;
flex-direction:column;
    margin-left: 10%;
    position:absolute;
    display: flex;
        margin-top: 50px;
        
  
  @media screen and (max-width: 1290px){
  max-width: 50%;
  position: relative;
  margin-right: unset;
  margin-left: 10%;
  margin-top: unset;
  }
  @media screen and ${device.tablet}{
 margin-top: unset;
 margin-left: 2%;
 max-width: unset;
width:94%;
  }
`
export const SwiperContainer = styled.div`
    width: 50%;
    right: 0;
    position: absolute;
    margin-right: 10%;
    overflow: hidden;
 
  @media screen and (max-width: 1290px){
  width: 80%;
  position: relative;
  margin-right: unset;
  margin-left: 10%;
  }
   @media screen and ${device.tablet}{
  width: 94%;
  margin-left: 20px;
  }
  @media screen and ${device.mobileL}{
  width: 100%;
  margin-left: unset;
  }
`
export const CommandText = styled.p`
        letter-spacing: 1px;
    font-size: 20px;
    @media screen and (max-width: 1290px){
font-size: 12px;
  }
`
export const Arrows = styled.div`
display:flex;
margin-top:50px;
@media screen and (max-width: 1290px){
  display:none;
  }
`
export const ArrowsMobile = styled.div`
display:flex;
padding-top: 30px;
height:50px;
align-items:center;
 display:none;
@media screen and (max-width: 1290px){
  display:block;
  }
`
export const ArrowIcon = styled.div`
    background:url(${props=>props.arrow}) no-repeat;
    display: flex;
   width:50px;
   height:50px;
     background-position: center;
    background-size: contain;
   margin-right:40px;
    opacity:${props => props.opacity};
    cursor:pointer;
`
export const ArrowIconMobile = styled.div`
   position: absolute;
   background-position: center;
    background-size: contain;
 background:url(${props=>props.arrow}) no-repeat;
  width:50px;
   height:50px;
    cursor: pointer;
    left: ${props => props.left};
    right: ${props => props.right};
`