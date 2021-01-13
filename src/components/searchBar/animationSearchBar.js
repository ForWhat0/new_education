import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";

const SearchBar = styled.span`
 position: relative;
 margin-right: 10px;
 display: flex;
    align-items: center;
 border:${props => props.border};
 border-radius:28px;
 position:${props => props.position};
 right:${props => props.right}
`
const Icon = styled.i`
   position: absolute; 
  right: 7px; 
  color:black;
  z-index: 3; 
  font-size:20px;
  @media screen and ${device.laptop}{
     font-size:25px;
  }
`
const Input = styled.input.attrs(props => ({
    name:props.name,
    onChange:props.func,
    value:props.value,
    placeholder :props.inputPlaceholder,
}))`
  ::placeholder,
  ::-webkit-input-placeholder {
    color:  #4F4F4F;
  }
  :-ms-input-placeholder {
     color:  #4F4F4F;
  }
  color: black;
  cursor:pointer;
   background-color: ${props=>props.color};
  padding: 5px 15px;
  font-size: 16px;
  border: 1px solid #000000;
   transition: width 0.25s;    
    width: ${props=>props.value ? '150px' : '0'};
  right:0;
  z-index:2;
border-radius: 28px;
   @media screen and ${device.laptop}{
    padding: 9px 18px;
  }
    ${SearchBar}:hover & {
    width: 150px!important;
    background-color: white;
  }
`;
export const AnimationSearchBarStyled = ({value,color,inputName,inputFunc,inputPlaceholder})=>{
    return(
        <SearchBar>
            <Icon className="fa fa-search" aria-hidden="true"/>
            <Input color={color}
                   autocomplete="off"
                   maxLength='20'
                   value={value}
                   name={inputName}
                   func={inputFunc}
                   inputPlaceholder={inputPlaceholder}/>
        </SearchBar>
    )
}