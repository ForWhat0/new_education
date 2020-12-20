import {useSelector} from "react-redux";
import {NewsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import StyledLoader from "../loader/loader";
import React, {useState} from "react";
import {StyledButton} from '../button/button'
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";
import Event from "./event";
import Link from "next/link";
const {review} = NewsLsi


const GlobalContainer = styled.div`
   display:none;
   
 @media screen and ${device.mobileL} {
     width: 96%;
     display:block;
    margin-left: 2%;
  }
`
const ButtonContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
`
export default function EventsMobile({posts}){
    const [open, setOpen] = useState(false);

    const {loading} = useSelector(state=>state.app)
    const {language} = useSelector(state=>state.app)
    return(
        <GlobalContainer>
            <TitleForComponent text='Послуги'/>
            {
                !open ?
                    <Link href={`/calendar/[currentHourId]`} as={`/calendar/${posts.hoursOne.databaseId}`}>
                        <a>
                    <Event
                        hoursOne={posts.hoursOne}
                    />
                        </a>
                    </Link>

            :

                    posts.hours.sort(function(a,b){
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
                <ButtonContainer>
                    <StyledButton text={!open ? 'open' : 'close'} func={()=>setOpen(!open)}/>
                </ButtonContainer>
        </GlobalContainer>
    )
}