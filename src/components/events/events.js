import {useSelector} from "react-redux";
import {NewsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import StyledLoader from "../loader/loader";
import React from "react";
import {StyledButton} from '../button/button'
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";
import Event from "./event";
const {review} = NewsLsi

const ServicesContainer = styled.div`
 @media screen and ${device.laptop} {
      grid-template-columns: 1fr;
  }
 display: grid;
    grid-template-columns: 1fr 1fr 1fr;
   grid-gap: 30px;
`
const GlobalContainer = styled.div`
 @media screen and ${device.mobileL} {
 display:none;
     width: 96%;
    margin-left: 2%;
  }
   display:block;
 width: 80%;
  margin-left: 10%;
`
export default function Events({posts}){
    const {loading} = useSelector(state=>state.app)
    const {language} = useSelector(state=>state.app)
    return(
        <GlobalContainer>
            <TitleForComponent text='Найближчі події'/>
            <ServicesContainer>
                {posts.map((node,i) =>
                    <Event
                        borderLeftColor={i === 0 ? '#0072BC' : i === 1 ? ' #FFDE00' : '#00AEEF'}
                        choosenData={node.choosenData}
                    />
                )}
            </ServicesContainer>
        </GlobalContainer>
    )
}