import {TitleForComponent} from "../titleForComponent/title";
import {NewsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import {StyledButton} from '../button/button'
import {useDispatch, useSelector} from "react-redux";
import Link from 'next/link'
import NewsWrapper from "./newsWrapper";
import {actionGetNews, actionGetNextNewsForMobile} from "../../redux/actions/actions";
import News from "./news";
import {createRef} from "react";


export const Back = styled.div`
width:100%;
background-color:${props => props.background};
padding:${props => props.padding};
`

export const Container = styled.div`
position:relative;
width:80%;
margin-left:10%;      
 @media screen and (max-width:650px) {
   width:auto;
margin-left:unset;  
  }
`
const Header = styled.div`
display:flex;
align-items:center;    
`
export const IconContainer = styled.button`
margin-left:40px;  
cursor:pointer;
opacity:${props => props.opacity};
`
const Arrows = styled.div`
position:absolute;
display:flex;
align-items:center;
flex-direction:row;
right:0;    
 @media screen and (max-width:650px){
    display:none;
  }
`
const ButtonContainer = styled.div`
width:100%;
margin-top:40px;
display:${props => props.display};
justify-content:center;
`
 const ArrowIcon = styled.div`
  background:url(${props=>props.arrow}) no-repeat;
    display: flex;
   width:50px;
   height:30px;
   margin-left:40px;
    opacity:${props => props.opacity};
    cursor:pointer;
`
const StyledContainer = styled.div`
 display:flex;
 justify-content: center;
 cursor:pointer;
 flex: 1 1 250px;
 flex-direction: column;
 overflow: hidden;
 margin: 0 0 40px;
 padding: 0 20px 40px;
 min-height: 250px;
 background-size: cover;
  transition: transform .2s linear;
    &:hover  {
    transform: scale(1.01);
  }
@media screen and (max-width:650px){
        min-width: 240px;
     flex: unset;
      padding: 10px;
  }
`
const ScrollBarStyled = styled.div`
display:none;
 @media screen and (max-width:650px) {
   display:block;
   overflow-x: scroll;
    overflow-y: unset;
  }
`
const NewsForDesctop = styled.div`
display:block;
 @media screen and (max-width:650px) {
 display:none;
  }
`
const ScrollBarStyledInner = styled.div`
     display:flex;
 cursor:pointer;
 flex-direction: row;
`
export default function LastNews({locale,padding,posts,pageInfo,background,buttonHide}){

    const buttonDisplay = buttonHide ? 'none' : 'flex';
    const {loading} = useSelector(state=>state.app)
    const {newsReducer} = useSelector(state=>state.news)
    const {offset} = useSelector(state=>state.news)
    const {offsetMobile} = useSelector(state=>state.news)
    const {newsForMobileSliderReducer} = useSelector(state=>state.news)
    const {newsForMobileSliderReducerPageInfo} = useSelector(state=>state.news)
    const dispatch = useDispatch()
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const news = newsReducer?.data?.news?.nodes ? newsReducer.data.news.nodes : posts
    const newsForMobile = newsForMobileSliderReducer ? newsForMobileSliderReducer : posts

    const hasNextPageForMobile = newsForMobileSliderReducer ? newsForMobileSliderReducerPageInfo : pageInfo.offsetPagination.hasMore
    const hasNextPage = newsReducer?.data?.news?.pageInfo?.offsetPagination ? newsReducer.data.news.pageInfo.offsetPagination.hasMore : pageInfo.offsetPagination.hasMore
    const hasPreviousPage = newsReducer?.data?.news?.pageInfo?.offsetPagination ? newsReducer.data.news.pageInfo.offsetPagination.hasPrevious : pageInfo.offsetPagination.hasPrevious

    const inputRef = createRef();
    const nextNews=()=>{
        if (loading || !hasNextPage){
            return null
        }
        dispatch(actionGetNews(!newsReducer ? offset :  offset+3,locale))
    }
    const nextNewsForMobile=()=>{
        if (loading || !hasNextPageForMobile){
            return null
        }
        dispatch(actionGetNextNewsForMobile(!newsForMobileSliderReducer ? offsetMobile :  offsetMobile+3 ,!newsForMobileSliderReducer ? newsForMobile :  null,locale))
    }
    const prevNews=()=>{
        if (loading || !hasPreviousPage){
            return null
        }
        dispatch(actionGetNews(offset-3,locale))
    }

    const checkScroll = () => {
        const scrollWidth = inputRef.current.scrollWidth;
        const scrollBarWidth =  inputRef.current.offsetWidth
        const newScrollLeft = inputRef.current.scrollLeft;
        if (parseInt(scrollWidth - scrollBarWidth) === parseInt(newScrollLeft) ) {
            nextNewsForMobile()
        }
    };
    return(
        <section>
            <Back padding={padding} background={background}>
                <Container>
                    <Header>
                        <TitleForComponent marginTop='unset' text={NewsLsi.otherNews[locale]} fontSize='40px' />
                        <Arrows>
                            <ArrowIcon
                                arrow={!visuallyImpairedModeWhiteTheme ? '/WhiteLeftArrow.svg' : '/leftArrow.svg'}
                                aria-hidden="true"
                                opacity={loading || !hasPreviousPage ? '0.5' : 'unset'}
                                onClick={()=>prevNews()}
                            />
                            <ArrowIcon
                                arrow={!visuallyImpairedModeWhiteTheme ? '/WhiteRightArrow.svg' : '/rightArrow.svg'}
                                aria-hidden="true"
                                opacity={loading || !hasNextPage ? '0.5' : 'unset'}
                                onClick={()=>nextNews()}
                            />
                        </Arrows>
                    </Header>
                    <NewsForDesctop>
                        <NewsWrapper  posts={news}/>
                    </NewsForDesctop>
                    <ScrollBarStyled
                        ref={inputRef}
                        onScroll={checkScroll}
                    >
                        <ScrollBarStyledInner>
                            {newsForMobile.map(node =>
                                <StyledContainer key={node.databaseId}>
                                    <News
                                        databaseId={node.databaseId}
                                        key={node.slug}
                                        title={node.title}
                                        coverImage={node.featuredImage?.node}
                                        date={node.date}
                                        slug={node.slug}
                                        excerpt={node.excerpt}
                                    />

                                </StyledContainer>
                            )}
                        </ScrollBarStyledInner>
                    </ScrollBarStyled>
                    <ButtonContainer display={buttonDisplay}>
                        <Link href={'/news'}>
                            <a>
                                <StyledButton
                                    text={NewsLsi.moreNews[locale]}/>
                            </a>
                        </Link>
                    </ButtonContainer>
                </Container>
            </Back>
        </section>
    )
}