import {TitleForComponent} from "../titleForComponent/title";
import Icon from "../icon/icon";
import React, {useEffect} from "react";
import styled from "styled-components";
import Date from "../date/date"
import {device} from "../deviceSizes/deviceSizes";
import {StyledButton} from "../button/button";
import {ProjectsLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import animationButton, {animationForArrowButton} from "../button/animationButton";
import {useSelector} from "react-redux";
import {ReviewButton} from "../button/reviewButton";


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

const StyledDate = styled.div`
   position:absolute;
   right:0;
   @media screen and ${device.mobileL}{
    position:relative;
    right:unset;
  }
`

const StyledTextComponent =({id,offBorder,fontSize,paddingBottom,bottom,title,excerpt,textForIcon ,date})=>{
    const border = excerpt  ? 'unset' : '2px solid;'
    const position = bottom ? 'absolute' : 'relative'
    const width = bottom ? '100%' : 'auto'
    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    return (
        <>
            <TitleForComponent
                lineHeight='30px'
                displayYellowDiv={false}
                paddingBottom={paddingBottom}
                text={title}
                fontSize={fontSize || '30px!important'} />
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
                                    <ReviewButton/>
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
