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
export default function MicrophoneDetail({projectBySlug}) {
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
                                        !projectBySlug.playLink &&
                                        <IconItem marginR='20px'>
                                            <a href={projectBySlug.playLink}>
                                                <Icon src='/googlePlayIcon.svg' width='120px' height='36px'/>
                                            </a>
                                        </IconItem>
                                    }
                                    {
                                        !projectBySlug.appLink &&
                                        <IconItem marginR='20px'>
                                            <a href={projectBySlug.appLink}>
                                                <Icon src='/appStore.svg' width='120px' height='36px'/>
                                            </a>
                                        </IconItem>
                                    }
                                    {
                                        !projectBySlug.siteLink &&
                                        <IconItem marginR='60px'>
                                            <a href={projectBySlug.siteLink}>
                                                <Icon src='/linkIconDark.svg' width='36px' height='36px'/>
                                                <div>
                                                    <span>{projectBySlug.siteLink}</span>
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
        fallback: true,
        paths,
    };
};