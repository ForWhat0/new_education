import styled from 'styled-components'
import StyledTextComponent from "../textComponent/textComponent";
import {StyledDivWithIconBackGround} from "./backgroundWithIcon";
import {device} from "../deviceSizes/deviceSizes";
import {useSelector} from "react-redux";
import 'lazysizes'

const Container = styled.div`
min-height:${props=>props.minHeight};
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
margin-bottom:${props=>props.pBottom};
padding-bottom:${props=>props.pBottom};
border-bottom:${props=>props.bBottom};
flex-direction:${props => props.flexDirection};
@media screen and (max-width:950px) {
padding-top: 20px;
padding-bottom:20px;
flex-direction:column;     
  }
@media screen and ${device.tablet} {
width:93.6%;  
  }
`
const ImageContainer = styled.div`
margin-right: ${props=>props.rightImage};
justify-content: ${props=>props.justifyImage};
display: ${props=>props.display};
@media screen and (max-width:950px) {
   margin-right: unset;
   justify-content:center;
    width: 90%;
    margin-left: 5%;
  }
`
const Image = styled.img`
width:100%;
height:100%;
max-height: 288px;
max-width: 488px;
width:100%;
border-radius: 30px;
filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2));
@media screen and (min-width:1400px) {
   width: auto;
  }
`

const Text = styled.div`
width:100%;
color:${props=>props.color};
width:${props=>props.width};
margin-right: ${props=>props.rightText};
@media screen and (max-width:950px) {
   width: 100%;
   margin-right: unset;
   margin-bottom: 20px;
  }
  
h1{
margin:0;
@media screen and (max-width:950px) {
 margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
  @media screen and ${device.mobileL} {
    font-size:16px;
  }
}
div {
@media screen and ${device.mobileL} {
    font-size:12px;
  }
}

  
`

export default function Project(props) {
    const {images} = useSelector(state=>state.app)
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const background = props.background
    const rightText = props.flexDirection === 'row' ? 'unset' : '5%'
    const rightImage = props.flexDirection === 'row' ? '5%' : 'unset'
    const justifyImage = props.flexDirection === 'row' ? 'unset' : 'flex-end'
    const bBottom = !images ? !visuallyImpairedModeWhiteTheme ? '1px solid white' : '1px solid #000000' : 'unset'
    const pBottom = !images ? '20px' : 'unset'
    return (
                <Container minHeight={!images ? 'unset' : '350px'} background={visuallyImpairedMode ? 'none' : background}>
                    <StyledDivWithIconBackGround
                        align={props.backgroundIconAlign}
                        display={visuallyImpairedMode ? 'none' : props.backgroundIconDisplay}
                        src={props.backgroundIcon}/>
                        <ContainerWrapper bBottom={bBottom} pBottom={pBottom}  flexDirection={props.flexDirection}>
                            <ImageContainer display={images ? 'flex' : 'none'}  justifyImage={justifyImage} rightImage={rightImage}>
                                    <Image
                                        className="lazyload"
                                        data-src={props.coverImage?.sourceUrl}
                                    />
                            </ImageContainer>
                            <Text color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}  rightText={rightText}>
                                <StyledTextComponent
                                    offBorder={!images}
                                    title={props.title}
                                    excerpt={props.excerpt}
                                    textForIcon={props.textForIcon}
                                />
                            </Text>
                        </ContainerWrapper>
                </Container>

    )
}
