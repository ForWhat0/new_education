import styled from 'styled-components'

const Button = styled.button`
  background: #1D1D1B;
  border-radius: 28px;
  text-align:center;
  color: #FFFFFF;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
   transition: transform .1s linear;
    &:hover  {
    transform: scale(1.01);
  }
`


export const StyledButton =({text,func})=>{
    return (
        <Button  onClick={()=>func()}>
            {text}
        </Button>
    )
}