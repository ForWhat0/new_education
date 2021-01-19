import styled, {keyframes} from 'styled-components'
import format from "date-fns/format";
import {useSelector} from "react-redux";

const opacity = keyframes`
 0%   { opacity: 0; }
  100% { opacity: 1; }
`;
const EventContainer = styled.div`
color:${props=>props.color};
transition:all 1s linear;
animation: ${opacity} 1s linear;
position:relative;
cursor:pointer;
`
const TimeContainer = styled.div`
display:flex;
align-items: center;
margin-bottom: 10px;
padding-right:20px;
position: relative;
`

const Time = styled.div`
display:flex;
margin-left: -10px;
flex-direction:row;
align-items:center;
position: relative;
`
const Icon = styled.i`
    display: flex;
    font-size: 20px;
    cursor:pointer;
    margin-right:10px;
    border: ${props=>props.border};
    border-radius: ${props=>props.radius};
    padding:${props=>props.padding};
`

const Text = styled.p`
border-left: ${props=>props.border};
    line-height: 27px;
    font-weight:500;
     padding: 0 20px 20px 12px;
`



export default function CalendarEvent({offBorder,hoursOne}) {

    const inputDate = hoursOne?.hoursEvents?.hoursEvents ?
        new Date(hoursOne.hoursEvents.hoursEvents.replace(/-/g, "/"))
        : new  Date()
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)

    return (
            <EventContainer color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}>
                <TimeContainer>
                    <Time>
                        <Icon
                            className="fa fa-clock-o"
                            aria-hidden="true"
                        />
                        {`${format(inputDate, "HH")}:${format(inputDate, "mm")}`}
                    </Time>
                </TimeContainer>
                <Text border={offBorder ? 'unset' : '1px solid'}>

                    {hoursOne?.title}

                </Text>
            </EventContainer>
    )
}
