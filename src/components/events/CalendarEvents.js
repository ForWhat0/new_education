import CalendarEvent from "./CalendarEvent"
import Event from "./event";
import StyledLoader from "../loader/loader";
import styled from "styled-components";
import {MainLayout} from "../layouts/mainLayout";
import Link from "next/link";
import {device} from "../deviceSizes/deviceSizes";

const LoaderContainer = styled.div`
                width: 100%;
                display:flex;
                justify-content: center;
                margin-top: 70px;
                margin-bottom: 70px;
`
const GlobalContainer = styled.div`
margin:80px 0 80px 0;
 @media screen and ${device.mobileL} {
margin:40px 0 40px 0;
  }
`
export default function CalendarEvents({loading,posts}){
    const length = posts?.hours && posts.hours.length
    return(
        <GlobalContainer>
            {
                !posts?.hours?.length > 0 || loading  ?
                    <LoaderContainer>
                        <StyledLoader/>
                    </LoaderContainer>

                    :
                    posts.hours.slice().sort(function(a,b){
                        return new Date(a.hoursEvents.hoursEvents) - new Date(b.hoursEvents.hoursEvents)
                    }).map((el,i)=>
                        <Link href={`/calendar/[currentHourId]`} as={`/calendar/${el.databaseId}`}>
                            <a>
                                <CalendarEvent
                                hoursOne={el}
                                offBorder={length === i + 1}
                            />
                            </a>
                        </Link>

                    )
            }
        </GlobalContainer>
    )
}