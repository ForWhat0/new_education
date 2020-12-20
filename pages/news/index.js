import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import GET_NEWS from "../../src/queries/getNews"
import NewsWrapper from "../../src/components/news/newsWrapper"
import styled from 'styled-components'
import {ParcMenu, startEndPagination} from "../../src/components/hooks/hooks";
import {Pagination} from "../../src/components/pagination/pagination";
import React from "react";

const Container = styled.div`
width:80%;
margin-left:10%;
`

export default function AllNews({news,menu,currentPageNumber}) {

    const {total,hasMore,hasPrevious} = news.pageInfo.offsetPagination
    const totalPages = Math.ceil(total / 9.0)
    const {startPage,endPage} = startEndPagination(currentPageNumber,totalPages )
    const parsedMenu = ParcMenu(menu)

    return (
        <MainLayout menu={parsedMenu} >
            <Container>
                {news.nodes.length > 0 &&<NewsWrapper  posts={news.nodes}/>}
                <Pagination
                    currentPageNumber={currentPageNumber}
                    hasMore={hasMore}
                    hasPrevious={hasPrevious}
                    startPage={startPage}
                    endPage={endPage}
                    href='news'
                />
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





