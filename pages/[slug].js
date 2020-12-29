import client from "../src/apollo/client";
import styled from 'styled-components'
import {GET_PAGES_URI} from "../src/queries/pages/get-pages";
import {GET_PAGE} from "../src/queries/pages/get-page";
import { useRouter } from 'next/router'
import PostBody from "../src/components/post-body/post-body";
import NewsWrapper from "../src/components/news/newsWrapper";
import {MainLayout} from "../src/components/layouts/mainLayout";
import {PageFooter} from "../src/components/footer/footer";

import React from "react";
import {formatBytes, getDateIn_DD_MM_YYYY_Format, ParcMenu} from "../src/components/hooks/hooks";
import {HomePageLayout} from "../src/components/layouts/homePageLayout";
import {TitleForComponent} from "../src/components/titleForComponent/title";
import Icon from "../src/components/icon/icon";
import {InputStyled} from "../src/components/input/input";
import {SearchBarStyled} from "../src/components/searchBar/searchBar";
import GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS from "../src/queries/get-news-by-slug";
import {finance} from "../src/Lsi/lsi";
const { useState, Fragment } = React;

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
const Year = styled.li`
font-size:24px;
list-style-type: none;
    border-left: 5px solid #00AEEF;
    padding-left: 19px;
    margin-bottom:20px;
    cursor:pointer;
     @media screen and (max-width:700px) {
font-size:16px;
  }  
    i{
    transform: rotateX(${props=>props.open});
    color:${props=>props.color};
margin-left:10px;
font-size:17px;
    }
`
const DownloadFile = styled.ul`
position: relative;
 width: 100%;
 margin: 0;
 padding-left: 20px;
`
const DownloadFileText = styled.li`
display:flex;
align-items:center;
 position:absolute;
 list-style-type:none;
 top:${props=>props.top};
 bottom:${props=>props.bottom};
 margin-top:${props=>props.mTop};
 margin-bottom:${props=>props.mBottom};
  @media screen and (max-width:700px) {
font-size:14px;
  }  
`
const DownloadFileTextAndArrow = styled.li`
display:flex;
align-items:center;
 position:absolute;
 list-style-type:none;
 top:${props=>props.top};
 bottom:${props=>props.bottom};
 margin-top:${props=>props.mTop};
 margin-bottom:${props=>props.mBottom};
  @media screen and (max-width:700px) {
font-size:16px;
  }  
  @media screen and (max-width:450px){
  bottom: -40px;
    left: -15px;
  }
 span{
 margin-left:5px;
 font:size:16px;
 }
`
const DownloadContent = styled.div`
    max-height: ${props=>props.height};
    transition: max-height 0.15s ease-out;
    overflow: hidden;
    border-top: ${props=>props.border};
    padding-top: ${props=>props.pTop};
    margin-bottom: ${props=>props.pTop};
    margin-top: ${props=>props.mTop};
    @media screen and (max-width:700px) {
   padding-top: unset!important;
    margin-bottom: unset!important;
  }
`

const DownloadItem = styled.a`
display:flex;
 @media screen and (max-width:700px) {
  margin-bottom:60px;
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
const Input = styled.div`
position:absolute;
right:0;
@media screen and (max-width:950px) {
 width:100%;
 right:unset;
 position:relative;
 margin-bottom:40px;
  }
`

const Pages = ({ menu,page ,contacts,locale}) => {
    const router = useRouter()
    const parsedMenu = ParcMenu(menu)
    const [shownComments, setShownComments] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const toggleComment = index => {
        setShownComments(prevShownComments => ({
            ...prevShownComments,
            [index]: !prevShownComments[index]
        }));
    };
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <MainLayout contacts={contacts} menu={parsedMenu} hideLeftComponent={true} >
            <Container bgImg={page?.financeField?.bgImg?.sourceUrl}>
                <Header>
                    <TitleForComponent marginBottom='40px' borderBottom='unset' text={page.title}  />
                   <Input>
                       <SearchBarStyled
                           maxlength={10}
                           width='100%'
                           inputPlaceholder={finance.search[locale]}
                           border='1px solid'
                           inputFunc={(e)=>setSearchInput(e.target.value)} />
                   </Input>
                </Header>

                {searchInput.length > 0 ?
                    page?.financeField?.year?.map(el=>
                    el.filePdf?.filter(file=>
                    file.dateFile && file.dateFile.includes(searchInput)).map(filteredFiles=>
                        <DownloadItem href={filteredFiles.downloadPdf.mediaItemUrl} download target='_blank'>
                            <Icon src='/pdf.svg' width='50px' height='100px' alt='PDF File'/>
                            <DownloadFile>
                                <DownloadFileText
                                    top='0'
                                    bottom='unset'
                                    mTop='15px'
                                    mBottom='unset'
                                >
                                    {`${finance.report[locale]}
                                                    ${filteredFiles.dateFile? filteredFiles.dateFile : null}
                                                   
                                ( ${finance.date[locale]} ${getDateIn_DD_MM_YYYY_Format(filteredFiles.downloadPdf.dateGmt)} )`}
                                </DownloadFileText>
                                <DownloadFileTextAndArrow
                                    top='unset'
                                    bottom='0'
                                    mTop='unset'
                                    mBottom='15px'
                                >
                                    <Icon src='/arrow-right-in-circle.svg' width='20px' height='20px'/>
                                    <span>{finance.download[locale]} ({formatBytes(filteredFiles.downloadPdf.fileSize)})</span>
                                </DownloadFileTextAndArrow>
                            </DownloadFile>
                        </DownloadItem>
                    )
                    )


                :

                    page?.financeField?.year?.map((el,index)=>

                        <>
                            <Year
                                open ={shownComments[index] ? '180deg' : '0' }
                                onClick={() => toggleComment(index)}>
                                {el.yearTitle}
                                <i className="fa fa-caret-down"></i></Year>

                                <DownloadContent
                                    height ={shownComments[index] ? '500px' : '0' }
                                    border = {shownComments[index] ? '1px solid' : 'unset' }
                                    pTop = {shownComments[index] ? '40px' : 'unset' }
                                    mTop = {shownComments[index] ? '20px' : 'unset' }
                                >
                                    {el.filePdf?.map(file =>
                                        <DownloadItem href={file.downloadPdf.mediaItemUrl} download target='_blank'>
                                            <Icon src='/pdf.svg' width='50px' height='100px' alt='PDF File'/>
                                            <DownloadFile>
                                                <DownloadFileText
                                                    top='0'
                                                    bottom='unset'
                                                    mTop='15px'
                                                    mBottom='unset'
                                                >
                                                    {`${finance.report[locale]} ( 
                                                    ${file.dateFile? file.dateFile : null}
                                                   
                                (${finance.date[locale]} ( ${getDateIn_DD_MM_YYYY_Format(file.downloadPdf.dateGmt)} )`}
                                                </DownloadFileText>
                                                <DownloadFileTextAndArrow
                                                    top='unset'
                                                    bottom='0'
                                                    mTop='unset'
                                                    mBottom='15px'
                                                >
                                                    <Icon src='/arrow-right-in-circle.svg' width='20px' height='20px'/>
                                                     <span>{finance.download[locale]} ( ({formatBytes(file.downloadPdf.fileSize)})</span>
                                                </DownloadFileTextAndArrow>
                                            </DownloadFile>
                                        </DownloadItem>
                                    )}
                                </DownloadContent>

                        </>
                    )
                }
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
