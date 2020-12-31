import client from "../src/apollo/client";
import styled from 'styled-components'
import {GET_PAGES_URI} from "../src/queries/pages/get-pages";
import {GET_PAGE} from "../src/queries/pages/get-page";
import { useRouter } from 'next/router'
import PostBody from "../src/components/post-body/post-body";
import {MainLayout} from "../src/components/layouts/mainLayout";
import {ParcMenu} from "../src/components/hooks/hooks";
import {TitleForComponent} from "../src/components/titleForComponent/title";


const Container = styled.div`
width:80%;
margin-left:10%;
margin-bottom:100px;
background: 80% / 20% auto no-repeat fixed url(${props=>props.bgImg});   
@media screen and (max-width:700px) {
 background:unset;
 width:90%;
 margin-left:5%;
  }

`

const Header = styled.div`
display:flex;
align-items: center;
position:relative;
 @media screen and (max-width:950px) {
  flex-direction:column;
  }
`


const Pages = ({ menu,page ,contacts}) => {
    const router = useRouter()
    const parsedMenu = ParcMenu(menu)

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <MainLayout databaseId={page.databaseId} contacts={contacts} menu={parsedMenu} hideLeftComponent={true} >
            <Container>
                <Header>
                    <TitleForComponent marginBottom='40px' borderBottom='unset' text={page.title}  />
                </Header>
                <PostBody content={page.content}/>
            </Container>
        </MainLayout>
    )
}

export default Pages;

export const getStaticProps = async ({params,locale}) => {

    const uri =locale === "EN" ? `en${params.slug}` : locale === "RU" ? `ru${params.slug}` : params.slug
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"

    const { data } = await client.query( {
        query: GET_PAGE,
        variables:{
            uri,
            location,
            contactsUri
        }
    } )

    return {
        props: {
            locale,
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
            menu: data?.menuItems?.nodes || [],
            page: data?.page? data.page : []
        },
        revalidate: 1
    }
};

export async function getStaticPaths({locales}) {
    let paths=[]

    const { data } = await client.query({
        query: GET_PAGES_URI
    });


    for (const locale of locales) {
        paths = [
            ...paths,
            ...data.pages?.nodes.map(el => ({ params: { slug: `${el.slug}` }, locale })),
        ]
    }
    return {
        paths,
        fallback: false
    };
}
