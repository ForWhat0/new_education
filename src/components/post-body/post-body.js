import styled from 'styled-components'

const StyledBlock = styled.div`
   display:flow-root;
  margin-top:40px;
  margin-bottom:50px;
  border-bottom:1px solid #1D1D1B;
  padding-bottom:30px;
  position:relative;
  && h2 {
   font-size:24px!important;
  font-weight:500!important;
  margin-bottom:20px!important;
  }
  && p{
  margin-bottom:40px;
  }
  && div ul li {
  list-style-type:none;
  }
`;


export default function PostBody({ content  }) {
    return (
        <StyledBlock>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </StyledBlock>
    )
}


const StyledBlockZNO = styled.div`
   display:flow-root;
  margin-bottom:50px;


  position:relative;
  line-height: 27px;
  && h2 {
   font-size:24px!important;
  font-weight:500!important;
  margin-bottom:20px!important;
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
    return (
        <StyledBlockZNO>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </StyledBlockZNO>
    )
}

