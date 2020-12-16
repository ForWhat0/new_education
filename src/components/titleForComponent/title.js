import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";

const Title = styled.h1`
font-size:${props => props.fontSize};
font-weight:400;
width:100%;
margin-bottom:${props => props.marginBottom};
padding-bottom:${props => props.paddingBottom};
border-bottom:${props => props.borderBottom};
@media screen and ${device.mobileL}{
font-size: 20px;
  }
`

export const TitleForComponent=({borderBottom,paddingBottom,text,fontSize,marginBottom})=>{
    return(
        <Title borderBottom={borderBottom} paddingBottom={paddingBottom} marginBottom={marginBottom} fontSize={fontSize}>
            {text}
        </Title>
    )
}