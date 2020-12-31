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
import {NewsLsi} from "../src/Lsi/lsi";

export default function Home({contacts,locale,menu,news,events,data,projects,services,allDates}) {
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
          databaseId={data.databaseId}
     contacts={contacts}
     menu={parsedMenu}
     title = {mainPageFields.titleBanner}
      >

        {events.length > 0 &&<Events locale={locale} titleEvent={mainPageFields?.titleEvent}  posts={events}/>}
        {events.length > 0 &&<EventsMobile locale={locale} titleEvent={mainPageFields?.titleEvent} allDates={allDates}  posts={events[0]}/>}
        {services?.nodes.length > 0 &&
        <div id="Services" name="#Services" className="element">
          <Services locale={locale} titleServices={mainPageFields?.titleServices}  posts={services.nodes}  pageInfo={services.pageInfo} />
        </div>
        }
        {popularProjectsData?.projects?.length > 0 &&<ProjectsWrapper locale={locale}  posts={popularProjectsData}/>}
        {teamData?.employees?.length > 0 &&
        <div id="Team" name="#Team" className="element">
          <Team  posts={teamData}/>
        </div>
        }
        {news.nodes.length > 0 &&<LastNews locale={locale} titleNews={mainPageFields?.titleNews} margin='80px'  posts={news.nodes}  pageInfo={news.pageInfo} />}
      </HomePageLayout>
  )
}
export async function getStaticProps({locale} ){

  const uri = locale === "EN" ? "/en/glavnaya-english/" : locale === "RU" ? "/ru/glavnaya-2/"  : "/"
  const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
  const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"

  const { data } = await client.query( {
    query: LAST_EVENTS_AND_LAST_NEWS_QUERY,
    variables: {
      uri,
      language:locale,
      location,
      contactsUri
      }
  } )

  const futureDate = await client.query( {
    query: GET_EVENTS_DATE,
    variables:{
      status:"FUTURE",
      language:locale
    }
  } )
  const  publishDate = await client.query( {
    query: GET_EVENTS_DATE,
    variables:{
      status:"PUBLISH",
      language:locale
    }
  } )

  const allDates = futureDate?.data?.events?.nodes?.concat(publishDate?.data?.events?.nodes);

  return {
    props: {
      locale,
      contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
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
