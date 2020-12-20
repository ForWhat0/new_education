import Index, { getStaticProps } from '../index'
import client from "../../../src/apollo/client"
import GET_EVENTS_DATE from "../../../src/queries/get_all_events_dete";

export default Index;
export { getStaticProps };

export const getStaticPaths = async () => {
    const { data } = await client.query( {
        query: GET_EVENTS_DATE,
        variables:{
            status:"FUTURE"
        }
    } )
    const  publishDate = await client.query( {
        query: GET_EVENTS_DATE,
        variables:{
            status:"PUBLISH"
        }
    } )

    const pathDate = data?.events?.nodes?.concat(publishDate?.data?.events?.nodes);

    const paths = pathDate.map(item => {
        return { params: {currentDate: item.dateGmt}}
    })

    return {
        fallback: false,
        paths,
    };
};