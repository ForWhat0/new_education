import {useSelector} from "react-redux";
import {NewsLsi} from "../../Lsi/lsi"
import styled from 'styled-components'
import StyledLoader from "../loader/loader";
import React, {useState} from "react";
import {StyledButton} from '../button/button'
import {TitleForComponent} from "../titleForComponent/title";
import {device} from "../deviceSizes/deviceSizes";
import Event from "./event";
const {review} = NewsLsi


const GlobalContainer = styled.div`
   display:none;
   
 @media screen and ${device.mobileL} {
     width: 96%;
     display:block;
    margin-left: 2%;
  }
`
const ButtonContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
`
export default function EventsMobile({posts}){
    const [open, setOpen] = useState(false);

    const {loading} = useSelector(state=>state.app)
    const {language} = useSelector(state=>state.app)
    return(
        <GlobalContainer>
            <TitleForComponent text='Послуги'/>
            {
                !open ?
                    <Event
                        choosenData={posts.choosenData}
                    />

            :
                    posts.allData.map(el=>
                        <Event
                            choosenData={el}
                        />
                    )
                }
                <ButtonContainer>
                    <StyledButton text={!open ? 'open' : 'close'} func={()=>setOpen(!open)}/>
                </ButtonContainer>
        </GlobalContainer>
    )
}