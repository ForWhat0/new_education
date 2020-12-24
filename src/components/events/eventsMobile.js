import {useSelector} from "react-redux";
import {NewsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import StyledLoader from "../loader/loader";
import React, {useCallback, useEffect, useState} from "react";
import {StyledButton} from '../button/button'
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";
import Event from "./event";
import Link from "next/link";
import DatePicker from "../datePicker/datePicker";
import {formatDate} from "../hooks/hooks";
import client from "../../apollo/client";
import GET_EVENTS_BY_DATE from "../../queries/get_events_by_date";
import {isSameDay} from "date-fns";
import GET_EVENT_BY_DATE from "../../queries/get_event_by_date";
const {review} = NewsLsi


const GlobalContainer = styled.div`
   display:none;
 @media screen and ${device.mobileL} {
     width: 96%;
     display:block;
    margin-left: 2%;
      margin-bottom:40px;
  }
`
const EventContainer = styled.div`
 margin:40px 0 40px 0;
`
const ButtonContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
   margin:0 0 20px 0;
`

const LoaderContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  position:relative;
  margin:50px 0 50px 0;
`

export default function EventsMobile({posts,allDates}){
    const [open, setOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(posts);
    const [loading, setLoading] = useState(false);

    const selectedDay = useCallback(
        (value) => {
            const selectedDay  = async () => {
                const today = new Date()
                const currentDateFormatDate = new Date(value.setHours(23, 59, 59))
                const status =  currentDateFormatDate > today ? "FUTURE" : "PUBLISH"

                const year =  currentDateFormatDate.getFullYear()
                const month = currentDateFormatDate.getMonth()+1
                const day =  currentDateFormatDate.getDate()

                setLoading(true)

                const { data  } = await client.query( {
                    query: GET_EVENT_BY_DATE,
                    variables: {
                        status,
                        year,
                        month,
                        day
                    }
                } )

                setLoading(false)
                setCurrentDate(data?.events.nodes[0])

            };
            selectedDay()
        },
        [],
    );

    return(
        <GlobalContainer>
            <TitleForComponent text='Послуги'/>
            <DatePicker getSelectedDay={selectedDay}
                        tileDisabled={allDates}
                        selectDate={new Date(currentDate.dateGmt)}
            />
            {
                loading ?
                    <LoaderContainer>
                        <StyledLoader/>
                    </LoaderContainer>
                :
                !open ?
                    <EventContainer>
                        <Link href={`/calendar/[currentHourId]`} as={`/calendar/${currentDate.eventsFields.hoursOne.databaseId}`}>
                            <a>
                                <Event
                                    hoursOne={currentDate.eventsFields.hoursOne}
                                />
                            </a>
                        </Link>
                    </EventContainer>
                :
                 <EventContainer>
                     {
                         currentDate.eventsFields.hours.slice().sort(function(a,b){
                             return new Date(a.hoursEvents.hoursEvents) - new Date(b.hoursEvents.hoursEvents)
                         }).map(el=>
                             <Link href={`/calendar/[currentHourId]`} as={`/calendar/${el.databaseId}`}>
                                 <a>
                                     <Event
                                         hoursOne={el}
                                     />
                                 </a>
                             </Link>
                         )
                     }
                 </EventContainer>


            }
            {
                !loading &&
                <ButtonContainer>
                    <StyledButton text={!open ? 'Розгорнути' : 'Згорнути'} func={()=>setOpen(!open)}/>
                </ButtonContainer>
            }

            <ButtonContainer>
                <Link href={`/calendar`}>
                    <a>
                        <StyledButton  text="Календар Подій"/>
                    </a>
                </Link>
            </ButtonContainer>
        </GlobalContainer>
    )
}