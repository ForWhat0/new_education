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
import {ParcMenu} from "../../src/components/hooks/hooks";

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
export default function MicrophoneDetail({locale,newBySlug,news,menu,contacts}) {
    const router = useRouter();
    const parsedMenu = ParcMenu(menu)
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
        <MainLayout databaseId={newBySlug.databaseId} contacts={contacts} menu={parsedMenu}>
            {
                newBySlug || news ?
                    <>
                        <Container>

                            <TitleForComponent displayYellowDiv={false} marginBottom='40px' text={newBySlug.title} fontSize='40px'/>
                            <Date date={newBySlug.date}/>
                            <PostBody content={newBySlug.content} />
                        </Container>
                        <LastNews background='rgba(157, 157, 157, 0.08);'
                                  posts={news.nodes}
                                  pageInfo={news.pageInfo}
                                  buttonHide={true}
                                  locale={locale}
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

export const getStaticProps = async ({params,locale}) => {
    const slug = params.slug
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"
    const { data } = await client.query( {
        query: GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS,
        variables:{
            slug,
            location,
            contactsUri,
            language:locale
        }
    } )

    return {
        props: {
            locale,
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
            newBySlug:data.new,
            news: data.news,
            menu: data?.menuItems?.nodes || [],
        },
        revalidate: 1
    }
};

export const getStaticPaths= async ({locales}) => {
    let paths=[]
    const { data } = await client.query( {
        query: GET_ALL_SLUG_FROM_NEWS
    } )

    for (const locale of locales) {
        paths = [
            ...paths,
            ...data.news.nodes.map((el) => ({ params: { slug: el.slug }, locale })),
        ]
    }

    return {
        fallback: false,
        paths,
    };
};