import styled, {keyframes} from 'styled-components'
import React from "react"
import StyledTextComponent from "../textComponent/textComponent"
import Link from "next/link"
import {StyledButton} from "../button/button";
import {device} from "../deviceSizes/deviceSizes";
import {services} from "../../Lsi/lsi";

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
    border-bottom: 1px solid;
    padding-bottom: 20px;
    cursor:pointer;
    margin-bottom: 50px;
`
const ContainerWrapper = styled.div`
 @media screen and ${device.mobileL} {
    flex-direction: column;
  }
  width: 70%;
  
    position: relative;

   display:flex ;
   align-items:center;
`
const Global = styled.div`
       display: block;
       text-align:center;
`
const StyledPhoto = styled.img`
 @media screen and ${device.mobileL} {
     margin-left:unset;
  }

   border-radius: 30px;
     position: relative;
    width:100px;
    height:100px;
    z-index: 1;
    opacity: 0.9;
`
const StyledText = styled.span`
@media screen and ${device.mobileL} {
     left:unset;
    position: relative;
    margin-top:15px;
        font-size: 16px;
         width: auto;
  }
      text-align: initial;
    font-size: 24px;
    width: 150px;
    line-height: 30px;
    left:80px;
    z-index: 2;
    position: absolute;
`
const ButtonContainer = styled.div`
@media screen and ${device.mobileL} {
   display:none;
  }
`
export default function Service({locale,slug,coverImage,title}) {
    return (
        <Link href={`/service/[slug]`} as={`/service/${slug}`}>
            <Global>
                <ServiceContainer>
                    <ContainerWrapper>
                        <StyledPhoto
                            src={coverImage}
                        />
                        <StyledText>{title}</StyledText>
                    </ContainerWrapper>
                </ServiceContainer>
                <ButtonContainer>
                    <StyledButton text={services.learnMore[locale]}/>
                </ButtonContainer>
            </Global>
        </Link>
    )
}
