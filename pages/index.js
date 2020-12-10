import client from "../src/apollo/client"
import {HomePageLayout} from "../src/components/layouts/homePageLayout"
import LAST_EVENTS_AND_LAST_NEWS_QUERY from "../src/queries/get-all-data-for-home-page"
import LastNews from "../src/components/news/lastNews"
import ProjectsWrapper from "../src/components/projects/projectWrapper";

import Services from "../src/components/services/services";

export default function Home({news,events,data,projects,services}) {
  console.log(services)
  return (
      <HomePageLayout
     /* facebook={mainPageFields.facebook}
      telegram={mainPageFields.telegram}
      gmail={mainPageFields.gmail}*/
      >
        {services?.nodes.length > 0 &&<Services  posts={services.nodes}  pageInfo={services.pageInfo} />}
        {projects.nodes.length > 0 &&<ProjectsWrapper  posts={projects.nodes}  pageInfo={projects.pageInfo} />}
        {news.nodes.length > 0 &&<LastNews  posts={news.nodes}  pageInfo={news.pageInfo} />}
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
      services:data?.services?.nodes ? data.services : [],
      projects:data?.projects?.nodes ? data.projects : [],
      news: data?.news?.nodes ? data.news : [],
      events: data?.events?.nodes ? data.events : [],
      data: data?.pageBy ? data.pageBy : []
    },
    revalidate: 1
  }
}
