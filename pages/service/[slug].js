import { useRouter } from 'next/router'
import client from "../../src/apollo/client"
import StyledLoader from "../../src/components/loader/loader";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import PostBody from "../../src/components/post-body/post-body";
import LastNews from "../../src/components/news/lastNews";
import styled from "styled-components";
import {MainLayout} from "../../src/components/layouts/mainLayout";
import GET_ALL_SLUG_FROM_PROJECTS from "../../src/queries/get-all-slug-from-projects";
import GET_PROJECT_BY_SLUG from "../../src/queries/get-project-by-slug";
import React from "react";
import Icon from "../../src/components/icon/icon";
import GET_ALL_SLUG_FROM_SERVICES from "../../src/queries/get_all_slug_from_services";
import {formatBytes, getDateIn_DD_MM_YYYY_Format, ParcMenu} from "../../src/components/hooks/hooks";
import {SearchBarStyled} from "../../src/components/searchBar/searchBar";
import GET_SERVICE_BY_SLUG from "../../src/queries/get_serviceby_slug";
const { useState, Fragment } = React;

 const Container = styled.div`
 width:80%;
 margin-left:10%;
background: url(${props=>props.bgImg}) no-repeat center center fixed;   
@media screen and (max-width:700px) {
 background:unset;
  }

`
const ContainerWrapper = styled.div`
position:relative;
width:80%;
  margin-top:40px;
margin-left:10%;   
@media screen and (max-width:700px) {
       width: 90%;
    margin-left: 4%;
  }
h1{
@media screen and (max-width:700px) {
   font-size:25px;
  }
}  
  
a{
display:flex;
align-items: center;
}

span{
margin-left:10px;
margin-right:10px;
color:blue;
border-bottom:1px solid blue;
} 

`
const LoaderContainer = styled.div`
                width: 100%;
                display:flex;
                justify-content: center;
                margin-top: 70px;
                margin-bottom: 70px;
`

const Icons = styled.div`
    width: 100%;
    justify-content: flex-end;
display:flex;
align-items:center;
@media screen and (max-width:700px) {
    flex-direction: column;
    justify-content: unset;
    align-items:unset;
  }
`
const IconItem = styled.div`
margin-left:${props=>props.marginR};
@media screen and (max-width:700px) {
    margin-left:unset;
    margin-bottom:10px;
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
export default function GetEvent({serviceBySlug,menu}) {
     const router = useRouter();
    const [ShownAccordion, setShownAccordion] = useState({});
     console.log(serviceBySlug)
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

    return (
        <MainLayout menu={parsedMenu} hideLeftComponent={true} >
            <Container >
                <Header>
                    <TitleForComponent marginBottom='40px' borderBottom='unset' text={serviceBySlug.title}  />
                </Header>
           <PostBody content={serviceBySlug.content}/>
            </Container>
        </MainLayout>
    );
}

export const getStaticProps = async (
    ctx
) => {
    const slug = ctx.params.slug
    const { data } = await client.query( {
        query: GET_SERVICE_BY_SLUG,
        variables:{
            slug
        }
    } )

    return {
        props: {
            menu: data?.menuItems?.nodes || [],
            serviceBySlug:data?.service? data.service : []
        },
        revalidate: 1
    }
};

export const getStaticPaths= async () => {
    const { data } = await client.query( {
        query: GET_ALL_SLUG_FROM_SERVICES
    } )
    const paths = data.services.nodes.map((el) => {
        return { params: { slug: el.slug } }
    });

    return {
        fallback: false,
        paths,
    };
};