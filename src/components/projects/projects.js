import Project from "./project"
import {TitleForComponent} from "../titleForComponent/title";
import styled from "styled-components";
import Link from "next/link";
import {useSelector} from "react-redux";
import {device} from "../deviceSizes/deviceSizes";

const TitleContainer = styled.div`
margin-left: 10%;
margin-bottom:60px;
 @media screen and ${device.tablet}{
  margin-left: 3.2%;
  width:93.6%;
  margin-bottom:20px;
  }
`

export default function Projects({textForIcon,posts,title}){

    const {visuallyImpairedMode} = useSelector(state=>state.app)

    const color = !visuallyImpairedMode ? 'transparent' : '#FFFFFF'

    return(
      <>
          <TitleContainer>
              <TitleForComponent  text={title} fontSize='40px' />
          </TitleContainer>
          {posts.map((node,i) =>
              <Link key={node.slug} href="/projects/[id]/" as={`/projects/${node.databaseId}/`}>
                  <a>
                      <Project
                          flexDirection={i%2 ? 'row-reverse':'row'}
                          background={i%2 ? color : node.projectFields?.bgColor? node.projectFields.bgColor : color}
                          backgroundIconAlign='right'
                          backgroundIconDisplay={i%2 ? "none":'block'}
                          backgroundIcon={i%2 ? null : node.projectFields?.bgImg?.sourceUrl? node.projectFields.bgImg.sourceUrl : null}
                          key={node.slug}
                          title={node.title}
                          coverImage={node.featuredImage?.node}
                          date={node.date}
                          author={node.author?.node}
                          slug={node.slug}
                          excerpt={node.excerpt}
                          textForIcon={textForIcon}
                          databaseId={node.databaseId}
                      />
                  </a>
              </Link>
          )}
      </>
    )
}