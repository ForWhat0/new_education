import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";
import {useSelector} from "react-redux";

const Title = styled.h1`
font-size:${props => props.fontSize};
font-weight:400;
width:100%;
line-height: ${props=>props.lineHeight};
margin-top:${props=>props.marginTop};
margin-bottom:${props => props.marginBottom};
padding-bottom:${props => props.paddingBottom};
border-bottom:${props => props.borderBottom};
position:relative;
div{
    display:${props=>props.display};
    position: absolute;
    width: 51px;
    height: 11px;
    z-index: -1;
    left: -15px;
    background: rgba(255, 222, 0, 0.35);
      bottom: 10px;
    @media screen and ${device.mobileL}{
height: 8px;
bottom: 7px;
  }
}

@media screen and ${device.mobileL}{
line-height: 30px;
font-size: 20px;
  }
`

export const TitleForComponent=({marginTop,lineHeight,displayYellowDiv,borderBottom,paddingBottom,text,fontSize,marginBottom})=>{
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    return(
        <Title
            marginTop={marginTop}
            display={visuallyImpairedMode || displayYellowDiv === false ? 'none' : 'block'}
            borderBottom={borderBottom}
            paddingBottom={paddingBottom}
            marginBottom={marginBottom}
            fontSize={fontSize}
            lineHeight={lineHeight ? lineHeight : '50px'}
        >
           <div/>
            {text}
        </Title>
    )
}