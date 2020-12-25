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
import {ParcMenu} from "../../src/components/hooks/hooks";

 const Container = styled.div`
 width:100%;
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
const Header = styled.div`
display:flex;
align-items:center;
padding-bottom:40px;
margin-bottom:40px;
align-items:center;
border-bottom:1px solid #1D1D1B;
@media screen and (max-width:1200px) {
    flex-direction: column;
  }
@media screen and (max-width:700px) {
    padding-bottom:20px;
  }
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
export default function MicrophoneDetail({projectBySlug,menu}) {
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
   console.log(projectBySlug)
    return (
        <MainLayout menu={parsedMenu}>
            {
                projectBySlug ?
                    <Container
                        bgImg={
                            projectBySlug.projectFields?.bgImg?.sourceUrl
                            && projectBySlug.projectFields.bgImg.sourceUrl
                        }
                    >

                        <ContainerWrapper>
                            <Header>
                                <TitleForComponent text={projectBySlug.title} fontSize='40px'/>
                                <Icons>
                                    {
                                        projectBySlug.projectFields.playLink &&
                                        <IconItem marginR='20px'>
                                            <a href={projectBySlug.projectFields.playLink}>
                                                <div style={{width:'130px',height:'40px',background:'url(/googlePlayIcon.svg) no-repeat'}}/>
                                            </a>
                                        </IconItem>
                                    }
                                    {
                                        projectBySlug.projectFields.appLink &&
                                        <IconItem marginR='20px'>
                                            <a href={projectBySlug.projectFields.appLink}>
                                                <div style={{width:'130px',height:'40px',background:'url(/appStore.svg) no-repeat'}}/>
                                            </a>
                                        </IconItem>
                                    }
                                    {
                                        projectBySlug.projectFields.siteLink &&
                                        <IconItem marginR='60px'>
                                            <a href={projectBySlug.siteLink}>
                                                <div style={{width:'40px',height:'40px',background:'url(/linkIconDark.svg) no-repeat'}}/>
                                                <div>
                                                    <span>{projectBySlug.projectFields.siteLink}</span>
                                                </div>

                                            </a>
                                        </IconItem>
                                    }
                                </Icons>
                            </Header>

                            <PostBody
                                content={projectBySlug.content} />
                        </ContainerWrapper>
                    </Container>
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
        query: GET_PROJECT_BY_SLUG,
        variables:{
            slug
        }
    } )

    return {
        props: {
            menu: data?.menuItems?.nodes || [],
            projectBySlug:data.project
        },
        revalidate: 1
    }
};

export const getStaticPaths= async () => {
    const { data } = await client.query( {
        query: GET_ALL_SLUG_FROM_PROJECTS
    } )
    const paths = data.projects.nodes.map((el) => {
        return { params: { slug: el.slug } }
    });

    return {
        fallback: false,
        paths,
    };
};