import { useRouter } from 'next/router'
import client from "../../src/apollo/client"
import StyledLoader from "../../src/components/loader/loader";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import styled from "styled-components";
import {MainLayout} from "../../src/components/layouts/mainLayout";
import { useState } from "react";
import GET_ALL_SLUG_FROM_SERVICES from "../../src/queries/get_all_slug_from_services";
import {ParcMenu} from "../../src/components/hooks/hooks";
import GET_SERVICE_BY_SLUG from "../../src/queries/get_serviceby_slug";
import {Link as ScrollLink} from "react-scroll";
import {StyledButton} from "../../src/components/button/button";
import {PostBodyZNO} from "../../src/components/post-body/post-body";
import {device} from "../../src/components/deviceSizes/deviceSizes";
import {services} from "../../src/Lsi/lsi";
import {useDispatch} from "react-redux";
import {actionClickModal} from "../../src/redux/actions/actions";

 const Container = styled.div`
 width:80%;
 margin-left:10%;
 padding-bottom:40px;
background: url(${props=>props.bgImg}) no-repeat center center fixed;   
@media screen and (max-width:700px) {
 background:unset;
 width:94%;
 margin-left:2%;
  }

`

const LoaderContainer = styled.div`
                width: 100%;
                display:flex;
                justify-content: center;
                margin-top: 70px;
                margin-bottom: 70px;
`


const Header = styled.div`
display:flex;
align-items: center;
position:relative;
margin-bottom: 30px;

 @media screen and (max-width:950px) {
  flex-direction:column;
  }
`
const RegisterOnZnoContainer = styled.div`
position:absolute;
right:0;
@media screen and (max-width:950px) {
  position:relative;
  }
a button{
@media screen and (max-width:950px) {
  font-size:14px;
  }
}
`

const Year = styled.span`
font-size:16px;
border-bottom: 1px solid #1D1D1B;
padding-bottom: ${props=>props.pBottom};
display: block;
    font-weight: 500;
    line-height: 27px;
list-style-type: none;
    margin-bottom:20px;
    cursor:pointer;
    
    i{
    -webkit-transform: rotate(${props=>props.open});
  -moz-transform: rotate(${props=>props.open});
  -o-transform: rotate(${props=>props.open});
  -ms-transform: rotate(${props=>props.open});
  transform: rotate(${props=>props.open});
    color:${props=>props.color};
margin-left:10px;
font-size:17px;
    }
`

const DownloadContent = styled.div`
    max-height: ${props=>props.height};
    transition: max-height 0.15s ease-out;
    border-bottom: ${props=>props.bBottom};
    padding-bottom: ${props=>props.pBottom};
    overflow: hidden;
    margin-bottom: ${props=>props.pTop};
    margin-top: ${props=>props.mTop};
  @media screen and ${device.mobileL}{
      display:flex;
      flex-direction:column;
  }
  button{
   @media screen and ${device.mobileL}{
       align-self: center;
  }
  }
  div{
  margin-bottom:40px;
  }
  div ul {
  padding:0;
  margin:0;
  }
  div ul li {
  list-style-type:none;
  padding-bottom: 20px;
  }
  div ul li::before {
  content: '— ';
}
  
`

export default function GetEvent({serviceBySlug,menu,contacts,locale}) {
     const router = useRouter();
     const zno = serviceBySlug?.serveicesFields?.showZno === "Открыть"
     const znoFields = zno && {
         title:serviceBySlug?.serveicesFields?.titleZno,
         learn:serviceBySlug?.serveicesFields?.learn
     }
    const [ShownAccordion, setShownAccordion] = useState({});
    const handleClickAccordion = index => {
        setShownAccordion(prevShownAccordion => ({
            ...prevShownAccordion,
            [index]: !prevShownAccordion[index]
        }));
    };
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
    const dispatch = useDispatch()

    function mapDispatchToProps(item) {
        item.type='service'
        item.title=item.titleAccardion
        item.databaseId=serviceBySlug.databaseId
        return dispatch(actionClickModal(item))
    }
    return (
        <MainLayout
            databaseId={serviceBySlug?.databaseId}
            contacts={contacts}
            menu={parsedMenu}
            showZNORegister={zno && znoFields}
            hideLeftComponent={zno && true} >
            <Container >
                <Header>
                    <TitleForComponent  borderBottom='unset' text={serviceBySlug.title}  />
                    {
                        zno &&
                        <RegisterOnZnoContainer>
                            <ScrollLink to={"#RegisterZNO"}  hashSpy={true}   offset={-100} spy={true} smooth={true}  duration={500} >
                                <StyledButton  text={services.registerZNO[locale]}/>
                            </ScrollLink>
                        </RegisterOnZnoContainer>
                    }
                </Header>
                {
                    zno && <PostBodyZNO content={serviceBySlug.content}/>
                }
                {
                    serviceBySlug?.serveicesFields?.accardion2?.map((item,index)=>
                        <div key={index}>
                            <Year
                                pBottom = {ShownAccordion[index] ? 'unset' : '20px' }
                                open ={ShownAccordion[index] ? '180deg' : '0' }
                                onClick={() => handleClickAccordion(index)}>
                                {item.titleAccardion}
                                <i className="fa fa-caret-down"/>
                            </Year>

                            <DownloadContent
                                bBottom = {ShownAccordion[index] ? '1px solid' : 'unset' }
                                pBottom = {ShownAccordion[index] ? '20px' : 'unset' }
                                height ={ShownAccordion[index] ? '500px' : '0' }
                                pTop = {ShownAccordion[index] ? '30px' : 'unset' }
                                mTop = {ShownAccordion[index] ? '30px' : 'unset' }
                            >
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.descrAccardion }}
                                    />
                                    <StyledButton func={()=>mapDispatchToProps(item)} text={services.register[locale]}/>
                            </DownloadContent>
                        </div>
                    )
                }
            </Container>
        </MainLayout>
    );
}

export const getStaticProps = async ({params,locale}) => {

    const slug = params.slug
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"
    const { data } = await client.query( {
        query: GET_SERVICE_BY_SLUG,
        variables:{
            slug,
            contactsUri,
            location,
        }
    } )

    return {
        props: {
            locale,
            menu: data?.menuItems?.nodes || [],
            serviceBySlug:data?.service? data.service : [],
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
        },
        revalidate: 1
    }
};

export const getStaticPaths= async ({locales}) => {

    let paths = []

    const { data } = await client.query( {
        query: GET_ALL_SLUG_FROM_SERVICES
    } )

    for (const locale of locales) {
        paths = [
            ...paths,
            ...data.services?.nodes.map(el => ({ params: { slug: el.slug }, locale })),
        ]
    }

    return {
        fallback: false,
        paths,
    };
};