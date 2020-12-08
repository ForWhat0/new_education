import styled,{keyframes} from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
align-self: center;
position:absolute;
    border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 30px;
  height: 30px;
   animation: ${rotate} 2s linear infinite;
`
const StyledLoader =()=>{
    return <Loader></Loader>
}
export default StyledLoader