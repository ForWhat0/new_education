import CalendarEvent from "./CalendarEvent"
import StyledLoader from "../loader/loader";
import styled from "styled-components";
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

padding:80px 0 80px 0;
 @media screen and ${device.tablet} {
padding:40px 0 40px 10px;
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
                        <Link key={i} href={`/calendar/[currentHourId]`} as={`/calendar/${el.databaseId}`}>
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