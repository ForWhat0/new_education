import styled from 'styled-components'
import PostBody from "../post-body/post-body"
import {device} from "../deviceSizes/deviceSizes"
import { format } from "date-fns"
import {enGB, ru, uk} from "date-fns/locale"


const Header = styled.div`
display:flex;
align-items: center;
  @media screen and ${device.laptop} {
 flex-direction:column;
  }
`
const Date = styled.div`
display:flex;
color:black;
justify-content:center;
align-items:center;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
    min-height: 112px;
    min-width: 125px;
    border-radius: 20px;
     @media screen and ${device.laptop} {
 margin-bottom:20px;
  }
    h1{
        padding: 0;
    margin: 0;
      @media screen and ${device.laptop} {
 font-size:20px;
  }
    }
`
const Text = styled.div`
display:flex;
margin-left:40px;
flex-direction:column;
 @media screen and ${device.laptop} {
margin-left:unset;
  }
h1{
    margin: 0;
    @media screen and ${device.laptop} {
 font-size:16px;
  }
}
`
const TimeWitchIcon = styled.div`
display:flex;
 margin-top:20px;
flex-direction:row;
align-items:center;
 @media screen and ${device.laptop} {
 justify-content: center;
  }
  i{
 
   display: flex;
    font-size: 20px;
    cursor:pointer;
    margin-right:5px;
    border: ${props=>props.border};
    border-radius: ${props=>props.radius};
    padding:${props=>props.padding};

     @media screen and ${device.mobileL} {
 right: unset;
 margin-right:10px;
  }
  }
  
`
export default function Time({locale,time,timeFormatted}) {
    const weekDay =  format(timeFormatted,  "EEEE",{locale: locale === "EN" ? enGB : locale === "RU" ? ru : uk})
    const numberDay = timeFormatted.getDate()

    return (
        <div>
           <Header >
              <Date>
                  <span>
                      {weekDay}
                  </span>
                  <h1>
                      {numberDay}
                  </h1>
              </Date>
               <Text>
                   <h1>
                       {time.title}
                   </h1>
                   <TimeWitchIcon>
                       <i
                           className="fa fa-clock-o"
                           aria-hidden="true"
                       />

                       {`${format(timeFormatted, "HH")}:${format(timeFormatted, "mm")}`}

                   </TimeWitchIcon>
               </Text>
           </Header>
            <PostBody content={time.content}/>
        </div>
    )
}
