import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import {ParcMenu, startEndPagination} from "../../src/components/hooks/hooks";
import GET_PROJECTS from "../../src/queries/getProjects";
import Projects from "../../src/components/projects/projects";
import React from "react";
import styled from 'styled-components'
import {Pagination} from "../../src/components/pagination/pagination"
import {ProjectsLsi} from "../../src/Lsi/lsi";

const PaginationContainer = styled.div`
margin-left: 10%;
width:80%;
`

export default function AllProjects({projects,menu,currentPageNumber,contacts,locale}) {
    const {total,hasMore,hasPrevious} = projects.pageInfo.offsetPagination
    const totalPages = Math.ceil(total / 5.0)
    const {startPage,endPage} = startEndPagination(currentPageNumber,totalPages )
    const parsedMenu = ParcMenu(menu)

    return (
        <MainLayout databaseId={1} contacts={contacts} menu={parsedMenu} >

            <>
                {projects?.nodes?.length > 0 &&<Projects title={ProjectsLsi.projects[locale]} textForIcon={ProjectsLsi.review[locale]}  posts={projects.nodes}/>}

                <PaginationContainer>
                    <Pagination
                        locale={locale}
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
export async function getStaticProps({params,locale}){

    const currentPage = params?.currentPage
    const currentPageNumber = +(currentPage || 0)
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"

    const offset = currentPageNumber === 0 ? 0 : (currentPageNumber-1) * 5;

    const { data  } = await client.query( {
        query: GET_PROJECTS,
        variables: {
            size: 5,
            offset: offset,
            language:locale,
            location,
            contactsUri
        }
    } )
    return {
        props: {
            currentPageNumber,
            menu: data?.menuItems?.nodes || [],
            projects:data?.projects?.nodes ? data.projects : [],
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
            locale
        },
        revalidate: 1
    }
}










