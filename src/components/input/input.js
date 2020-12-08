import styled from 'styled-components'

const InputField = styled.div`
display:flex;
flex-direction: column;
 width:${props => props.width};
`
const Input = styled.input.attrs(props => ({
    type: "text",
    name:props.name,
    onChange:props.func
}))`
border: 1px solid #1D1D1B;
box-sizing: border-box;
border-radius: 9px;
`;
const Text = styled.span`
font-weight: normal;
font-size: 16px;
color: #1D1D1B;
`
export const InputStyled = ({width,inputName,inputFunc,inputPlaceholder})=>{
    return(
        <InputField width={width}>
            <Text>
                text
            </Text>
            <Input name={inputName} func={inputFunc}/>
        </InputField>
    )
}