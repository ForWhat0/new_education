import React from 'react'
import styled from 'styled-components'

const SearchBar = styled.span`
 position: relative;
 width:${props => props.width};
 border:${props => props.border};
 border-radius:28px;
 position:${props => props.position};
 right:${props => props.right}
`
const Icon = styled.i`
   position: absolute; 
  top:15px;!important;
  right: 20px; 
  z-index: 1; 
  font-size:20px;
`
const Input = styled.input.attrs(props => ({
    type: "text",
    name:props.name,
    onChange:props.func,
    placeholderTextColor: "red",
    placeholder :props.inputPlaceholder,
}))`
&.hasFocus:focus
font-family: 'Roboto', sans-serif;
  color: #333;
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  border: 1 px solid green;
  width: 100%;
  background: #FFFFFF;
border-radius: 28px;
`;
export const SearchBarStyled = ({right,position,width,inputName,inputFunc,inputPlaceholder,border})=>{
    return(
        <SearchBar right={right} position={position} border={border} width={width}>
            <Icon className="fa fa-search" aria-hidden="true"/>
            <Input name={inputName} func={inputFunc}  inputPlaceholder={inputPlaceholder}/>
        </SearchBar>
    )
}