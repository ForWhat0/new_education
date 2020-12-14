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
  z-index: 3; 
  font-size:20px;
  @media screen and ${device.laptop}{
     font-size:25px;
  }
`
const Input = styled.input.attrs(props => ({
    type: "text",
    name:props.name,
    onChange:props.func,
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
    width: 0;
  position:absolute;
  right:0;
  z-index:2;
border-radius: 28px;
   @media screen and ${device.laptop}{
    padding: 9px 18px;
  }
    ${SearchBar}:hover & {
    width: 100px;
    background-color: white;
  }
`;
export const AnimationSearchBarStyled = ({color,inputName,inputFunc,inputPlaceholder})=>{
    return(
        <SearchBar>
            <Icon className="fa fa-search" aria-hidden="true"/>
            <Input color={color} name={inputName} func={inputFunc}  inputPlaceholder={inputPlaceholder}/>
        </SearchBar>
    )
}