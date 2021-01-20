import {TitleForComponent} from "../titleForComponent/title";
import styled from "styled-components";
import {device} from "../deviceSizes/deviceSizes";
import {StyledButton} from "../button/button";
import {ProjectsLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import {ReviewButton} from "../button/reviewButton";


const TextContent = styled.div`
    margin-top:20px;
    border-top:${props => props.border};
    padding-top: 20px;
    @media screen and ${device.tablet} {
   flex-direction:column;
      margin-top:unset;
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

const StyledTextComponent =({offBorder,fontSize,paddingBottom,bottom,title,excerpt ,date})=>{
    const border = excerpt  ? 'unset' : '2px solid;'
    const position = bottom ? 'absolute' : 'relative'
    const width = bottom ? '100%' : 'auto'
    const router = useRouter()
    const locale = router.locale
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
                                            {date.slice(0, 10).split('-').reverse().join('.')}
                                        </StyledDate>
                                    }
                                </>
                        }
                    </Review>
            </>
    )
}

export default StyledTextComponent
