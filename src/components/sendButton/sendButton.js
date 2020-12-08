import styled, {css,keyframes} from 'styled-components'
import StyledLoader from "../loader/loader";

const width = keyframes`
 0%   { width: 30%;  }
 50%{width: 5%;  }
  100% { width: 30%;  }
`;
const button = keyframes`
 0%   { color:white;  }
  100% { color:transparent; }
`;

const icon = keyframes`
 0%   { opacity:1;top:12px;left:20px; }
 50%{left:100%;};
  75% {  left:110%;top:-10px;color: black;}
   100%{
   opacity:0;
   }
`;
const ok = keyframes`
 0%   { left:100%; }
   100%{
   left:20px;
   }
`;
const loader = keyframes`
 0%   { left:100%; }
   100%{
   left:20px;
   }
`;
const BtnAnimation = props =>
    css`
    ${width} 1s linear forwards;
  `
const IconAnimation = props =>
    css`
    ${icon} 1s linear 0.5s forwards;
  `
const LoaderAnimation = props =>
    css`
    ${loader} 1s linear 0.5s forwards;
  `
const SearchBar = styled.span`
 position: relative;
 border:${props => props.border};
 border-radius:28px;
 position:${props => props.position};
 right:${props => props.right};
     display: flex;
    width:30%;
    animation:${props => props.loading && BtnAnimation};
`
const Icon = styled.i`
   position: absolute; 
   color: #FFFFFF;
   left:20px;
  z-index: 1; 
  top:12px;
  font-size:20px;
  animation: ${props => props.loading && IconAnimation};
`
const Succsess = styled.i`
   display:${props => props.done ? 'transparent' : 'white'};
   position: absolute; 
   color: green;
   left:20px;
  z-index: 1; 
  top:12px;
  font-size:20px;
   animation: ${props => props.animate ? `${ok} 1s linear 0.5s backwards` : "none"};
`
const Button = styled.button`
  background: #1D1D1B;
  border-radius: 28px;
  text-align:center;
  color: ${props => props.loading ? 'transparent' : 'white'};
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`
const SuccessText = styled.span`
 color:green;
 animation: ${ok} 1s linear 0.5s backwards;
`
const Text = styled.span`
 color:${props => props.loading ? 'white' : 'transparent'};
 animation: ${ok} 1s linear 0.5s backwards;
`
export const SendButton = ({done,loading,click,width})=>{
    return(
        <SearchBar loading={loading} done={done} onClick={click}  width={width}>
            <Icon done={done}  loading={loading} className="fa fa-paper-plane" aria-hidden="true"/>
            <Succsess done={done}  loading={loading} className="fa fa-check" aria-hidden="true"/>
            <Button>
                <SuccessText done={done} > OK</SuccessText>
                <Text done={done}  loading={loading}>Send</Text>
            </Button>
        </SearchBar>
    )
}