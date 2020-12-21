import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import styled from 'styled-components'
import {ParcMenu, startEndPagination} from "../../src/components/hooks/hooks";
import GET_EVENTS_BY_DATE from "../../src/queries/get_events_by_date";
import CalendarEvents from "../../src/components/events/CalendarEvents";
import {TitleForComponent} from "../../src/components/titleForComponent/title";

const Container = styled.div`
width:80%;
margin-left:10%;
`

export default function EventCalendar({loading,event,menu}) {

    const parsedMenu = ParcMenu(menu)

    return (
        <MainLayout menu={parsedMenu} >
            <Container>
                <TitleForComponent text='Календар подій' />
                {event.length > 0 &&<CalendarEvents loading={loading}  posts={event[0].eventsFields}/>}
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
    return {
        props: {
            loading,
            menu: data?.menuItems?.nodes || [],
            event:data?.events?.nodes ? data.events.nodes : [],
        },
        revalidate: 1
    }
}





