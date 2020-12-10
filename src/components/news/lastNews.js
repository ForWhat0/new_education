import {TitleForComponent} from "../titleForComponent/title";
import {NewsLsi} from "../../Lsi/lsi"
import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import {StyledButton} from '../button/button'
import Icon from "../icon/icon";
import {useDispatch, useSelector} from "react-redux";
import Link from 'next/link'
import NewsWrapper from "./newsWrapper";
import {actionGetNews, actionGetNextNewsForMobile} from "../../redux/actions/actions";
import News from "./news";
import {device} from "../deviceSizes/deviceSizes";


const {button} = NewsLsi

export const Back = styled.div`
width:100%;
background-color:${props => props.background};
`

export const Container = styled.div`
position:relative;
width:80%;
margin-left:10%;      
 @media screen and ${device.mobileL} {
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
flex-direction:row;
right:0;    
 @media screen and ${device.mobileL}{
    display:none;
  }
`
const ButtonContainer = styled.div`
width:100%;
margin-top:40px;
display:${props => props.display};
justify-content:center;
`
const ArrowIcon = styled.i`
    display: flex;
    padding: 20px;
    font-size: 50px;
    color: #000000;
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
@media screen and ${device.mobileL}{
        min-width: 240px;
     flex: unset;
      padding: 10px;
  }
`
const ScrollBarStyled = styled.div`
display:none;
 @media screen and ${device.mobileL} {
   display:block;
   overflow-x: scroll;
    overflow-y: unset;
  }
`
const NewsForDesctop = styled.div`
display:block;
 @media screen and ${device.mobileL} {
 display:none;
  }
`
const ScrollBarStyledInner = styled.div`
     display:flex;
 cursor:pointer;
 flex-direction: row;
`
export default function LastNews({title,language,posts,pageInfo,background,buttonHide,fetchMoreNews}){
    const buttonDisplay = buttonHide ? 'none' : 'flex';
    const {loading} = useSelector(state=>state.app)
    const {newsReducer} = useSelector(state=>state.news)
    const {allNewsForMobileSliderReducer} = useSelector(state=>state.news)
    const dispatch = useDispatch()
    const pageInfos = newsReducer?.data ? newsReducer.data.news.pageInfo : pageInfo
    const pageInfosForMobile = allNewsForMobileSliderReducer?.data ? allNewsForMobileSliderReducer.data.news.pageInfo : pageInfo
    const news = newsReducer?.data?.news?.nodes ? newsReducer.data.news.nodes : posts
    const newsForMobile = allNewsForMobileSliderReducer?.data?.news?.nodes ? allNewsForMobileSliderReducer.data.news.nodes : posts
    const after = newsReducer?.data?.news?.pageInfo ? newsReducer.data.news.pageInfo.endCursor : pageInfo.endCursor
    const before = newsReducer?.data?.news?.pageInfo ? newsReducer.data.news.pageInfo.startCursor : pageInfo.startCursor
    const inputRef = React.createRef();
    const nextNews=()=>{
        if (loading || !pageInfos.hasNextPage){
            return null
        }
        dispatch(actionGetNews({first:3,last:null,after,before:null}))
    }
    const nextNewsForMobile=()=>{
        if (loading || !pageInfosForMobile.hasNextPage){
            return null
        }
        dispatch(actionGetNextNewsForMobile())
    }
    const prevNews=()=>{
        if (loading || !pageInfos.hasPreviousPage){
            return null
        }
        dispatch(actionGetNews({first:null,last:3,before,after:null}))
    }

    const checkScroll = e => {
        const scrollWidth = inputRef.current.scrollWidth;
        const scrollBarWidth =  inputRef.current.offsetWidth
        const newScrollLeft = inputRef.current.scrollLeft;
        console.log(scrollWidth,scrollBarWidth,newScrollLeft)
        if (parseInt(scrollWidth - scrollBarWidth) === parseInt(newScrollLeft) ) {
            nextNewsForMobile()
            console.log('asd')
        }
    };

    return(
        <section>
            <Back background={background}>
                <Container>
                    <Header>
                        <TitleForComponent text='Останні новини' fontSize='40px' />
                        <Arrows>
                            <ArrowIcon
                                className="fa fa-long-arrow-left"
                                aria-hidden="true"
                                opacity={loading || !pageInfos.hasPreviousPage ? '0.5' : 'unset'}
                                onClick={()=>prevNews()}
                            />
                            <ArrowIcon
                                className="fa fa-long-arrow-right"
                                aria-hidden="true"
                                opacity={loading || !pageInfos.hasNextPage ? '0.5' : 'unset'}
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
                                <StyledContainer>
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
                                    func={()=> {
                                        return null }}
                                    text='Більше новин'/>
                            </a>
                        </Link>
                    </ButtonContainer>
                </Container>
            </Back>
        </section>
    )
}