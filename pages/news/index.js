import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import GET_NEWS from "../../src/queries/getNews"
import NewsWrapper from "../../src/components/news/newsWrapper"
import styled from 'styled-components'
import {formatDate, ParcMenu, startEndPagination} from "../../src/components/hooks/hooks";
import {Pagination} from "../../src/components/pagination/pagination";
import React, {useEffect, useState} from "react";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import Calendar from "react-calendar";
import {SearchBarStyled} from "../../src/components/searchBar/searchBar";
import {device} from "../../src/components/deviceSizes/deviceSizes";
import reduxClient from "../../src/apollo/reduxClient";
import {SEARCH_EVENTS_BY_TITLE} from "../../src/queries/search_events_by_title";
import GET_NEWS_BY_DATE from "../../src/queries/get_news_by_date";
import StyledLoader from "../../src/components/loader/loader";

const Container = styled.div`
width:80%;
margin-left:10%;
`
const Input = styled.div`
position:absolute;
right:80px;
width:350px;
 @media screen and ${device.laptop} {
 position:relative;
 margin-bottom:40px;
 right:unset;
width:unset;
  }
`
const Title = styled.div`
width:100%;
position:relative;
    display: flex;
    align-items: center;
`
const LoaderContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  position:relative;
  margin:50px 0 50px 0;
`
export default function AllNews({news,menu,currentPageNumber}) {

    const [searchLoading, setSearchLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const {total,hasMore,hasPrevious} = news.pageInfo.offsetPagination
    const totalPages = Math.ceil(total / 9.0)
    const [newsByDate, setNewsByTitle] = useState([]);
    const {startPage,endPage} = startEndPagination(currentPageNumber,totalPages )
    const parsedMenu = ParcMenu(menu)

    const Search = async ()=>{
        setSearchLoading(true)
        const date = new Date(searchInput)
        const { data  } = await reduxClient.query( {
            query: GET_NEWS_BY_DATE,
            variables: {
                year:date.getFullYear(),
                month:date.getMonth()+1,
                day:date.getDate()
            }
        } )
        setSearchLoading(false)
        setNewsByTitle(data.news)
    }

    useEffect(() => {
        if (searchInput.length > 0) {
            Search()
        }

    }, [searchInput]);
  console.log(newsByDate)
    return (
        <MainLayout menu={parsedMenu} >
            <Container>
                <Title >
                    <TitleForComponent text='Новини' />
                    <Input>
                        <SearchBarStyled
                            type='date'
                            maxlength={10}
                            width='100%'
                            inputPlaceholder='пошук за датою новини'
                            border='1px solid'
                            inputFunc={(e)=>setSearchInput(e.target.value)} />
                    </Input>
                </Title>

                {
                    searchInput.length > 0 ?


                        searchLoading ?
                            <LoaderContainer>
                                <StyledLoader/>
                            </LoaderContainer>
                            :

                        newsByDate.nodes.length > 0 ?
                            <>
                                <LoaderContainer>
                                    <h2>Результат пошуку</h2>
                                </LoaderContainer>
                                <NewsWrapper posts={news.nodes}/>
                            </>

                            :
                            <LoaderContainer>
                               <h2>Новин у цей період не знайдено</h2>
                            </LoaderContainer>


                        :
                        <>
                            {news.nodes.length > 0 && <NewsWrapper posts={news.nodes}/>}
                            <Pagination
                                currentPageNumber={currentPageNumber}
                                hasMore={hasMore}
                                hasPrevious={hasPrevious}
                                startPage={startPage}
                                endPage={endPage}
                                href='news'
                            />
                        </>
                }
            </Container>
        </MainLayout>

    )
}

export async function getStaticProps(ctx){

    const currentPage = ctx.params?.currentPage
    const currentPageNumber = +(currentPage || 0);

    const offset = currentPageNumber === 0 ? 0 : (currentPageNumber-1) * 9;

    const { data } = await client.query( {
        query: GET_NEWS,
        variables: {
            size: 9,
            offset: offset,
        }
    } )
    return {
        props: {
            currentPageNumber,
            menu: data?.menuItems?.nodes || [],
            news:data?.news?.nodes ? data.news : [],
        },
        revalidate: 1
    }
}





