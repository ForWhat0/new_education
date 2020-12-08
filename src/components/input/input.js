import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";

const InputField = styled.div`
@media screen and ${device.laptop} {
   width:100%;
  }
display:flex;
margin-bottom:20px;
flex-direction: column;
 width:${props => props.width};
`
const Input = styled.input.attrs(props => ({
    type: "text",
    onChange:props.onChange
}))`
border: 1px solid #1D1D1B;
box-sizing: border-box;
border-radius: 9px;
padding:10px;
`;
const Text = styled.span`
font-weight: normal;
font-size: 16px;
margin-bottom: 5px;
color: #1D1D1B;
`
export const InputStyled = ({text,width,onChange})=>{
    return(
        <InputField width={width}>
            <Text>
                {text}
            </Text>
            <Input onChange={onChange}/>
        </InputField>
    )
}