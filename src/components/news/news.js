import styled, {keyframes} from 'styled-components'
import React from "react"
import StyledTextComponent from "../textComponent/textComponent"
import Link from 'next/link';
import { isEmpty } from 'lodash';

const opacity = keyframes`
 0%   { opacity: 0; }
  100% { opacity: 1; }
`;

const NewsContainer = styled.div`
    animation: ${opacity} 1s linear;
`

const PhotoContainer = styled.div`
   position: relative;
    display: block;
    overflow: hidden;
    border-radius: 3px;
    margin-bottom:20px;
    flex: none;
    margin-bottom: 0;
     @media (max-width: 768px) {
    min-height:250px;
  }
}
`
const StyledPhoto = styled.img`
   border-radius: 30px;
     position: relative;
    width: 100%;
    height: 250px;
    background: #c5d2d9 no-repeat 50%;
    object-fit: cover;

`

export default function News(props) {
    return (
        <Link href={`/news/[slug]`} as={`/news/${props.slug}`}>
    <NewsContainer>
        <PhotoContainer >
            <StyledPhoto
                src={props.coverImage?.sourceUrl}
            />
        </PhotoContainer>
        <StyledTextComponent title={props.title} date={props.date} textForIcon={props.textForIcon}/>
    </NewsContainer>
        </Link>
    )
}
