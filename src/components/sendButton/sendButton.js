import styled, {css,keyframes} from 'styled-components'
import {device} from "../deviceSizes/deviceSizes"
import React from "react";

const width = keyframes`
 0%   { width: 212px;  }
 50%{width: 30px;  }
  100% { width: 212px%;  }
`

const icon = keyframes`
 0%   { opacity:1;top:12px;left:20px; }
 50%{left:100%;};
  75% {   display:block; left:110%;top:-10px;color: black;}
   100%{
  opacity:0;
   }
`

const BtnAnimation = props =>
    css`
    ${width} 0.5s linear ;
  `
const PaperIconAnimation = props =>
    css`
    ${icon} 0.5s linear 0.1s ;
  `
const ButtonContainer = styled.div`

 position: relative;
 height:43px;
 border-radius:28px;
    display: flex;
    width:212px;
   
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
  border:1px solid white;
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
const Global = styled.div`
width:100%;
    display: flex;
    position: relative;
justify-content:flex-end;
 @media screen and (max-width:500px) {
  justify-content:center;
  }
`
export const SendButton = ({done,error,loading,click,sendText,sentText,errorText})=>{
    const ButtonContainerAnimation = loading && BtnAnimation
    const IconPaperPlaneAnimation = loading && PaperIconAnimation
    const IconPaperDisplay =  done || error ? 'none' : 'block'
    const TextDisplay = !loading && !done && !error ? 'block' : 'none'
    const ErrorTextDisplay = error ? 'block' : 'none'
    const SuccessTextDisplay = done ? 'block' : 'none'
    return(
        <Global>
            <ButtonContainer animation={ButtonContainerAnimation} onClick={click}  >
                <PaperIcon   display={IconPaperDisplay} animation={IconPaperPlaneAnimation} className="fa fa-paper-plane" aria-hidden="true"/>
                <SuccessIcon display={SuccessTextDisplay} className="fa fa-check" aria-hidden="true"/>
                <ErrorIcon display={ErrorTextDisplay}  className="fa fa-exclamation" aria-hidden="true"/>
                <Button>
                    <SuccessText display={SuccessTextDisplay} >{sentText}</SuccessText>
                    <Text display={TextDisplay}>{sendText}</Text>
                    <ErrorText display={ErrorTextDisplay}>{errorText}</ErrorText>
                </Button>
            </ButtonContainer>
        </Global>
    )
}