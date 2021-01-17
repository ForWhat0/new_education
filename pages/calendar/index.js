import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import styled from 'styled-components'
import {formatDate, ParcMenu, useOnClickOutside} from "../../src/components/hooks/hooks";
import GET_EVENTS_BY_DATE from "../../src/queries/get_events_by_date";
import CalendarEvents from "../../src/components/events/CalendarEvents";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import Calendar from 'react-calendar';
import React, {useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router'
import DatePicker from '../../src/components/datePicker/datePicker';
import 'react-day-picker/lib/style.css';
import GET_EVENTS_DATE from "../../src/queries/get_all_events_dete";
import {useSelector} from "react-redux";
import {device} from "../../src/components/deviceSizes/deviceSizes";
import {SearchBarStyled} from "../../src/components/searchBar/searchBar";
import StyledLoader from "../../src/components/loader/loader";
import reduxClient from "../../src/apollo/reduxClient";
import {SEARCH_EVENTS_BY_TITLE} from "../../src/queries/search_events_by_title";
import {calendarLsi} from "../../src/Lsi/lsi";

const Container = styled.div`
width:80%;
margin-left:10%;
 @media screen and ${device.tablet} {
    width: 90%;
    margin-left: 5%;
  }
`
const Title = styled.div`
width:100%;
position:relative;
    display: flex;
    align-items: center;
`
export const CalendarIcon = styled.div`
background-image: url('/calendarIcon.svg');
  background-repeat: no-repeat; 
  background-size: contain; 
  position: absolute;
    height: 60px;
    width: 60px;
    cursor: pointer;
    right: 0;
     @media screen and ${device.tablet} {
height: 30px;
    width: 30px;
  }
`
export const CalendarContainer = styled.div`
display:${props=>props.open};
    width: 320px;
position: absolute;
  right: 75px;
      top: 0;
  z-index: 5;
   @media screen and ${device.tablet} {
 right: 0;
 top:70px;
  }
  @media screen and ${device.mobileL} {
    top: 50px;
  }
  @media screen and ${device.mobileM} {
  right: -16px;
  }

`
export const CalendarWrapper = styled.div`
display: contents;
`
const Input = styled.div`
position:absolute;
right: 100px;
width:350px;
 @media screen and ${device.laptop} {
 position:relative;
 margin-bottom:40px;
 right:unset;
width:unset;
  }
`
export const LoaderContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  position:relative;
  margin:50px 0 50px 0;
`
const Header = styled.div`
display:flex;
position: relative;
    align-items: center;
    @media screen and ${device.laptop} {
  flex-direction:column;
  }
`
export default function EventCalendar({locale,loading,event,menu,allDates,contacts}) {

    const router = useRouter()
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const [value, onChange] = useState(event.length > 0 ? new Date(event[0].dateGmt ): new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [eventByTitle, setEventByTitle] = useState([]);
    const Search = async ()=>{
        setSearchLoading(true)
        const { data  } = await reduxClient.query( {
            query: SEARCH_EVENTS_BY_TITLE,
            variables: {
                search:searchInput,
                language:locale,
            }
        } )
        setSearchLoading(false)
        setEventByTitle({hours:(data.times.nodes)})
    }

    useEffect(() => {
        if (searchInput.length > 0) {
            Search()
        }

    }, [searchInput]);

    const selectedDay = value => {
        setCalendarOpen(false)
        onChange(value)
        router.push('/calendar/date/[currentDate]', `/calendar/date/${formatDate(value).substring(0,10)}`, { shallow: false })
    };
    const calendar = useRef();
    useOnClickOutside(calendar,  () => calendarOpen  &&  setCalendarOpen(!calendarOpen));
    const parsedMenu = ParcMenu(menu)
    return (
        <MainLayout
            databaseId={event?.databaseId}
            menu={parsedMenu}
            contacts={contacts}
        >
            <Container >
                <Header>
                    <Title >
                        <TitleForComponent text={calendarLsi.calendarEvents[locale]} />
                        <CalendarWrapper ref={calendar}>
                            <CalendarIcon onClick={()=>setCalendarOpen(!calendarOpen)}/>
                            <CalendarContainer open={calendarOpen ? 'block' : 'none'}>
                                <Calendar
                                    locale={locale === "EN" ? 'en-EN' : locale === "RU" ? 'ru-RU' : 'ua-UA'}
                                    className={!visuallyImpairedModeWhiteTheme ? 'calendarVisuallyMode' : 'calendar'}
                                    onChange={value => selectedDay(value)}
                                    value={value}
                                    tileDisabled={({date, view}) =>
                                        (view === 'month') &&
                                        allDates.every(disabledDate =>
                                            formatDate(date) !== disabledDate.dateGmt.toString().substring(0,10)
                                        )}
                                />
                            </CalendarContainer>
                        </CalendarWrapper>
                    </Title>
                    <Input>
                        <SearchBarStyled
                            maxlength={10}
                            width='100%'
                            inputPlaceholder={calendarLsi.search[locale]}
                            border='1px solid'
                            inputFunc={(e)=>setSearchInput(e.target.value)} />
                    </Input>
                </Header>

                    <DatePicker getSelectedDay={selectedDay}
                                tileDisabled={allDates}
                                selectDate={new Date(value)}
                    />

                {
                    searchInput.length > 0  ?

                        searchLoading ?
                            <LoaderContainer>
                                <StyledLoader/>
                            </LoaderContainer>
                            :

                            eventByTitle.hours?.length > 0 ?
                                <>
                                    <LoaderContainer>
                                        <h2 style={{margin: "0.67rem 0 0 0"}}>
                                            {calendarLsi.result[locale]}
                                        </h2>
                                    </LoaderContainer>
                                    <CalendarEvents loading={loading}  posts={eventByTitle}/>
                                </>
                            :
                                <LoaderContainer>
                                    <h2>{calendarLsi.notExist[locale]}</h2>
                                </LoaderContainer>

                            :

                        event.length > 0 ? <CalendarEvents loading={loading}  posts={event[0].eventsFields}/>
                        :
                            <LoaderContainer>
                                <h2>{calendarLsi.todayNotExist[locale]}</h2>
                            </LoaderContainer>
                }



            </Container>
        </MainLayout>

    )
}

export async function getStaticProps({locale,params}){

    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"

    const currentDate = params?.currentDate
    const today = new Date()
    const todayFormat = new Date().setHours(23,59,59,59)
    const currentDateFormatDate =  currentDate ?
        new Date(`${currentDate}T23:59:00`) :
       new Date(todayFormat)

    const status =  currentDateFormatDate > today ? "FUTURE" : "PUBLISH"
    const year =  currentDateFormatDate.getFullYear()
    const month = currentDateFormatDate.getMonth()+1
    const day = currentDateFormatDate.getDate()

    const { data ,loading } = await client.query( {
        query: GET_EVENTS_BY_DATE,
        variables: {
            status,
            year,
            month,
            day,
            contactsUri,
            location,
            language:locale
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
            loading,
            allDates,
            menu: data?.menuItems?.nodes || [],
            event:data?.events?.nodes ? data.events.nodes : [],
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
        },
        revalidate: 1
    }
}





