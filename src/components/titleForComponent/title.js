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
  @media screen and ${device.tablet}{
padding-bottom:${props => props.paddingBottom === '40px' ? '16px' : props => props.paddingBottom};
margin-bottom: ${props => props.paddingBottom === '40px' && 'unset'};;
  }
  @media screen and (max-width:650px){
line-height: 30px;
font-size:${props=>props.display === 'none' && '16px'}!important;
  }
  @media screen and ${device.mobileL}{
font-size: ${props=>props.display === 'none' ? '16px' : '20px'}!important;
  }
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