import {useSelector} from "react-redux";
import {NewsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import News from "./news"
import StyledLoader from "../loader/loader";
import {device} from "../deviceSizes/deviceSizes";
const {review} = NewsLsi

const NewsContainer = styled.div`
@media screen and ${device.laptop}{
  grid-template-columns: 1fr 1fr;
  }
margin-top:40px;
gap: 30px;
grid-gap: 30px;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
`
const StyledContainer = styled.div`
 display:flex;
 cursor:pointer;
 flex-direction: column;
 overflow: hidden;
 margin: 0 0 40px;
 min-height: 250px;
 background-size: cover;
  transition: transform .2s linear;
    &:hover  {
    transform: scale(1.01);
  }
  @media (max-width: 1010px) {
     max-width: 100%;
  }
 @media (max-width: 768px) {
    flex-direction: column;
    padding-bottom: 40px;
    border-top: 0;
  }
`
export default function NewsWrapper({posts}){
    const {loading} = useSelector(state=>state.app)
    const {language} = useSelector(state=>state.app)
    return(
            <NewsContainer>
                {posts.map(node =>
                    <StyledContainer>
                        <News
                            databaseId={node.databaseId}
                            key={node.slug}
                            title={node.title}
                            coverImage={node.featuredImage?.node}
                            date={node.date}
                            slug={node.slug}
                            excerpt={node.excerpt}
                            textForIcon={review[language]}
                        />

                    </StyledContainer>
                )}
            </NewsContainer>
    )
}