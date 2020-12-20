import CalendarEvent from "./CalendarEvent"
import Event from "./event";
import StyledLoader from "../loader/loader";
import styled from "styled-components";
import {MainLayout} from "../layouts/mainLayout";
import Link from "next/link";

const LoaderContainer = styled.div`
                width: 100%;
                display:flex;
                justify-content: center;
                margin-top: 70px;
                margin-bottom: 70px;
`

export default function CalendarEvents({loading,posts}){
    console.log(!posts?.hours?.length > 0 ,loading)
    return(
        <div>
            {
                !posts?.hours?.length > 0 || loading  ?
                    <LoaderContainer>
                        <StyledLoader/>
                    </LoaderContainer>

                    :

                    posts.hours.slice().sort(function(a,b){
                        return new Date(a.hoursEvents.hoursEvents) - new Date(b.hoursEvents.hoursEvents)
                    }).map(el=>
                        <Link href={`/calendar/[currentHourId]`} as={`/calendar/${el.databaseId}`}>
                            <a>
                                <CalendarEvent
                                hoursOne={el}
                            />
                            </a>
                        </Link>

                    )
            }
        </div>
    )
}