import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";

const Title = styled.h1`
font-size:${props => props.fontSize};
font-weight:400;
margin-bottom:${props => props.marginBottom};
@media screen and ${device.mobileL}{
font-size: 20px;
  }
`

export const TitleForComponent=({text,fontSize,marginBottom})=>{
    return(
        <Title marginBottom={marginBottom} fontSize={fontSize}>
            {text}
        </Title>
    )
}