import client from "../../src/apollo/client"
import {MainLayout} from "../../src/components/layouts/mainLayout"
import styled from 'styled-components'
import {ParcMenu, startEndPagination} from "../../src/components/hooks/hooks";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import GET_HOUR_BY_ID from "../../src/queries/get_hour_by_id";
import GET_DATABASE_ID_FROM_TIME from "../../src/queries/get_all_databaseId_from_time";
import Time from "../../src/components/time/time";
import {device} from "../../src/components/deviceSizes/deviceSizes";
import {StyledDivWithIconBackGround} from "../../src/components/backgroundWithIcon/backgroundWithIcon";

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

export default function EventCalendar({loading,time,menu}) {

    const parsedMenu = ParcMenu(menu)
    const timeFormatted = new Date(time.hoursEvents?.hoursEvents)

    return (
        <MainLayout menu={parsedMenu} >
            <Container>

                <TitleForComponent text='Календар подій' />
                {time &&  <Time loading={loading} timeFormatted={timeFormatted} time={time}/>}
            </Container>
        </MainLayout>

    )
}

export async function getStaticProps(ctx){

    const currentHourId = ctx.params?.currentHourId

    const { data ,loading } = await client.query( {
        query: GET_HOUR_BY_ID,
        variables: {
            id:currentHourId
        }
    } )
    return {
        props: {
            loading,
            menu: data?.menuItems?.nodes || [],
            time:data?.time ? data.time : [],
        },
        revalidate: 1
    }
}
export const getStaticPaths = async () => {

    const { data } = await client.query( {
        query: GET_DATABASE_ID_FROM_TIME
    } )
    const paths = data?.times?.nodes?.map(item => {
        return { params: {currentHourId: item.databaseId.toString()}}
    })

    return {
        fallback: false,
        paths
    };
};





