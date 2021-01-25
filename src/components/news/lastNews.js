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
import {device} from "../deviceSizes/deviceSizes";
import StyledLoader from "../loader/loader";


export const Back = styled.div`
width:100%;
background-color:${props => props.background};
padding:${props => props.padding};
`

export const Container = styled.div`
position:relative;
width:80%;
margin-left:10%;      
 @media screen and  ${device.tablet} {
    width: 93.6%;
  margin-left:3.2%;
  }
  @media screen and (max-width:650px) {
width: auto;
  }   
`
const Header = styled.div`
display:flex;
align-items:center; 
 @media screen and (max-width:650px) {
   width: 93.6%;
  }   
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
 cursor:pointer;
 flex: 1 1 250px;
 flex-direction: column;
 overflow: hidden;
 margin: 0 0 40px;
 padding: 0 20px 40px;
 min-height: 250px;
 position:relative;
 background-size: cover;
  transition: transform .2s linear;
    &:hover  {
    transform: scale(1.01);
  }
@media screen and (max-width:650px){
        min-width: 220px;
     flex: unset;
      padding: unset;
      margin: 10px 20px 10px 0;
  }
`
const ScrollBarStyledContainer = styled.div`
display:none;
 @media screen and (max-width:650px) {
   display:flex;
   justify-content:center;
  }
`
const ScrollBarStyled = styled.div`
   overflow-x: scroll;
    overflow-y: unset;
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
export default function LastNews({title,locale,padding,posts,pageInfo,background,buttonHide}){

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
        dispatch(actionGetNextNewsForMobile(!newsForMobileSliderReducer ? offsetMobile :  offsetMobile+3 , newsForMobile ,locale))
    }
    const prevNews=()=>{
        if (loading || !hasPreviousPage){
            return null
        }
        dispatch(actionGetNews(offset-3,locale))
    }

    const checkScroll = () => {
        const scrollWidth = inputRef.current.scrollWidth;
        const scrollBarWidth =   inputRef.current.offsetWidth
        const newScrollLeft = inputRef.current.scrollLeft;
        const medium = (parseInt(scrollWidth - scrollBarWidth) / 2)

        if (medium < parseInt(newScrollLeft)) {
            nextNewsForMobile()
        }
    };
    return(
        <section>
            <Back padding={padding} background={background}>
                <Container>
                    <Header>
                        <TitleForComponent marginTop='unset' text={title[locale]} fontSize='40px' />
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
                    <ScrollBarStyledContainer>
                        <ScrollBarStyled
                            ref={inputRef}
                            onScroll={checkScroll}
                        >
                            <ScrollBarStyledInner>

                                {newsForMobile.map(node =>
                                    <StyledContainer key={node.databaseId}>
                                        <News
                                            paddingBottom='41px'
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
                        {loading && <StyledLoader/>}
                    </ScrollBarStyledContainer>
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