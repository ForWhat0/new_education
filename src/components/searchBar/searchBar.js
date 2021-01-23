import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";

const SearchBar = styled.span`
 position: relative;
     display: flex;
    align-items: center;
 width:${props => props.width};
 border:${props => props.border};
 border-radius:28px;
 position:${props => props.position};
 right:${props => props.right};
 @media screen and (max-width:1200px){
   width:${props => props.width === '60%' && '50%'};
  }
  @media screen and ${device.laptop}{
    display:${props=>props.display ? props.display : 'flex'};
  }
`
const Icon = styled.i`
   position: absolute; 
  right: 15px; 
  z-index: 1; 
  font-size:20px;
`
const Input = styled.input.attrs(props => ({
    type: props.type,
    value:props.value,
    name:props.name,
    onChange:props.func,
    placeholder :props.inputPlaceholder,
}))`
@media screen and ${device.mobileL}{
   font-size: 16px;
  }
&.hasFocus:focus
  color: #333;
 padding-top: 10px;
    padding-left: 20px;
    padding-bottom: 10px;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  border: none;
  width: 100%;
  background: #FFFFFF;
border-radius: 28px;
`;
export const SearchBarStyled = ({display,ref,value,type,maxlength,right,position,width,inputName,inputFunc,inputPlaceholder,border})=>{
    return(
        <SearchBar display={display} right={right} position={position} border={border} width={width}>
            <Icon className="fa fa-search" aria-hidden="true"/>
            <Input autocomplete="off" ref={ref} type={type} value={value} maxLength={maxlength}  name={inputName} func={inputFunc}  inputPlaceholder={inputPlaceholder}/>
        </SearchBar>
    )
}