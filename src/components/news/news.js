import styled, {keyframes} from 'styled-components'
import StyledTextComponent from "../textComponent/textComponent"
import Link from 'next/link';
import {useSelector} from "react-redux";
import {device} from "../deviceSizes/deviceSizes";
import 'lazysizes'

const opacity = keyframes`
 0%   { opacity: 0; }
  100% { opacity: 1; }
`;

const NewsContainer = styled.div`
    animation: ${opacity} 1s linear;
    height:100%;
    width:100%;
    position:initial;
    padding-bottom: 10px;
     @media screen and ${device.tablet}{
 padding-bottom: unset;
  }
`

const PhotoContainer = styled.div`
   position: relative;
    display: ${props=>props.display};
    overflow: hidden;
    border-radius: 3px;
    margin-bottom:20px;
    flex: none;
    margin-bottom: 0;
     @media (max-width: 768px) {
    min-height:250px;
  }
  @media (max-width: 650px) {
    min-height:unset;
    height:157px;
  }
}
`

const StyledPhoto = styled.img`
   border-radius: 30px;
     position: relative;
      background: #c5d2d9;
    width: 100%;
    height: 250px;
    object-fit: cover;
    @media (max-width: 650px) {
    height: 100%;
  }
`

export default function News(props) {
    const {images} = useSelector(state=>state.app)
    return (
        <Link href="/news/[id]/" as={`/news/${props.databaseId}/`}>

                <NewsContainer>
                    <PhotoContainer display={images ? 'block' : 'none'} >
                        <StyledPhoto
                            className="lazyload"
                            data-src={props.coverImage?.sourceUrl}
                        />
                    </PhotoContainer>
                    <StyledTextComponent
                        fontSize='24px!important'
                        paddingBottom={props.paddingBottom ? props.paddingBottom : '40px'}
                        bottom={true}
                        title={props.title}
                        date={props.date}
                        textForIcon={props.textForIcon}/>
                </NewsContainer>

        </Link>
    )
}
