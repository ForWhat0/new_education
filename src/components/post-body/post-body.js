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
