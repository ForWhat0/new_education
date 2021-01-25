import styled from 'styled-components'
import {useSelector} from "react-redux";
import {device} from "../deviceSizes/deviceSizes";

const StyledBlock = styled.div`
   display:flow-root;
  margin-top:40px;
  margin-bottom:${props=>props.margin};
  border-bottom:1px solid ${props=>props.color};
  padding-bottom:30px;
  position:relative;
  && h2,h1 {
   font-size:24px!important;
  font-weight:500!important;
  margin-bottom:20px!important;
   @media screen and ${device.tablet}{
     font-size:16px!important;
  }
  }
  && p , div,li {
   @media screen and ${device.tablet}{
     font-size:12px!important;
  }
  }
  && a{
  display:block;
  }
  && p{
  margin-bottom:40px;
  }
  && div ul li {
  list-style-type:none;
  }
  
  figure{
  display:${props=>props.display}!important;
  justify-content: center;
  }
`;


export default function PostBody({ content  }) {
    const {images} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    return (
        <StyledBlock margin={!visuallyImpairedModeWhiteTheme ? 'unset' : '50px'}  color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'} display={!images ? 'none' : 'flex'}>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </StyledBlock>
    )
}


const StyledBlockZNO = styled.div`
   display:flow-root;
    margin-bottom:${props=>props.margin};
  border-bottom:1px solid ${props=>props.color};
  position:relative;
  line-height: 27px;
  && h2,h1 {
   font-size:24px!important;
  font-weight:500!important;
  margin-bottom:20px!important;
   @media screen and ${device.tablet}{
     font-size:16px!important;
  }
  }
  && p , div,li {
   @media screen and ${device.tablet}{
     font-size:12px!important;
  }
  }
  && ul{
      margin: 0 0 40px 0;
    padding: 0;
  }
  && ol{
    margin: 0 0 40px 0;
  padding-left: 20px;
  }
  && ul li {
  margin-bottom:20px;
  list-style-type:none;
   padding-left: 20px;
  }
  && div  ul li {
      border-left: 5px solid  #0072BC;
  }
  && div div ul li {
      border-left: 5px solid #FFDE00;   
  }
 
`;


export const  PostBodyZNO=({ content  }) =>{
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    return (
        <StyledBlockZNO
            margin={!visuallyImpairedModeWhiteTheme ? 'unset' : '50px'}  color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}
        >
            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </StyledBlockZNO>
    )
}

