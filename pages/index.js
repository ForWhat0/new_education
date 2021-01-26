import client from "../src/apollo/client"
import {HomePageLayout} from "../src/components/layouts/homePageLayout"
import LAST_EVENTS_AND_LAST_NEWS_QUERY from "../src/queries/get-all-data-for-home-page"
import LastNews from "../src/components/news/lastNews"
import ProjectsWrapper from "../src/components/projects/projectWrapper";
import Services from "../src/components/services/services";
import Team from "../src/components/team/team";
import Events from "../src/components/events/events";
import EventsMobile from "../src/components/events/eventsMobile";
import {ParcMenu} from "../src/components/hooks/hooks";
import GET_EVENTS_DATE from "../src/queries/get_all_events_dete";
import {useDispatch, useSelector} from "react-redux";
import {NewsLsi} from "../src/Lsi/lsi";
import {useEffect} from "react";
import {  Element, scroller } from 'react-scroll'
import {ScrollToElement} from "../src/redux/actions/actions";



export default function Home({contacts,locale,menu,news,events,data,services,allDates}) {
  const {mainPageFields} = data
  const parsedMenu = ParcMenu(menu)
  const {visuallyImpairedMode} = useSelector(state=>state.app)
  const dispatch = useDispatch()
  const {scrollToElement} = useSelector(state=>state.app)
    const teamData =  {
      text:mainPageFields.text,
      title:mainPageFields.titleCommand,
      employees:mainPageFields.employees
    }
    const popularProjectsData={
      title:mainPageFields.titleProject,
      projects:mainPageFields.projectPopular
    }

    useEffect(()=>{

       if (scrollToElement){
         scroller.scrollTo(scrollToElement, {
           duration: 800,
           delay: 0,
           smooth: 'easeInOutQuart'
         })
         dispatch(ScrollToElement(null))
       }

    },[scrollToElement])



  return (
      <HomePageLayout
          databaseId={data.databaseId}
     contacts={contacts}
     menu={parsedMenu}
     title = {mainPageFields.titleBanner}
      >

        {events.length > 0 &&<Events locale={locale} titleEvent={mainPageFields?.titleEvent}  posts={events}/>}
        {events.length > 0 &&<EventsMobile  locale={locale} titleEvent={mainPageFields?.titleEvent} allDates={allDates}  posts={events[0]}/>}
        {services?.nodes.length > 0 &&
        <Element name="#Services"  className="element">
          <Services locale={locale} titleServices={mainPageFields?.titleServices}  posts={services.nodes}  pageInfo={services.pageInfo} />
        </Element>

        }

        {popularProjectsData?.projects?.length > 0 &&<ProjectsWrapper locale={locale}  posts={popularProjectsData}/>}
        {
          !visuallyImpairedMode &&

          teamData?.employees?.length > 0 &&
        <Element name="#Team"   className="element">
          <Team  posts={teamData}/>
        </Element>
        }
        {news.nodes.length > 0 &&<LastNews title={NewsLsi.lastNews}  locale={locale} titleNews={mainPageFields?.titleNews} padding='40px 0 80px 0'  posts={news.nodes}  pageInfo={news.pageInfo} />}

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
    }
  }
}
