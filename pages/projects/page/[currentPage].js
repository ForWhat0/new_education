import Index, { getStaticProps } from '../index';
import client from "../../../src/apollo/client";
import GET_PROJECTS_COUNT from "../../../src/queries/getProjectsCount";

export default Index;
export { getStaticProps };

export const getStaticPaths = async () => {
    const { data } = await client.query( {
        query: GET_PROJECTS_COUNT
    } )
    const numberOfPages = Math.ceil(data.projects.pageInfo.offsetPagination.total / 5.0);

    const paths = Array(numberOfPages).fill('').map((_, index) => {
        return { params: {currentPage: (index + 1).toString()}}
    })

    return {
        fallback: false,
        paths: paths,
    };
};