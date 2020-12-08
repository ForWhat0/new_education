import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
font-size:${props => props.fontSize};
font-weight:400;
margin-bottom:${props => props.marginBottom};
`

export const TitleForComponent=({text,fontSize,marginBottom})=>{
    return(
        <Title marginBottom={marginBottom} fontSize={fontSize}>
            {text}
        </Title>
    )
}