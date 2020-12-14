import React from 'react'
import {ProjectsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import {StyledButton} from '../button/button'
import Projects from "./projects"
import Link from 'next/link'

const {review,button} = ProjectsLsi

const ButtonContainer = styled.div`
width:100%;
margin-top:40px;
display:flex;
justify-content:center;
`
export default function ProjectsWrapper({language,posts}){
    return(
        <section>
            <Projects title={posts.title} textForIcon={review[language]} posts={posts.projects}/>
            <Link href={'/projects'}>
                <a>
                    <ButtonContainer>
                        <StyledButton
                            text='Всі проекти'
                            func={()=> {return null }}
                        />
                    </ButtonContainer>
                </a>
            </Link>
        </section>
    )
}