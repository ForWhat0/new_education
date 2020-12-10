import React from 'react'
import Project from "./project"
import {TitleForComponent} from "../titleForComponent/title";
import styled from "styled-components";

const TitleContainer = styled.div`
margin-left: 10%;
padding: 20px;
`

export default function Projects({textForIcon,posts,title,databaseId}){
    return(
      <>
          <TitleContainer>
              <TitleForComponent text={title} fontSize='40px' />
          </TitleContainer>
          {posts.map((node,i) =>
              <Project
                  flexDirection={i%2 ? 'row-reverse':'row'}
                  background={i%2 ? "#FFFFFF" : "rgba(0, 143, 213, 0.05)"}
                  backgroundIconAlign='right'
                  backgroundIconDisplay={i%2 ? "none":'block'}
                  backgroundIcon='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png'
                  key={node.slug}
                  title={node.title}
                  coverImage={node.featuredImage?.node}
                  date={node.date}
                  author={node.author?.node}
                  slug={node.slug}
                  excerpt={node.excerpt}
                  textForIcon='переглянути'
                  databaseId={node.databaseId}
              />
          )}
      </>
    )
}