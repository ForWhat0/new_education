import {ProjectsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import {StyledButton} from '../button/button'
import Projects from "./projects"
import Link from 'next/link'

const {review,allProjects} = ProjectsLsi

const ButtonContainer = styled.div`
width:100%;
margin-top:40px;
display:flex;
justify-content:center;
`
const Section = styled.section`
padding: 40px 0 40px 0;
`
export default function ProjectsWrapper({posts,locale}){
    return(
        <Section >
            <Projects title={posts.title} textForIcon={review[locale]} posts={posts.projects}/>
            <Link href={'/projects'}>
                <a>
                    <ButtonContainer>
                        <StyledButton
                            text={allProjects[locale]}
                        />
                    </ButtonContainer>
                </a>
            </Link>
        </Section>
    )
}
