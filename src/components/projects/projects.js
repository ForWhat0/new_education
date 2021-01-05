import React from 'react'
import Project from "./project"
import {TitleForComponent} from "../titleForComponent/title";
import styled from "styled-components";
import {LinkIcon} from "../headers/headerStyledElements";
import Link from "next/link";

const TitleContainer = styled.div`
margin-left: 10%;
padding: 20px;
margin-bottom:60px;
`

export default function Projects({textForIcon,posts,title}){
    return(
      <>
          <TitleContainer>
              <TitleForComponent  text={title} fontSize='40px' />
          </TitleContainer>
          {posts.map((node,i) =>
              <Link href={`/projects/[slug]`} as={`/projects/${node.slug}`}>
                  <a>
                      <Project
                          flexDirection={i%2 ? 'row-reverse':'row'}
                          background={i%2 ? "#FFFFFF" : node.projectFields?.bgColor? node.projectFields.bgColor :"#FFFFFF"}
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