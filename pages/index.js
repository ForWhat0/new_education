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
import GET_EVENTS_DATE from "../src/queries/get_all_events_dete";
import '../styles/Home.module.css'

export default function Home({menu,news,events,data,projects,services,allDates}) {
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
        {events.length > 0 &&<EventsMobile allDates={allDates}  posts={events[0]}/>}
        {services?.nodes.length > 0 &&
        <div id="Services" name="#Services" className="element">
          <Services  posts={services.nodes}  pageInfo={services.pageInfo} />
        </div>
        }
        {popularProjectsData?.projects?.length > 0 &&<ProjectsWrapper  posts={popularProjectsData}/>}
        {teamData?.employees.length > 0 &&
        <div id="Team" name="#Team" className="element">
          <Team  posts={teamData}/>
        </div>
        }
        {news.nodes.length > 0 &&<LastNews margin='80px'  posts={news.nodes}  pageInfo={news.pageInfo} />}
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

  const futureDate = await client.query( {
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

  const allDates = futureDate?.data?.events?.nodes?.concat(publishDate?.data?.events?.nodes);

  return {
    props: {
      menu:data?.menuItems?.nodes ? data.menuItems.nodes : [],
      events: data?.events?.nodes ?   data.events.nodes : [],
      services:data?.services?.nodes ? data.services : [],
      news: data?.news?.nodes ? data.news : [],
      data: data?.page ? data.page : [],
      allDates
    },
    revalidate: 1
  }
}
