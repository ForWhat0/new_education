import client from "../src/apollo/client";
import GET_CONTACTS from "../src/queries/get_contacts";
import {MainLayout} from "../src/components/layouts/mainLayout";
import {TitleForComponent} from "../src/components/titleForComponent/title";
import {ParcMenu} from "../src/components/hooks/hooks";
import styled from 'styled-components'
import Link from 'next/link'
import {errorsLsi} from "../src/Lsi/lsi";
import {device} from "../src/components/deviceSizes/deviceSizes";

const Container = styled.div`
background: rgba(246, 149, 131, 0.2);
`
const ContainerWrapper = styled.div`
background: url(/404.svg) no-repeat;
background-position:right;
width:80%;
    margin-left: 10%;
    padding: 40px 0 40px 0;
    margin-top: 40px;
    margin-bottom: 60px;
     @media screen and ${device.tablet} {
width:96%;
margin-left: 2%;
  }
  h1 {
   @media screen and ${device.tablet} {
    font-size:20px;
  }
  }
   h2 {
   @media screen and ${device.tablet} {
    font-size:16px;
  }
  }
`
const Background = styled.div`
margin-bottom: 60px;
background-size: contain;
background: url(/laptopIcon.svg) no-repeat;
background-position:center;
height:500px;
 @media screen and ${device.tablet} {
height:200px;
  }
`
const Global = styled.div`
width:100%;
`
export default function FourOhFour({contacts,menu,locale}) {
    const parsedMenu = ParcMenu(menu)
    return (
        <MainLayout
        menu={parsedMenu}
        contacts={contacts}
        showZNORegister={false}
        hideLeftComponent={true}
        >
            <Global>
                <Container>
                    <ContainerWrapper>
                        <h1>{errorsLsi.pageNotExist[locale]}</h1>
                        <h2>{errorsLsi.refresh[locale]}</h2>
                    </ContainerWrapper>
                </Container>
                <Background/>
            </Global>
        </MainLayout>
        )
}

export async function getStaticProps({locale}){
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"
    const { data } = await client.query( {
        query: GET_CONTACTS,
        variables: {
            location,
            contactsUri
        }
    } )

    return {
        props: {
            locale,
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
            menu:data?.menuItems?.nodes ? data.menuItems.nodes : [],
        },
        revalidate: 1
    }
}

