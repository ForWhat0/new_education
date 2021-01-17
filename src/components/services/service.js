import styled from 'styled-components'
import Link from "next/link"
import {StyledButton} from "../button/button";
import {device} from "../deviceSizes/deviceSizes";
import {services} from "../../Lsi/lsi";
import {useSelector} from "react-redux";

const ServiceContainer = styled.div`
 @media screen and ${device.mobileL} {
         border-bottom:none;
         margin-bottom:30px;
           padding-bottom: unset;
          justify-content: center;
  }
   display:flex ;
   justify-content: center;
       position: relative;
    border-bottom: ${props=>props.borderB};
    border-left: ${props=>props.borderL};
    border-right: ${props=>props.borderL};
    padding-bottom: 20px;
    cursor:pointer;
    margin-bottom: 50px;
`
const ContainerWrapper = styled.div`
 @media screen and ${device.mobileL} {
    flex-direction: column;
  }

  
    position: relative;

   display:flex ;
   align-items:center;
`
const Global = styled.div`
   
       text-align:center;
`
const StyledPhoto = styled.img`
margin-right:5px;
 @media screen and ${device.mobileL} {
     margin-left:unset;
  }
   display:${props=>props.display};
   border-radius: 30px;
     position: relative;
    width:100px;
    height:100px;
    z-index: 1;
    opacity: 0.9;
`
const StyledText = styled.span`
width:min-content;
@media screen and ${device.mobileL} {
     left:unset;
    position: relative;
    margin-top:15px;
        font-size: 16px;
         width: auto;
  }
      text-align: initial;
    font-size: 24px;
  
    line-height: 30px;
   
    z-index: 2;
    
`
const ButtonContainer = styled.div`
@media screen and ${device.mobileL} {
   display:none;
  }
`
export default function Service({locale,slug,coverImage,title,index}) {
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const {images} = useSelector(state=>state.app)
    const borderB = visuallyImpairedMode  || !visuallyImpairedMode && !images ? 'unset' : '1px solid'
    const borderL = visuallyImpairedMode && index === 1 && !images ? '1px solid' : 'unset'
    return (
        <Link  href={`/service/[slug]`} as={`/service/${slug}`}>
            <a>
                <Global>
                    <ServiceContainer borderL={borderL} borderB={borderB}>
                        <ContainerWrapper>
                            <StyledPhoto
                                display={ !images ? 'none' : 'block' }
                                src={coverImage}
                            />
                            <StyledText>{title}</StyledText>
                        </ContainerWrapper>
                    </ServiceContainer>
                    <ButtonContainer>
                        <StyledButton text={services.learnMore[locale]}/>
                    </ButtonContainer>
                </Global>
            </a>
        </Link>
    )
}
