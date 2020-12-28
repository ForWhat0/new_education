import {useSelector} from "react-redux";
import {events} from "../../Lsi/lsi"
import styled from 'styled-components'
import StyledLoader from "../loader/loader";
import React from "react";
import {StyledButton} from '../button/button'
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";
import Event from "./event";
import Link from "next/link";


const ServicesContainer = styled.div`
 @media screen and (max-width:1250px) {
      grid-template-columns: 1fr;
  }
 display: grid;
    grid-template-columns: 1fr 1fr 1fr;
   grid-gap: 30px;
`
const ButtonContainer = styled.div`
display:flex;
justify-content:center;
margin-top:40px;
`
const GlobalContainer = styled.div`
margin-bottom:80px;
 @media screen and ${device.mobileL} {
 display:none;
     width: 96%;
    margin-left: 2%;
  }
   display:block;
 width: 80%;
  margin-left: 10%;
`
export default function Events({locale,posts,titleEvent}){

    return(
        <GlobalContainer>
            <TitleForComponent text={titleEvent}/>
            <ServicesContainer>
                {posts.map((node,i) =>
                    <Link href={`/calendar/date/[currentDate]`} as={`/calendar/date/${node.dateGmt.substring(0,10)}`}>
                        <a>
                            <Event
                                locale={locale}
                                borderLeftColor={i === 0 ? '#0072BC' : i === 1 ? ' #FFDE00' : '#00AEEF'}
                                hoursOne={node.eventsFields.hoursOne}
                            />
                        </a>
                    </Link>
                )}
            </ServicesContainer>
            <ButtonContainer>
                <Link href={`/calendar`}>
                    <a>
                        <StyledButton  text={events.calendarEvents[locale]}/>
                    </a>
                </Link>
            </ButtonContainer>
        </GlobalContainer>
    )
}