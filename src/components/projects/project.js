import styled from 'styled-components'
import React from "react";
import {TitleForComponent} from '../titleForComponent/title'
import Icon from '../icon/icon'
import Link from "next/link";
import StyledTextComponent from "../textComponent/textComponent";
import {StyledDivWithIconBackGround} from "./backgroundWithIcon";
import {device} from "../deviceSizes/deviceSizes";

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
align-items: center;
flex-direction:${props => props.flexDirection};
@media screen and ${device.tablet} {
padding-top: 20px;
padding-bottom:20px;
   flex-direction:column;
       align-items: center;
  }
`
const ImageContainer = styled.div`
width: 45%;
margin-right: 5%;
display: flex;
@media screen and ${device.tablet} {
   width: 100%;
   margin-right: unset;
  }
`
const Image = styled.img`
max-height: 288px;
width:100%;
border-radius: 30px;
box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
@media screen and (min-width:1400px) {
   width: auto;
  }
`
const Text = styled.div`
width:50%;
margin-right: 5%;
@media screen and ${device.tablet} {
   width: 100%;
   margin-right: unset;
  }
`

export default function Project(props) {
    return (
        <Link href={`/projects/[slug]`} as={`/projects/${props.slug}`}>
            <a>
                <Container background={props.background}>
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
