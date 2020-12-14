import styled, {keyframes} from 'styled-components'
import React from "react"
import StyledTextComponent from "../textComponent/textComponent"
import Link from "next/link"
import {StyledButton} from "../button/button";
import {device} from "../deviceSizes/deviceSizes";

const ServiceContainer = styled.div`
 @media screen and ${device.mobileL} {
         border-bottom:none;
         margin-bottom:30px;
           padding-bottom: unset;
          justify-content: center;
  }
   display:flex ;
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
margin-left:30px;
   border-radius: 30px;
     position: relative;
    width:100px;
    height:100px;
    z-index: 1;
    opacity: 0.9;
`
const StyledText = styled.span`
@media screen and ${device.mobileL} {
     margin-left: unset;
    position: relative;
    margin-top:15px;
        font-size: 16px;
         width: auto;
  }
      text-align: initial;
    font-size: 24px;
    width: 150px;
    line-height: 30px;
    margin-left: 110px;
    z-index: 2;
    position: absolute;
`
const ButtonContainer = styled.div`
@media screen and ${device.mobileL} {
   display:none;
  }
`
export default function Service(props) {
    return (
        <Link href={`/service/[databaseId]`} as={`/service/${props.databaseId}`}>
            <Global>
                <ServiceContainer>
                    <ContainerWrapper>
                        <StyledPhoto
                            src={props.coverImage}
                        />
                        <StyledText>{props.title}</StyledText>
                    </ContainerWrapper>
                </ServiceContainer>
                <ButtonContainer>
                    <StyledButton text='Дізнатися більше'/>
                </ButtonContainer>
            </Global>
        </Link>
    )
}
