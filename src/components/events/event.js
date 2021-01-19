import styled, {keyframes} from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import {uk,enGB, ru} from "date-fns/locale";
import {events} from "../../Lsi/lsi"
import {useSelector} from "react-redux";
import {StyledButton} from "../button/button";
import {firstChartToUpperCase} from "../hooks/hooks";
import {ReviewButton} from "../button/reviewButton";

const opacity = keyframes`
 0%   { opacity: 0; }
  100% { opacity: 1; }
`;
const EventContainer = styled.div`
min-width:${props=>props.visuallyImpairedMode ? 'unset' : '30%'}; 
min-height:${props=>props.visuallyImpairedMode ? 'unset' : '280px'};
padding-top:${props=>props.visuallyImpairedMode ? '20px' : '50px'};
padding-bottom:${props=>props.visuallyImpairedMode ? '20px' : '50px'};
display:${props=>props.visuallyImpairedMode ? 'flex' : 'block'};
align-items:center;
border-bottom:${props=>!props.visuallyImpairedModeWhiteTheme ? '1px solid white' : props=>props.visuallyImpairedMode ? '1px solid'  : 'unset'};
background:transparent;
box-shadow: ${props=>props.visuallyImpairedMode ? 'unset' : '0px 0px 20px rgba(29, 29, 27, 0.2)'};
border-radius: ${props=>props.visuallyImpairedMode ? 'unset' : '28px'};
color:${props=>!props.visuallyImpairedModeWhiteTheme ? 'white' : 'black'};
position:relative;
cursor:pointer;
 @media screen and ${device.mobileL} {
  animation: ${opacity} 1s linear;
box-shadow: unset;
background: unset;
min-width:unset;
min-height:unset;
padding-top:unset;
padding-bottom:unset;
transition:all 1s linear;
  }
`
const TimeContainer = styled.div`
border-left: 5px solid ${props=>props.borderLeftColor};
display:flex;
align-items: center;
padding-left:${props=>props.visuallyImpairedMode ? '40px' : '20px'};
padding-right:${props=>props.visuallyImpairedMode ? '40px' : '20px'};
position: relative;
@media screen and (max-width:1200px) {
padding-left:15px;
padding-right:15px;
  }
 @media screen and ${device.mobileL} {
border-left: unset;
padding-left:10px;
margin-bottom: 20px;
  }
`
const MonthAndDay = styled.div`
display:flex;
flex-direction:column;
margin-left:${props=>props.visuallyImpairedMode ? '40px' : '30px'};
@media screen and (max-width:1200px) {
margin-left:10px;
  }
  @media screen and ${device.laptop} {
margin-left:30px;
  }
 @media screen and ${device.mobileL} {
display:none;
  }
`
const Time = styled.div`
display:flex;
 top:6px;
flex-direction:row;
margin-left:40px;
align-items:center;
position: ${props=>props.visuallyImpairedMode ? 'initial' : 'absolute'};;
    right: 20px;
    @media screen and (max-width:1200px) {
  right: 15px;
  }
     @media screen and ${device.mobileL} {
 right: unset;
  top:unset;
 margin-left:unset;
  }
`
const Icon = styled.i`
    display: flex;
    font-size: 20px;
    color: ${props=>props.color};
    cursor:pointer;
    margin-right:5px;
    border: ${props=>props.border};
    border-radius: ${props=>props.radius};
    padding:${props=>props.padding};

     @media screen and ${device.mobileL} {
 right: unset;
 margin-right:10px;
  }
`
const TextField = styled.span`
padding:0;
width:${props=>props.visuallyImpairedMode ? 'max-content' : 'auto'};
margin:0;
font-size:${props=>props.fontSize};
font-weight:${props=>props.fontWeight};
 @media screen and ${device.mobileL} {
display:none;
  }
`
const Text = styled.p`
    line-height: 27px;
    font-weight:500;
    width:${props=>props.visuallyImpairedMode ? '70%' : 'auto'};
    margin:${props=>props.visuallyImpairedMode ? 'unset' : '80px 20px 0'};
    padding-right:${props=>props.visuallyImpairedMode ? '30px' : 'unset'};
     @media screen and (max-width:1200px) {
      margin: 30px 20px 0px;
    @media screen and ${device.mobileL} {
     border-left: ${props=>props.border};
     margin:0 0 20px 19px;
     padding: 0 20px 20px 12px;
  }
`
const Review = styled.div`
    display:flex;
   align-items: center;
   position:absolute;
   right:20px;
       bottom: 40px;
       @media screen and ${device.mobileL} {
display:none;
  }
`


export default function Event({offBorder,locale,borderLeftColor,hoursOne}) {
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const inputDate = hoursOne?.hoursEvents?.hoursEvents ?
        new Date(hoursOne.hoursEvents.hoursEvents.replace(/-/g, "/"))
        : new  Date()
    const borderLeft = visuallyImpairedMode ? '#1D1D1B' : borderLeftColor
    const renderDay=()=>{
        if(isToday(inputDate)){
            return events.today[locale]
        }
        else{
            return  firstChartToUpperCase(
                format(
                    inputDate,  "EEEE",{locale: locale === "EN" ? enGB : locale === "RU" ? ru : uk}
                )
            )
        }
    }

    return (
            <EventContainer visuallyImpairedModeWhiteTheme={visuallyImpairedModeWhiteTheme} visuallyImpairedMode={visuallyImpairedMode}>
               <TimeContainer visuallyImpairedMode={visuallyImpairedMode} borderLeftColor={borderLeft}>
                   <TextField
                       fontSize='40px !important'
                       fontWeight='bold'
                   >
                       {inputDate.getDate()}
                   </TextField>
                   <MonthAndDay visuallyImpairedMode={visuallyImpairedMode}>
                       <TextField
                           visuallyImpairedMode={visuallyImpairedMode}
                           fontSize='16px'
                           fontWeight='500'
                       >
                           {
                               firstChartToUpperCase(
                                   format(inputDate, "MMMM yyyy", {locale: locale === "EN" ? enGB : locale === "RU" ? ru : uk})
                               )

                           }
                       </TextField>
                       <TextField
                           fontSize='16px'
                           fontWeight='100'
                       >
                         {renderDay()}
                       </TextField>
                   </MonthAndDay>
                       <Time visuallyImpairedMode={visuallyImpairedMode}>
                           <Icon
                               color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}
                               className="fa fa-clock-o"
                               aria-hidden="true"
                           />
                           {`${format(inputDate, "HH")}:${format(inputDate, "mm")}`}
                       </Time>
               </TimeContainer>
                <Text visuallyImpairedMode={visuallyImpairedMode} border={offBorder ? 'unset' : '1px solid'}>

                    {hoursOne?.title}

                </Text>
                {
                    visuallyImpairedMode ?
                        <StyledButton  text={events.review[locale]}/>
                        :
                        <Review>
                        <ReviewButton/>
                        </Review>
                }
            </EventContainer>
    )
}
