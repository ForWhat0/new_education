import styled, {keyframes} from 'styled-components'
import Link from "next/link"
import {device} from "../deviceSizes/deviceSizes";

const opacity = keyframes`
 0%   { opacity: 0; }
  100% { opacity: 1; }
`;
const EventContainer = styled.div`
min-width:30%; 
min-height:280px;
padding-top:50px;
padding-bottom:50px;
background: #FFFFFF;
box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
border-radius: 28px;
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
padding-left:20px;
padding-right:20px;
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
margin-left:30px;
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
position: absolute;
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
    color: #000000;
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
    margin: 80px 20px 0px;
     @media screen and (max-width:1200px) {
      margin: 30px 20px 0px;
    @media screen and ${device.mobileL} {
     border-left: 1px solid;
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
const IconText = styled.div`
   
   font-weight:bold;
   line-height:15px;  
`
export default function Event({borderLeftColor,choosenData}) {
    const renderDay=()=>{
        const inputDate = new Date(choosenData.data)
        const todaysDate = new Date()

        if(inputDate.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) {
           return  'сьогодні'
        }
        else{
            return choosenData.data.toLocaleString('default', { weekday: 'long' })
        }
    }
    return (
        <Link href={`/service/[databaseId]`} as={`/service/2`}>
            <EventContainer >
               <TimeContainer borderLeftColor={borderLeftColor}>
                   <TextField
                       fontSize='40px'
                       fontWeight='bold'
                   >
                       {choosenData.data.getDate()}
                   </TextField>
                   <MonthAndDay>
                       <TextField
                           fontSize='16px'
                           fontWeight='500'
                       >
                           {`${choosenData.data.toLocaleString('default', { month: 'long' })} ${choosenData.data.getUTCFullYear()}`}
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
                           {`${choosenData.data.getHours()}:${choosenData.data.getMinutes()<10?'0':''}${choosenData.data.getMinutes()}`}
                       </Time>
               </TimeContainer>
                <Text>
                    {
                        choosenData.text
                    }
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
        </Link>
    )
}
