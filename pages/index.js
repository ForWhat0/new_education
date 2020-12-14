import client from "../src/apollo/client"
import {HomePageLayout} from "../src/components/layouts/homePageLayout"
import LAST_EVENTS_AND_LAST_NEWS_QUERY from "../src/queries/get-all-data-for-home-page"
import LastNews from "../src/components/news/lastNews"
import ProjectsWrapper from "../src/components/projects/projectWrapper";

import Services from "../src/components/services/services";
import Team from "../src/components/team/team";
import Events from "../src/components/events/events";
import EventsMobile from "../src/components/events/eventsMobile";

export default function Home({news,events,data,projects,services}) {
  console.log(news)
  const {mainPageFields} = data

    const teamData =  {
      text:mainPageFields.text,
      title:mainPageFields.titleCommand,
      employees:mainPageFields.employees
    }
    const popularProjectsData={
      title:mainPageFields.titleProject,
      projects:mainPageFields.projectPopular
    }
    const eventsData = [
      {
        choosenData:{
          slug:'slug',
          data:new Date(),
          text:'Круглий стіл ЦНОІМ «Вплив ЗМІ на підростаюче покоління та формування комп’ютерної залежності у підлітків м. Києва»'
        },
        allData:[
          {
            slug:'slug',
            data:new Date(),
            text:'kjandkjasndklasnd'
          },
          {
            slug:'slug',
            data:new Date(),
            text:'kjandkjasndklasnd'
          },
        ]
      },
      {
        choosenData:{
          slug:'slug',
          data:new Date(),
          text:'Круглий стіл ЦНОІМ «Вплив ЗМІ на підростаюче покоління та формування комп’ютерної залежності у підлітків м. Києва»'
        },
        allData:[
          {
            slug:'slug',
            data:new Date(),
            text:'kjandkjasndklasnd'
          },
          {
            slug:'slug',
            data:new Date(),
            text:'kjandkjasndklasnd'
          },
        ]
      },
      {
        choosenData:{
          slug:'slug',
          data:new Date(),
          text:'Круглий стіл ЦНОІМ «Вплив ЗМІ на підростаюче покоління та формування комп’ютерної залежності у підлітків м. Києва»'
        },
        allData:[
          {
            slug:'slug',
            data:new Date(),
            text:'kjandkjasndklasnd'
          },
          {
            slug:'slug',
            data:new Date(),
            text:'kjandkjasndklasnd'
          },
        ]
      }
    ]

  return (
      <HomePageLayout
     /* facebook={mainPageFields.facebook}
      telegram={mainPageFields.telegram}
      gmail={mainPageFields.gmail}*/
      >
        <Events posts={eventsData}/>
        <EventsMobile posts={eventsData[0]}/>
        {services?.nodes.length > 0 &&<Services  posts={services.nodes}  pageInfo={services.pageInfo} />}
        {popularProjectsData.projects.length > 0 &&<ProjectsWrapper  posts={popularProjectsData}/>}
        {teamData?.employees.length > 0 &&<Team  posts={teamData}/>}
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
      data: data?.page ? data.page : []
    },
    revalidate: 1
  }
}
