import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import GET_NEWS from "../../src/queries/getNews"
import NewsWrapper from "../../src/components/news/newsWrapper"
import styled from 'styled-components'

const Container = styled.div`
width:80%;
margin-left:10%;
`

export default function AllProjects({news}) {
    return (
        <MainLayout >
            <Container>
                {news.nodes.length > 0 &&<NewsWrapper  posts={news.nodes}/>}
            </Container>
        </MainLayout>

    )
}
export async function getStaticProps(){
    const { data } = await client.query( {
        query: GET_NEWS,
        variables: {
            first: 9,
            last: null,
            after: null,
            before: null
        }
    } )
    return {
        props: {
            news:data?.news?.nodes ? data.news : [],
        },
        revalidate: 1
    }
}





