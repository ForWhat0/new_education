import {events} from "../../Lsi/lsi"
import styled from 'styled-components'
import StyledLoader from "../loader/loader";
import  {useCallback, useState} from "react";
import {StyledButton} from '../button/button'
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";
import Event from "./event";
import Link from "next/link";
import DatePicker from "../datePicker/datePicker";
import client from "../../apollo/client";
import GET_EVENT_BY_DATE from "../../queries/get_event_by_date";


const GlobalContainer = styled.div`
   display:none;
 @media screen and ${device.mobileL} {
     width: 93.6%;
     display:block;
    margin-left: 3.2%;
      margin-bottom:40px;
  }
`
const EventContainer = styled.div`
 margin:40px 0 40px 0;
`
const ButtonContainer = styled.div`
      text-align: center;
  width:100%;
   margin:0 0 20px 0;
    @media screen and ${device.mobileL} {
     width: 96%;
  }
`

const LoaderContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  position:relative;
  margin:50px 0 50px 0;
`

export default function EventsMobile({locale,titleEvent,posts,allDates}){
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
                        day,
                        language:locale
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
            <TitleForComponent text={titleEvent}/>
            <DatePicker getSelectedDay={selectedDay}
                        doScroll = {new Date(currentDate.dateGmt).getDate()+new Date(currentDate.dateGmt).getMonth()+1}
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
                        <Link href={`/calendar/[currentHourId]`} as={`/calendar/${currentDate?.eventsFields?.hoursOne?.databaseId}`}>
                            <a>
                                <Event
                                    locale={locale}
                                    hoursOne={currentDate.eventsFields.hoursOne}
                                    offBorder={true}
                                />
                            </a>
                        </Link>
                    </EventContainer>
                :
                 <EventContainer>
                     {
                         currentDate.eventsFields.hours.slice().sort(function(a,b){
                             return new Date(a.hoursEvents.hoursEvents) - new Date(b.hoursEvents.hoursEvents)
                         }).map((el,i)=>
                             <Link key={i} href={`/calendar/[currentHourId]`} as={`/calendar/${el.databaseId}`}>
                                 <a>
                                     <Event
                                         locale={locale}
                                         hoursOne={el}
                                         offBorder={currentDate.eventsFields.hours.length === i + 1}
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
                    <StyledButton text={!open ? events.open[locale] : events.close[locale]} func={()=>setOpen(!open)}/>
                </ButtonContainer>
            }

            <ButtonContainer>
                <Link href={`/calendar`}>
                    <a>
                        <StyledButton  text={events.calendarEvents[locale]} />
                    </a>
                </Link>
            </ButtonContainer>
        </GlobalContainer>
    )
}