import {useSelector} from 'react-redux'
import styled from 'styled-components'

const AlertDiv = styled.div`
  width:80%;
  margin-left:10%;
  text-align:center;
  background-color: ${props => props.colorType};
  color:white;
  padding:10px;
      position: absolute;
    z-index: 1;
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