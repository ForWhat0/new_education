import client from "../src/apollo/client"
import {HomePageLayout} from "../src/components/layouts/homePageLayout"
import LAST_EVENTS_AND_LAST_NEWS_QUERY from "../src/queries/get-all-data-for-home-page"

export default function Home({news,events,data}) {
  const {mainPageFields} = data
  return (
      <HomePageLayout
      facebook={mainPageFields.facebook}
      telegram={mainPageFields.telegram}
      gmail={mainPageFields.gmail}
      >

      </HomePageLayout>
  )
}
export async function getStaticProps(){
  const { data } = await client.query( {
    query: LAST_EVENTS_AND_LAST_NEWS_QUERY,
    variables: {
      uri:"/"
      }
  } )
  return {
    props: {
      news: data?.news?.nodes ? data.news : [],
      events: data?.events?.nodes ? data.events : [],
      data: data?.pageBy ? data.pageBy : []
    },
    revalidate: 1
  }
}
