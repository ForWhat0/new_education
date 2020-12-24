import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import styled from 'styled-components'
import {formatDate, ParcMenu, startEndPagination, useOnClickOutside} from "../../src/components/hooks/hooks";
import GET_EVENTS_BY_DATE from "../../src/queries/get_events_by_date";
import CalendarEvents from "../../src/components/events/CalendarEvents";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import Calendar from 'react-calendar';
import {useEffect, useRef} from 'react'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import DayPicker from '../../src/components/datePicker/datePicker';
import 'react-day-picker/lib/style.css';
import GET_EVENTS_DATE from "../../src/queries/get_all_events_dete";
import Icon from "../../src/components/icon/icon";
import {useDispatch, useSelector} from "react-redux";
import {actionClickBurger} from "../../src/redux/actions/actions";
import {device} from "../../src/components/deviceSizes/deviceSizes";
import DatePicker from "../../src/components/datePicker/datePicker";
import {SearchBarStyled} from "../../src/components/searchBar/searchBar";
import {isSameDay} from "date-fns";
import StyledLoader from "../../src/components/loader/loader";
import reduxClient from "../../src/apollo/reduxClient";
import {SEARCH_EVENTS_BY_TITLE} from "../../src/queries/search_events_by_title";
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
const Header = styled.div`
display:flex;
position: relative;
    align-items: center;
    @media screen and ${device.laptop} {
  flex-direction:column;
  }
`
export default function EventCalendar({loading,event,menu,allDates}) {

    const router = useRouter()

    const [value, onChange] = useState(new Date(event[0].dateGmt));
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [eventByTitle, setEventByTitle] = useState([]);
    const Search = async ()=>{
        setSearchLoading(true)
        const { data  } = await reduxClient.query( {
            query: SEARCH_EVENTS_BY_TITLE,
            variables: {
                search:searchInput
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
        <MainLayout menu={parsedMenu} >
            <Container >
                <Header>
                    <Title >
                        <TitleForComponent text='Календар подій' />
                        <CalendarWrapper ref={calendar}>
                            <CalendarIcon onClick={()=>setCalendarOpen(!calendarOpen)}/>
                            <CalendarContainer open={calendarOpen ? 'block' : 'none'}>
                                <Calendar
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
                            maxlength={10}
                            width='100%'
                            inputPlaceholder='пошук за назвою події'
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
                                            Результат пошуку
                                        </h2>
                                    </LoaderContainer>
                                    <CalendarEvents loading={loading}  posts={eventByTitle}/>
                                </>
                            :
                                <LoaderContainer><h2>Такої події не існує</h2></LoaderContainer>

                            :
                        event.length > 0 &&<CalendarEvents loading={loading}  posts={event[0].eventsFields}/>
                }



            </Container>
        </MainLayout>

    )
}

export async function getStaticProps(ctx){

    const currentDate = ctx.params?.currentDate

    const today = new Date()
    const currentDateFormatDate =  currentDate && new Date(`${currentDate}T23:59:00`)
    const statusFromCurrentDate = currentDate && currentDateFormatDate > today ? "FUTURE" : "PUBLISH"

    const status = currentDate ? statusFromCurrentDate : "FUTURE"
    const year = currentDate ? currentDateFormatDate.getFullYear() : null
    const month = currentDate ? currentDateFormatDate.getMonth()+1 : null
    const day = currentDate ? currentDateFormatDate.getDate() : null

    const { data ,loading } = await client.query( {
        query: GET_EVENTS_BY_DATE,
        variables: {
            status,
            year,
            month,
            day
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
            loading,
            allDates,
            menu: data?.menuItems?.nodes || [],
            event:data?.events?.nodes ? data.events.nodes : [],
        },
        revalidate: 1
    }
}





