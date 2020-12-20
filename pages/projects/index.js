import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import {ParcMenu, startEndPagination} from "../../src/components/hooks/hooks";
import GET_PROJECTS from "../../src/queries/getProjects";
import Projects from "../../src/components/projects/projects";
import Link from "next/link"
import React from "react";
import styled from 'styled-components'
import {Pagination} from "../../src/components/pagination/pagination"

const PaginationContainer = styled.div`
margin-left: 10%;
width:80%;
`

export default function AllProjects({projects,menu,currentPageNumber}) {

    const {total,hasMore,hasPrevious} = projects.pageInfo.offsetPagination
    const totalPages = Math.ceil(total / 5.0)
    const {startPage,endPage} = startEndPagination(currentPageNumber,totalPages )
    const parsedMenu = ParcMenu(menu)

    return (
        <MainLayout menu={parsedMenu} >

            <>
                {projects?.nodes?.length > 0 &&<Projects  posts={projects.nodes}/>}

                <PaginationContainer>
                    <Pagination
                        currentPageNumber={currentPageNumber}
                        hasMore={hasMore}
                        hasPrevious={hasPrevious}
                        startPage={startPage}
                        endPage={endPage}
                        href='projects'
                    />
                </PaginationContainer>
              </>

        </MainLayout>

    )
}
export async function getStaticProps(ctx){

    const currentPage = ctx.params?.currentPage
    const currentPageNumber = +(currentPage || 0);

    const offset = currentPageNumber === 0 ? 0 : (currentPageNumber-1) * 5;

    const { data  } = await client.query( {
        query: GET_PROJECTS,
        variables: {
            size: 5,
            offset: offset,
        }
    } )
    return {
        props: {
            currentPageNumber,
            menu: data?.menuItems?.nodes || [],
            projects:data?.projects?.nodes ? data.projects : [],
        },
        revalidate: 1
    }
}










