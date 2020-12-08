import styled, {css,keyframes} from 'styled-components'
import {device} from "../deviceSizes/deviceSizes"
import React from "react";

const width = keyframes`
 0%   { width: 40%;  }
 50%{width: 10%;  }
  100% { width: 40%;  }
`;

const icon = keyframes`
 0%   { opacity:1;top:12px;left:20px; }
 50%{left:100%;};
  75% {   display:block; left:110%;top:-10px;color: black;}
   100%{
  opacity:0;
   }
`;

const BtnAnimation = props =>
    css`
    ${width} 1s linear;
  `
const PaperIconAnimation = props =>
    css`
    ${icon} 1s linear 0.5s ;
  `
const ButtonContainer = styled.div`
 @media screen and ${device.tablet} {
    left:30%;
  }
 position: relative;
 height:43px;
 border-radius:28px;
    display: flex;
    width:40%;
    left:60%;
    animation:${props => props.animation};
`
const PaperIcon = styled.i`
 display:${props => props.display};
   position: absolute; 
   color: #FFFFFF;
   left:20px;
  z-index: 1; 
  top:12px;
  font-size:20px;
  animation: ${props => props.animation};
`
const SuccessIcon = styled.i`
   display:${props => props.display};
   position: absolute; 
   color: green;
   left:20px;
  z-index: 1; 
  top:12px;
  font-size:20px;
   animation: ${props => props.animation};
`
const ErrorIcon = styled.i`
   display:${props => props.display};
   position: absolute; 
   color: red;
   left:20px;
  z-index: 1; 
  top:12px;
  font-size:20px;
   animation: ${props => props.animation};
`
const Button = styled.button`
  background: #1D1D1B;
  border: none;
  border-radius: 28px;
  text-align:center;
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`
const SuccessText = styled.span`
 display:${props => props.display};
 color:green;
`
const Text = styled.span`
 display:${props => props.display};
 color:white;
`
const ErrorText = styled.span`
  display:${props => props.display};
  color:red;
`

export const SendButton = ({done,error,loading,click})=>{
    const ButtonContainerAnimation = loading && BtnAnimation
    const IconPaperPlaneAnimation = loading && PaperIconAnimation
    const IconPaperDisplay =  done || error ? 'none' : 'block'
    const TextDisplay = !loading && !done && !error ? 'block' : 'none'
    const ErrorTextDisplay = error ? 'block' : 'none'
    const SuccessTextDisplay = done ? 'block' : 'none'
    return(
        <ButtonContainer animation={ButtonContainerAnimation} onClick={click}  >
            <PaperIcon   display={IconPaperDisplay} animation={IconPaperPlaneAnimation} className="fa fa-paper-plane" aria-hidden="true"/>
            <SuccessIcon display={SuccessTextDisplay} className="fa fa-check" aria-hidden="true"/>
            <ErrorIcon display={ErrorTextDisplay}  className="fa fa-exclamation" aria-hidden="true"/>
            <Button>
                <SuccessText display={SuccessTextDisplay} >OK</SuccessText>
                <Text display={TextDisplay}>Send</Text>
                <ErrorText display={ErrorTextDisplay}>Error</ErrorText>
            </Button>
        </ButtonContainer>
    )
}