import client from "../src/apollo/client"
import {HomePageLayout} from "../src/components/layouts/homePageLayout"
import LAST_EVENTS_AND_LAST_NEWS_QUERY from "../src/queries/get-all-data-for-home-page"
import LastNews from "../src/components/news/lastNews"
import ProjectsWrapper from "../src/components/projects/projectWrapper";
import {  Element   } from 'react-scroll'
import Services from "../src/components/services/services";
import Team from "../src/components/team/team";
import Events from "../src/components/events/events";
import EventsMobile from "../src/components/events/eventsMobile";
import {ParcMenu} from "../src/components/hooks/hooks";

export default function Home({menu,news,events,data,projects,services}) {
  const {mainPageFields} = data

  const parsedMenu = ParcMenu(menu)

    const teamData =  {
      text:mainPageFields.text,
      title:mainPageFields.titleCommand,
      employees:mainPageFields.employees
    }
    const popularProjectsData={
      title:mainPageFields.titleProject,
      projects:mainPageFields.projectPopular
    }

  return (
      <HomePageLayout
     /* facebook={mainPageFields.facebook}
      telegram={mainPageFields.telegram}
      gmail={mainPageFields.gmail}*/
          menu={parsedMenu}
      >
        {events.length > 0 &&<Events  posts={events}/>}
        {events.length > 0 &&<EventsMobile  posts={events[0].eventsFields}/>}
        {services?.nodes.length > 0 &&
        <Element name="#Services" className="element">
          <Services  posts={services.nodes}  pageInfo={services.pageInfo} />
        </Element>
        }
        {popularProjectsData?.projects?.length > 0 &&<ProjectsWrapper  posts={popularProjectsData}/>}
        {teamData?.employees.length > 0 &&
        <Element name="#Team" className="element">
          <Team  posts={teamData}/>
        </Element>
        }
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
      menu:data?.menuItems?.nodes ? data.menuItems.nodes : [],
      events: data?.events?.nodes ?   data.events.nodes : [],
      services:data?.services?.nodes ? data.services : [],
      news: data?.news?.nodes ? data.news : [],
      data: data?.page ? data.page : []
    },
    revalidate: 1
  }
}
