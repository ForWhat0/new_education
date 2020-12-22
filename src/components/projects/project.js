import styled from 'styled-components'
import React from "react";
import {TitleForComponent} from '../titleForComponent/title'
import Icon from '../icon/icon'
import Link from "next/link";
import StyledTextComponent from "../textComponent/textComponent";
import {StyledDivWithIconBackGround} from "./backgroundWithIcon";
import {device} from "../deviceSizes/deviceSizes";
import {hexToRgbA} from "../hooks/hooks";

const Container = styled.div`
min-height:350px;
background-color:${props => props.background};
width:100%;
display: flex;
align-items:center;
justify-content: center;
overflow: hidden;
position: relative;
`
const ContainerWrapper = styled.div`
z-index:1;
width:80%;
display:flex;

flex-direction:${props => props.flexDirection};
@media screen and ${device.tablet} {
padding-top: 20px;
width:94%;
padding-bottom:20px;
flex-direction:column;
     
  }
`
const ImageContainer = styled.div`
width: 45%;
margin-right: 5%;
display: flex;
@media screen and ${device.tablet} {
   margin-right: unset;
    width: 90%;
    margin-left: 5%;
  }
`
const Image = styled.img`
max-height: 288px;
width:100%;
border-radius: 30px;
filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2));
@media screen and (min-width:1400px) {
   width: auto;
  }
`
const Text = styled.div`
width:50%;
margin-right: 5%;
h1{
margin:0;
@media screen and ${device.tablet} {
 margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
}
@media screen and ${device.tablet} {
   width: 100%;
   margin-right: unset;
   margin-bottom: 20px;
  }
  
`

export default function Project(props) {

    const background = hexToRgbA(props.background)

    return (
        <Link href={`/projects/[slug]`} as={`/projects/${props.slug}`}>
            <a>
                <Container background={background}>
                    <StyledDivWithIconBackGround
                        align={props.backgroundIconAlign}
                        display={props.backgroundIconDisplay}
                        src={props.backgroundIcon}/>
                        <ContainerWrapper flexDirection={props.flexDirection}>
                            <ImageContainer>
                                <Image src={props.coverImage?.sourceUrl}/>
                            </ImageContainer>
                            <Text>
                                <StyledTextComponent
                                    title={props.title}
                                    excerpt={props.excerpt}
                                    textForIcon={props.textForIcon}
                                />
                            </Text>
                        </ContainerWrapper>
                </Container>
            </a>
        </Link>
    )
}
