import Index, { getStaticProps } from '../index'
import client from "../../../src/apollo/client"
import GET_EVENTS_DATE from "../../../src/queries/get_all_events_dete";

export default Index;
export { getStaticProps };

export const getStaticPaths = async ({locales}) => {

    let paths = []

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

    for (const locale of locales) {
        paths = [
            ...paths,
            ...pathDate.map(el => ({ params: { currentDate: el.dateGmt.toString().substring(0,10) }, locale })),
        ]
    }

    return {
        fallback: false,
        paths,
    };
};