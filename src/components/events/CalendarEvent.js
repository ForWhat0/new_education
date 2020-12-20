import styled, {keyframes} from 'styled-components'
import Link from "next/link"
import {device} from "../deviceSizes/deviceSizes";

const opacity = keyframes`
 0%   { opacity: 0; }
  100% { opacity: 1; }
`;
const EventContainer = styled.div`
transition:all 1s linear;
animation: ${opacity} 1s linear;
position:relative;
cursor:pointer;
`
const TimeContainer = styled.div`
display:flex;
align-items: center;
margin-bottom: 20px;
padding-right:20px;
position: relative;
`
const MonthAndDay = styled.div`
display:none;
`
const Time = styled.div`
display:flex;
margin-left: -10px;
flex-direction:row;
align-items:center;
position: absolute;
`
const Icon = styled.i`
    display: flex;
    font-size: 20px;
    color: #000000;
    cursor:pointer;
    margin-right:10px;
    border: ${props=>props.border};
    border-radius: ${props=>props.radius};
    padding:${props=>props.padding};
`
const TextField = styled.span`
display:none;
`
const Text = styled.p`
border-left: 1px solid;
    line-height: 27px;
    font-weight:500;
     padding: 0 20px 20px 12px;
`
const Review = styled.div`
display:none;
`
const IconText = styled.div`
  
   font-weight:bold;
   line-height:15px;  
`


export default function CalendarEvent({borderLeftColor,hoursOne}) {

    const inputDate = new Date(hoursOne?.hoursEvents?.hoursEvents)

    const renderDay=()=>{
        const todayDate = new Date()
        if(inputDate.getDay()+inputDate.getMonth()+inputDate.getFullYear() ===
            todayDate.getDay()+todayDate.getMonth()+todayDate.getFullYear() ){
            return  'сьогодні'
        }
        else{
            return inputDate.toLocaleString('default', { weekday: 'long' })
        }
    }

    return (
            <EventContainer >
                <TimeContainer borderLeftColor={borderLeftColor}>
                    <TextField
                        fontSize='40px'
                        fontWeight='bold'
                    >
                        {inputDate.getDate()}
                    </TextField>
                    <MonthAndDay>
                        <TextField
                            fontSize='16px'
                            fontWeight='500'
                        >
                            {`${inputDate.toLocaleString('default', { month: 'long' })} ${inputDate.getUTCFullYear()}`}
                        </TextField>
                        <TextField
                            fontSize='16px'
                            fontWeight='100'
                        >
                            {renderDay()}
                        </TextField>
                    </MonthAndDay>
                    <Time>
                        <Icon
                            className="fa fa-clock-o"
                            aria-hidden="true"
                        />
                        {`${inputDate.getHours()}:${inputDate.getMinutes()<10?'0':''}${inputDate.getMinutes()}`}
                    </Time>
                </TimeContainer>
                <Text>

                    {hoursOne?.title}

                </Text>
                <Review >
                    <Icon
                        border='1px solid black'
                        radius='29px'
                        padding='5px'
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                    />
                    <IconText>
                        Переглянути
                    </IconText>
                </Review>
            </EventContainer>
    )
}
