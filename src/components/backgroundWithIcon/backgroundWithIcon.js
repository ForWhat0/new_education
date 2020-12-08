import styled from 'styled-components'

const Container = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  opacity:0.5;
  z-index:0;
  background: ${props => props.align} 50% / 25% auto no-repeat url(${props => props.src});
  display:${props => props.display};
`


export const StyledDivWithIconBackGround =({display,src,align})=>{
    return (
        <Container src={src} display={display} align={align}>

        </Container>
    )
}