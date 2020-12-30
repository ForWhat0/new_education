import styled from 'styled-components'
import {device} from "../deviceSizes/deviceSizes";
export const Container = styled.div`
display: flex;
    width: 100%;
    background: inherit;
    align-items: center;
      margin:30px 0 0 0;
    scroll-behavior: smooth;
    @media screen and ${device.laptop} {
     margin:unset;
  }
`

export const ButtonWrapper = styled.div`
   margin:${props=>props.margin};
     background:  no-repeat url(${props=>props.arrow});
    cursor: pointer;
        width: 50px;
    height: 40px;
    flex-shrink: 0;
     @media screen and ${device.tablet} {
   display:none;
  }
`



export const DateListScrollable = styled.div`
 display: flex;
    overflow-x: scroll;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
`

export const MonthContainer=styled.div`
 display: flex;
    flex-direction: column;
`

export const MonthYearLabel = styled.div`
 align-self: flex-start;
    z-index: 3;
    font-size: 15px;
    font-weight: bold;
    position: sticky;
    top: 0;
    left: 0;
    width: max-content;
    margin: 0 14px 20px 0;
`

export const DateDayItem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 0 10px;
    background: darkgray;
    opacity: 0.4;
box-shadow: 0px 0px 10px rgba(29, 29, 27, 0.2);
border-radius: 20px;
     width: 125px;
height: 112px;
    flex-shrink: 0;
    @media screen and ${device.tablet} {
  width: 106px;
height: 88px;
  margin: 0 5px 0 5px;
  }
`

export const DaysContainer=styled.div`
 display: flex;
    z-index: 1;
    padding-bottom: 5px;
`

export const DayLabel= styled.div`
font-size: 16px;
    margin: 4px 0 0 0;
`

export const DateLabel= styled.div`
    font-size:  40px;
`