import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";
import {useSelector} from "react-redux";

const Title = styled.h1`
font-size:${props => props.fontSize};
font-weight:400;
width:100%;
line-height: 30px;
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
    bottom: 0;
    @media screen and ${device.mobileL}{
height: 8px;
bottom: 7px;
  }
}

@media screen and ${device.mobileL}{
font-size: 20px;
  }
`

export const TitleForComponent=({displayYellowDiv,borderBottom,paddingBottom,text,fontSize,marginBottom})=>{
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    return(
        <Title display={visuallyImpairedMode || displayYellowDiv === false ? 'none' : 'block'} borderBottom={borderBottom} paddingBottom={paddingBottom} marginBottom={marginBottom} fontSize={fontSize}>
           <div/>
            {text}
        </Title>
    )
}