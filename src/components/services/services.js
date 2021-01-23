import styled from 'styled-components'
import Service from "./service";
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";

const ServicesContainer = styled.div`
 @media screen and (max-width:1250px) {
      grid-template-columns: 1fr;
  }
   @media screen and ${device.tablet} {
    margin-top:20px;
  }
  margin-top:60px;
 display: grid;
    grid-template-columns: 1fr 1fr 1fr;
   grid-gap: 30px;
`
const GlobalContainer = styled.div`
 @media screen and ${device.tablet} {
     width: 93.6%;
    margin-left: 3.2%;
    padding: 40px 0 40px 0;
  }
 padding: 40px 0 40px 10%;
 width: 80%;
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
                            key={node.slug}
                            title={node.title}
                            coverImage={node.featuredImage?.node.sourceUrl}
                        />
                )}
            </ServicesContainer>
        </GlobalContainer>
    )
}