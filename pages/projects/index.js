import client from "../../src/apollo/client"
import GET_PROJECTS from "../../src/queries/getProjects"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import Projects from "../../src/components/projects/projects";


export default function AllProjects({projects}) {
    return (
        <MainLayout >
            {projects.nodes.length > 0 &&<Projects  posts={projects.nodes}/>}
        </MainLayout>

    )
}
export async function getStaticProps(){
    const { data } = await client.query( {
        query: GET_PROJECTS,
        variables: {
            first: 5,
            last: null,
            after: null,
            before: null
        }
    } )
    return {
        props: {
            projects:data?.projects?.nodes ? data.projects : [],
        },
        revalidate: 1
    }
}





