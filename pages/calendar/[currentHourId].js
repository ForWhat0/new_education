import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import styled from 'styled-components'
import {formatDate, ParcMenu, startEndPagination, useOnClickOutside} from "../../src/components/hooks/hooks";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import GET_HOUR_BY_ID from "../../src/queries/get_hour_by_id";
import GET_DATABASE_ID_FROM_TIME from "../../src/queries/get_all_databaseId_from_time";
import Time from "../../src/components/time/time";
import {device} from "../../src/components/deviceSizes/deviceSizes";
import {StyledDivWithIconBackGround} from "../../src/components/backgroundWithIcon/backgroundWithIcon";
import Calendar from "react-calendar";
import React, {useEffect, useRef, useState} from "react";
import GET_EVENTS_DATE from "../../src/queries/get_all_events_dete";
import {
    addDays,
    addMonths,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";
import {useRouter} from "next/router";
import {SearchBarStyled} from "../../src/components/searchBar/searchBar";
import StyledLoader from "../../src/components/loader/loader";
import CalendarEvents from "../../src/components/events/CalendarEvents";
import reduxClient from "../../src/apollo/reduxClient";
import {SEARCH_EVENTS_BY_TITLE} from "../../src/queries/search_events_by_title";
import {calendarLsi} from "../../src/Lsi/lsi";

const Container = styled.div`
width:80%;
margin-left:10%;
background: 20% / 20%  no-repeat url(/light_bulb_with_brain.svg);
background-position: bottom 50px right 100px;
@media screen and ${device.laptop} {
background-position: bottom 50px right 100px;
background: 20% / 60%  no-repeat url(/light_bulb_with_brain.svg);
  }
@media screen and ${device.mobileL} {
 width:94%;
margin-left:2%;
  }
`

const Title = styled.div`
width:100%;
position:relative;
    display: flex;
    align-items: center;
`
const CalendarIcon = styled.div`
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
const CalendarContainer = styled.div`
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
const CalendarWrapper = styled.div`
display: contents;
`
const Header = styled.div`
display:flex;
position: relative;
    align-items: center;
    @media screen and ${device.laptop} {
  flex-direction:column;
  }
`
const Input = styled.div`
position:absolute;
right:80px;
width:350px;
 @media screen and ${device.laptop} {
 position:relative;
 margin-bottom:40px;
 right:unset;
width:unset;
  }
`
const LoaderContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  position:relative;
  margin:50px 0 50px 0;
`
export default function EventCalendar({locale,contacts,loading,time,menu,allDates}) {
    const calendar = useRef();
    const parsedMenu = ParcMenu(menu)
    const timeFormatted = new Date(time.hoursEvents?.hoursEvents)
    const [value, onChange] = useState(timeFormatted)
    const router = useRouter()
    const [calendarOpen, setCalendarOpen] = useState(false);
    useOnClickOutside(calendar,  () => calendarOpen  &&  setCalendarOpen(!calendarOpen));

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
    useEffect(() => {
        setSearchInput('')
    }, [time]);

    const selectedDay = value => {
        setCalendarOpen(false)
        onChange(value)
        router.push('/calendar/date/[currentDate]', `/calendar/date/${formatDate(value).substring(0,10)}`, { shallow: false })
    };
    const onChangeSearch = e => {
        const { value } = e.target;
        setSearchInput(value)
    }
    return (
        <MainLayout databaseId={time.databaseId}   contacts={contacts} menu={parsedMenu} >
            <Container>
                <Header>
                    <Title >
                        <TitleForComponent text={calendarLsi.calendarEvents[locale]} />
                        <CalendarWrapper ref={calendar}>
                            <CalendarIcon onClick={()=>setCalendarOpen(!calendarOpen)}/>
                            <CalendarContainer open={calendarOpen ? 'block' : 'none'}>
                                <Calendar
                                    locale={locale === "EN" ? 'en-EN' : locale === "RU" ? 'ru-RU' : 'ua-UA'}
                                    className='calendar'
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
                            type="text"
                            maxlength={10}
                            value={searchInput}
                            width='100%'
                            inputPlaceholder={calendarLsi.search[locale]}
                            border='1px solid'
                            inputFunc={onChangeSearch} />
                    </Input>
                </Header>
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
                        time &&  <Time locale={locale} loading={loading} timeFormatted={timeFormatted} time={time}/>
                }

            </Container>
        </MainLayout>

    )
}

export async function getStaticProps({params,locale}){

    const currentHourId = params?.currentHourId
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"

    const { data ,loading } = await client.query( {
        query: GET_HOUR_BY_ID,
        variables: {
            id:currentHourId,
            contactsUri,
            location,
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
            allDates,
            loading,
            locale,
            menu: data?.menuItems?.nodes || [],
            time:data?.time ? data.time : [],
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
        },
        revalidate: 1
    }
}
export const getStaticPaths = async ({locales}) => {
    let paths = []

    const { data } = await client.query( {
        query: GET_DATABASE_ID_FROM_TIME
    } )

    for (const locale of locales) {
        paths = [
            ...paths,
            ...data.times?.nodes.map(el => ({ params: { currentHourId: el.databaseId.toString() }, locale })),
        ]
    }

    return {
        fallback: false,
        paths
    };
};





