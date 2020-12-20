import Index, { getStaticProps } from '../index'
import client from "../../../src/apollo/client"
import GET_NEWS_COUNT from "../../../src/queries/getNewsCount"

export default Index;
export { getStaticProps };

export const getStaticPaths = async () => {
    const { data } = await client.query( {
        query: GET_NEWS_COUNT
    } )
    const numberOfPages = Math.ceil(data.news.pageInfo.offsetPagination.total / 9.0)

    const paths = Array(numberOfPages).fill('').map((_, index) => {
        return { params: {currentPage: (index + 1).toString()}}
    })

    return {
        fallback: false,
        paths: paths,
    };
};