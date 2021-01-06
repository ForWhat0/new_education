import {TitleForComponent} from "../titleForComponent/title";
import Icon from "../icon/icon";
import React from "react";
import styled from "styled-components";
import Date from "../date/date"
import {device} from "../deviceSizes/deviceSizes";
import {StyledButton} from "../button/button";
import {ProjectsLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";


const TextContent = styled.div`
    margin-top:20px;
    border-top:${props => props.border};
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
   padding-top: ${props=>props.pTop};
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
background-color: white;
    height: 30px;
    width: 30px;
    border: 1px solid;
    display: flex;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`
const StyledTextComponent =({offBorder,fontSize,paddingBottom,bottom,title,excerpt,textForIcon ,date})=>{
    const border = excerpt  ? 'unset' : '2px solid;'
    const position = bottom ? 'absolute' : 'relative'
    const width = bottom ? '100%' : 'auto'
    const router = useRouter()
    const locale = router.locale
    return (
        <>
            <TitleForComponent displayYellowDiv={false} paddingBottom={paddingBottom} text={title} fontSize={fontSize || '30px!important'} />
            {
                excerpt &&
            <TextContent border={offBorder ? 'unset' : '2px solid;'}>
                {excerpt.substring(3, 200)}...
            </TextContent>


            }
                    <Review pTop={offBorder ? '40px' : '20px'} width={width} position={position} border={border}>
                        {
                            offBorder ?
                                <StyledButton text={ProjectsLsi.review[locale]}/>
                                :
                                <>
                                    <ArrowContainer>
                                        <ArrowIcon/>
                                    </ArrowContainer>
                                    <IconText>
                                        {ProjectsLsi.review[locale]}
                                    </IconText>
                                    {
                                        date &&
                                        <StyledDate>
                                            <Date date={date}/>
                                        </StyledDate>
                                    }
                                </>
                        }
                    </Review>
            </>
    )
}

export default StyledTextComponent
