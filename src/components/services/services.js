import {useSelector} from "react-redux";
import {NewsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import StyledLoader from "../loader/loader";
import React from "react";
import {StyledButton} from '../button/button'
import Service from "./service";
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";
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
     width: 96%;
    margin-left: 2%;
  }
 width: 80%;
  margin-left: 10%;
`
export default function Services({posts}){
    const {loading} = useSelector(state=>state.app)
    const {language} = useSelector(state=>state.app)
    return(
        <GlobalContainer>
            <TitleForComponent fontSize='40px' text='Послуги'/>
            <ServicesContainer>
                {posts.map(node =>
                        <Service
                            databaseId={node.databaseId}
                            key={node.databaseId}
                            title={node.title}
                            coverImage={node.img}
                        />
                )}
            </ServicesContainer>
        </GlobalContainer>
    )
}