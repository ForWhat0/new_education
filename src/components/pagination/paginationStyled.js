import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes"

export const Container = styled.div`
margin-top:30px;
position:relative;
width:100%;
display:flex;
flex-direction:row;
align-items:center;   
justify-content:center;

ul{
display:flex;
padding: 0;
margin: 0;
}
`

export const NumberOfPage = styled.li`
list-style-type:none;
margin:0 15px 0 15px;
border-radius:28px;
padding: ${props=>props.current ? '5px 12px' : '5px 0'};
border:${props=>props.current && '1px solid #000'};
`

export const Arrows = styled.div`
display:block;
position:absolute;
display:flex;
flex-direction:row;
align-items:center;
top:0;
cursor:pointer;
opacity:${props => props.opacity};
right:${props => props.right};   
left: ${props => props.left};

span{
 margin: 0 20px 0 20px;
}

@media screen and ${device.laptop}{
  display:none;
  }
`