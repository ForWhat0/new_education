import {useSelector} from 'react-redux'
import styled from 'styled-components'

const AlertDiv = styled.div`
  width:80%;
      position: fixed;
    top: 0;
    z-index: 3;
  margin-left:10%;
  text-align:center;
  background-color: ${props => props.colorType};
  color:white;
  padding:10px;
`

export const Alert = ()=>{
    const text  = useSelector(state=>{ return state.app.alert })
    const type = useSelector(state=>{ return state.app.type })
    const colorType = type === 'success' ? 'green' : 'red'
    return(
        <AlertDiv colorType={colorType}>
            {text ? text : 'somethings goes wrong'}
        </AlertDiv>
    )
}