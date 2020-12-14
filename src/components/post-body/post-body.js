import styled from 'styled-components'

const StyledBlock = styled.div`
  display:flow-root;
  margin-top:40px;
  margin-bottom:50px;
`;


export default function PostBody({ content }) {
    return (
        <StyledBlock>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </StyledBlock>
    )
}
