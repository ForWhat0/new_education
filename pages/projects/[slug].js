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
                    <>
                        <Container>
                            <TitleForComponent marginBottom='40px' text={projectBySlug.title} fontSize='40px'/>
                            <PostBody content={projectBySlug.content} />
                        </Container>
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