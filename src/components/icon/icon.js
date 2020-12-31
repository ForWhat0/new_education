import Image from 'next/image'
import styled from "styled-components";

function Icon({src,alt,width,height}) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    )
}

export default Icon

 const IconBackground = styled.div`
    background:url(${props=>props.src})no-repeat;
     width: 60%;
    background-size: contain;
    height: 80%;
    background-position: center;
`
 const IconBackgroundContainer = styled.div`
    min-height: 30px;
    min-width: 30px;
    width:30px;
    height:30px;
    margin-right:20px;
    display: flex;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    background:white;
`
export const IconBackgroundSvg = ({src})=>{
    return(
        <IconBackgroundContainer>
            <IconBackground src={src}/>
        </IconBackgroundContainer>
    )
}