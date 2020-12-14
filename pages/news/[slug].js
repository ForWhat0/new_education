import { useRouter } from 'next/router'
import client from "../../src/apollo/client"
import GET_ALL_SLUG_FROM_NEWS from "../../src/queries/get-all-slug-from-news";
import StyledLoader from "../../src/components/loader/loader";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import Date from "../../src/components/date/date";
import PostBody from "../../src/components/post-body/post-body";
import LastNews from "../../src/components/news/lastNews";
import styled from "styled-components";
import GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS from "../../src/queries/get-news-by-slug";
import {MainLayout} from "../../src/components/layouts/mainLayout";

export const Container = styled.div`
position:relative;
width:80%;
margin-left:10%;      
`
const LoaderContainer = styled.div`
                width: 100%;
                display:flex;
                justify-content: center;
                margin-top: 70px;
                margin-bottom: 70px;
`
export default function MicrophoneDetail({newBySlug,news}) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <MainLayout>
                <LoaderContainer>
                    <StyledLoader/>
                </LoaderContainer>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            {
                newBySlug || news ?
                    <>
                        <Container>

                            <TitleForComponent marginBottom='40px' text={newBySlug.title} fontSize='40px'/>
                            <Date date={newBySlug.date}/>
                            <PostBody content={newBySlug.content} />
                        </Container>
                        <LastNews background='rgba(157, 157, 157, 0.08);'
                                  title='інші новини'
                                  posts={news.nodes}
                                  pageInfo={news.pageInfo}
                                  language='ukr'
                                  buttonHide={true}
                        />
                    </>
                    :
                    <LoaderContainer>
                        <StyledLoader/>
                    </LoaderContainer>
            }

        </MainLayout>
    );
}

export const getStaticProps = async (
    ctx
) => {
    const slug = ctx.params.slug
    const { data } = await client.query( {
        query: GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS,
        variables:{
            slug
        }
    } )

    return {
        props: {
            newBySlug:data.new,
            news: data.news
        },
        revalidate: 1
    }
};

export const getStaticPaths= async () => {
    const { data } = await client.query( {
        query: GET_ALL_SLUG_FROM_NEWS
    } )
    const paths = data.news.nodes.map((el) => {
        return { params: { slug: el.slug } }
    });

    return {
        fallback: true,
        paths,
    };
};