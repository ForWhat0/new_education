import {useDispatch, useSelector} from "react-redux"
import {Modal} from "./modalStyled"
import {InputStyled} from "../input/input";
import {LoaderContainer} from "../leftComment/leftCommentStyLedComponents";
import React, {useEffect, useState} from "react";
import StyledLoader from "../loader/loader";
import {SendButton} from "../sendButton/sendButton";
import {actionClickModal} from "../../redux/actions/actions";

export const ModalRegisterEvent=()=>{
    const {language} = useSelector(state=>state.app)
    const {modal} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const [fName, setFName] = useState('')
    const [sName, setSName] = useState('')
    useEffect(() => {
        modal ?
            document.documentElement.style.overflow = 'hidden' :
            document.documentElement.style.overflow = 'unset'
    }, [modal])
    return(
        <Modal open={modal}>
            <form>
                <h2 onClick={()=>dispatch(actionClickModal())} >
                    X
                </h2>
                <h1>
                    реєстрація на захід
                </h1>
                <h3>
                    Для реєстрації на захід введіть ваші дані
                </h3>
                <InputStyled text="Ім'я" onChange={e => setFName(e.target.value)}   width='80%'/>
                <InputStyled text="Прізвище" onChange={e => setSName(e.target.value)}   width='80%'/>
                <LoaderContainer>
                    {1>2 &&  <StyledLoader/>}
                    <SendButton />
                </LoaderContainer>
            </form>
        </Modal>
    )
}