import React from 'react'
import styled from 'styled-components'

const SearchBar = styled.span`
 position: relative;
 width:80%;
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
    placeholder :props.inputPlaceholder,
}))`
  ::placeholder,
  ::-webkit-input-placeholder {
    color: transparent;
  }
  :-ms-input-placeholder {
     color: transparent;
  }
  color: transparent;
  cursor:pointer;
   background-color: transparent;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #000000;
   transition: width 0.25s;    
    width: 60px;
  position:absolute;
  right:0;
  z-index:2;
border-radius: 28px;
&:hover  {
    width: 380px;
    color:red;
     ::placeholder,
  ::-webkit-input-placeholder {
    color: red;
  }
  :-ms-input-placeholder {
     color: red;
  }
  }
`;
export const AnimationSearchBarStyled = ({inputName,inputFunc,inputPlaceholder})=>{
    return(
        <SearchBar>
            <Icon className="fa fa-search" aria-hidden="true"/>
            <Input name={inputName} func={inputFunc}  inputPlaceholder={inputPlaceholder}/>
        </SearchBar>
    )
}