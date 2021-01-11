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
 @media screen and (max-width:1250px) {
      grid-template-columns: 1fr;
  }
  margin-top:60px;
 display: grid;
    grid-template-columns: 1fr 1fr 1fr;
   grid-gap: 30px;
`
const GlobalContainer = styled.div`
margin-bottom:80px;
 @media screen and ${device.mobileL} {
     width: 96%;
    margin-left: 2%;
  }
 width: 80%;
  margin-left: 10%;
`
export default function Services({posts,titleServices,locale}){
    return(
        <GlobalContainer>
            <TitleForComponent fontSize='40px' text={titleServices}/>
            <ServicesContainer>
                {posts.map((node,index) =>
                        <Service
                            index={index}
                            locale={locale}
                            slug={node.slug}
                            key={node.databaseId}
                            title={node.title}
                            coverImage={node.featuredImage?.node.sourceUrl}
                        />
                )}
            </ServicesContainer>
        </GlobalContainer>
    )
}