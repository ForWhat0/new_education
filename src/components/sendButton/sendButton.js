import styled, {css,keyframes} from 'styled-components'
import {useEffect, useState} from "react";

const width = keyframes`
 0%   { width: 212px; margin-right: 0  }
 50% {  margin-right: 212px;  width: 40px; }
  100% { width: 212px; margin-right: 0  }
`

const icon = keyframes`
 0%   {position:absolute;top:12px;}
 75% { position:absolute; top:12px; left:80%;color:white; }
  100% {position:absolute; left:125%;top:-20px;color:black;  }
`

const BtnAnimation = props =>
    css`
    ${width} 1.5s forwards ;
  `
const PaperIconAnimation = props =>
    css`
    ${icon} 1.5s forwards 0.8s ;
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
   color: #FFFFFF;
   left:20px;
  z-index: 1; 
  font-size:18px;
  position: initial;
  animation: ${props => props.animation};
`
const SuccessIcon = styled.i`
   display:${props => props.display};
   color: white;
   left:20px;
  z-index: 1; 
  top:12px;
  font-size:18px;
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
  display:flex;
  justify-content:center;
`
const SuccessText = styled.span`
 display:${props => props.display};
 color:white;
 margin-left:10px;
`
const Text = styled.span`
 display:${props => props.display};
  color:white;
  margin-left:10px;
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
export const SendButton = ({loading,click,sendText,sentText})=>{

    const [animation,setAnimation] = useState(false)
    const [animationFinished,setAnimationFinished] = useState(false)

    useEffect(()=>{
       if (loading){
           return startAnimation()
       }
    },[loading])

    const startAnimation = () => {
        setAnimation(true)
    }

    const onAnimationEnd = () => {
        setAnimationFinished(true)
        setTimeout(() =>{
                setAnimation(false)
                setAnimationFinished(false)
        },
            2000)
    }

    return(
        <Global>
            <ButtonContainer
                onClick={click}
                animation={animation  ? BtnAnimation : ''}
            >
                <Button disabled={loading}>
                    <PaperIcon
                        display={ animationFinished ? 'none' : 'block'}
                        onAnimationEnd={onAnimationEnd}
                        animation={animation ? PaperIconAnimation : '' }
                        className="fa fa-paper-plane"
                        aria-hidden="true"
                    />
                    <SuccessIcon display={animationFinished ? 'block' : 'none'} className="fa fa-check" aria-hidden="true"/>
                    <SuccessText display={animationFinished ? 'block' : 'none'} >{sentText}</SuccessText>
                    <Text display={animation ? 'none' : 'block'}>{sendText}</Text>
                </Button>
            </ButtonContainer>
        </Global>
    )
}