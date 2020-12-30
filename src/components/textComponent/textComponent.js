import {TitleForComponent} from "../titleForComponent/title";
import Icon from "../icon/icon";
import React from "react";
import styled from "styled-components";
import Date from "../date/date"
import {device} from "../deviceSizes/deviceSizes";


const TextContent = styled.div`
    margin-top:20px;
    border-top:2px solid #1D1D1B;
    padding-top: 20px;
    @media screen and ${device.tablet} {
   flex-direction:column;
      margin-top:unset;
       padding-top: unset;
  }
`
const Review = styled.div`
  bottom:0;
  width:${props=>props.width};
  border-top:${props => props.border};
    display:flex;
   align-items: center;
   position:${props=>props.position};
   padding-top: 20px;
    @media screen and ${device.mobileL}{
   display:none;
  }
}
`
const IconText = styled.div`
   margin-left:10px;
   font-weight:400;
   line-height:15px;  
`
const StyledDate = styled.div`
   position:absolute;
   right:0;
   @media screen and ${device.mobileL}{
    position:relative;
    right:unset;
  }
`
export const ArrowIcon = styled.div`
    background:url(/rightArrow.svg)no-repeat;
     width: 60%;
    background-size: contain;
    height: 80%;
    background-position: center;
`
export const ArrowContainer = styled.div`
    height: 30px;
    width: 30px;
    border: 1px solid;
    display: flex;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`
const StyledTextComponent =({fontSize,paddingBottom,bottom,title,excerpt,textForIcon ,date})=>{
    const border = excerpt ? 'unset' : '2px solid #1D1D1B;'
    const position = bottom ? 'absolute' : 'relative'
    const width = bottom ? '100%' : 'auto'
    return (
        <>
            <TitleForComponent displayYellowDiv={false} paddingBottom={paddingBottom} text={title} fontSize={fontSize || '30px'} />
            {
                excerpt &&
            <TextContent>
                {excerpt.substring(3, 200)}...
            </TextContent>


            }
            <Review width={width} position={position} border={border}>
                <ArrowContainer>
                    <ArrowIcon/>
                </ArrowContainer>
                <IconText>
                    {textForIcon}
                </IconText>
                {
                    date &&
                <StyledDate>
                    <Date date={date}/>
                </StyledDate>
                }
            </Review>
            </>
    )
}

export default StyledTextComponent
