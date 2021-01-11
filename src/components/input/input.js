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
    onChange:props.onChange,
    maxlength:props.maxlength
}))`
border: 1px solid #1D1D1B;
box-sizing: border-box;
border-radius: 9px;
padding:10px;
background:${props => props.background};
`;
export const Text = styled.label`
font-weight: normal;
text-align:start;
font-size: 16px;
margin-bottom: 5px;
`
export const InputStyled = ({background,maxlength,text,width,onChange,value})=>{
    return(
        <InputField width={width}>
            <Text>
                {text}
            </Text>
            <Input value={value} background={background} maxLength={maxlength || 20} onChange={onChange}/>
        </InputField>
    )
}