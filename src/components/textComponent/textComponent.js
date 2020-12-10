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
  border-top:${props => props.border};
    display:flex;
   align-items: center;
   position:relative;
   padding-top: 20px;
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
const ArrowIcon = styled.i`
    display: flex;
    padding: 5px;
    font-size: 20px;
    color: #000000;
    border:1px solid #000000;
    border-radius:29px;
     @media screen and ${device.mobileL}{
   display:none;
  }
`
const StyledTextComponent =({title,excerpt,textForIcon ,date})=>{
    const border = excerpt ? 'unset' : '2px solid #1D1D1B;'
    return (
        <>
            <TitleForComponent text={title} fontSize='30px' />
            {
                excerpt &&
            <TextContent
                dangerouslySetInnerHTML={{ __html:excerpt }}
            />
            }
            <Review border={border}>
                <ArrowIcon
                    className="fa fa-long-arrow-right"
                    aria-hidden="true"
                />
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
