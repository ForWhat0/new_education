import {useDispatch, useSelector} from "react-redux"
import { StyledModal} from "./modalStyled"
import {InputStyled} from "../input/input";
import {LoaderContainer} from "../leftComment/leftCommentStyLedComponents";
import React, {useEffect, useState} from "react";
import StyledLoader from "../loader/loader";
import {SendButton} from "../sendButton/sendButton";
import {actionClickModal, ShowAlert} from "../../redux/actions/actions";
import {leftComment, ModalLsi, registerOnEventModalLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import {registerOnEventHook, registerOnServiceHook, sendMail} from "../hooks/hooks";
import {useMutation} from "@apollo/client";
import SEND_COMMENT from "../../mutations/sendComment";
import {StyledButton} from "../button/button";
import {CircleBackground} from "../layouts/lognIn_register_layout";


const renderCircles = ()=>{
    return (
        <>
            <CircleBackground
                height='100px'
                left='45px'
                top='45px'
                width='100px'
                background='rgba(0, 174, 239, 0.08);'
                zIndex='-1'
            />
            <CircleBackground
                height='60px'
                left='150px'
                bottom='140px'
                width='60px'
                background='rgba(255, 222, 0, 0.08);'
                zIndex='-1'
            />
            <CircleBackground
                height='40px'
                right='45px'
                bottom='90px'
                width='40px'
                background='rgba(0, 174, 239, 0.08);'
                zIndex='-1'
            />
        </>
    )
}

export const Modal=()=>{
    const {modal} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const router = useRouter()
    const locale = router.locale
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [phone, setPhone] = useState('')
    const [done, setDone] = useState(false)
    const {
        titleEvent,
        subTitleEvent,
        titleService,
        subTitleService,
        send,
        sent,
        close,
        thanks,
        name,
        lastName,
        phoneNumber,
        emptyFields,
        wrongData
    } = ModalLsi
    useEffect(() => {
        modal ?
            document.documentElement.style.overflow = 'hidden' :
            document.documentElement.style.overflow = 'unset'
    }, [modal])

    const registerOnEvent = async (event) => {
        event.preventDefault()
        if ( fName && lName ){

               await sendWordpress()
                await registerOnEventHook( modal.title, new Date(modal.hoursEvents?.hoursEvents), fName, lName )

        }
        else {
            dispatch(ShowAlert(emptyFields[locale], 'error'))
        }
    }
    const registerOnService = async (event) => {
        event.preventDefault()
        if ( fName && lName  && phone){
            if (phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                await sendWordpress()
                await registerOnServiceHook( modal.title, fName, lName,phone )
            }
            else {
                dispatch(ShowAlert(wrongData[locale], 'error'))
            }

        }
        else {
            dispatch(ShowAlert(emptyFields[locale], 'error'))
        }
    }
    const contentEvent =
        `
        <h1>Реєстрація на захід</h1>
        <ul>
        <li>ім'я: ${fName}</li>
        <li>прізвище: ${lName}</li>
        <li>id: ${modal.databaseId + Math.random()}</li>
        <ul/>
        `
    const contentService =
        `
        <h1>Запит на послугу</h1>
        <ul>
        <li>ім'я: ${fName}</li>
        <li>прізвище: ${lName}</li>
        <li>телефон: ${phone}</li>
         <li>послуга: ${modal.title && modal.title}</li>
        <li>id: ${modal.databaseId + Math.random()}</li>
        <ul/>
        `
    let [ sendWordpress, {  error, loading }] = useMutation( SEND_COMMENT, {
        variables: {
            input:{
                commentOn: modal.databaseId,
                content:modal.type === 'event' ? contentEvent : contentService
            }
        },
        onCompleted: () => {
            if ( !error ) {
                setDone(true)
                dispatch(ShowAlert(sent[locale],'success'))
            }
        },
        onError: ( error ) => {
            if ( error ) {
                setDone(true)
                dispatch(ShowAlert(sent[locale],'success'))
            }
        }
    } )
     const closeModal =()=>{
       return  (
           dispatch(actionClickModal(false)),
           setFName(''),
           setLName(''),
           setDone(false)
       )

     }
    return(
        <StyledModal background={visuallyImpairedModeWhiteTheme ? 'white' : '#1D1D1B'} open={modal}>
                    <form>
                        {
                            !done ?
                                <>
                                    <h2 onClick={()=>dispatch(actionClickModal(false))} >
                                        X
                                    </h2>
                                    <h1>
                                        { modal.type === 'event' ? titleEvent[locale] : titleService[locale] }
                                    </h1>
                                    <h3>
                                        { modal.type === 'event' ? subTitleEvent[locale] : subTitleService[locale] }
                                    </h3>
                                    <InputStyled background='transparent'  text={name[locale]} onChange={e => setFName(e.target.value)}   width='100%'/>
                                    <InputStyled  background='transparent' text={lastName[locale]} onChange={e => setLName(e.target.value)}   width='100%'/>
                                    {
                                        modal.type !== 'event' &&
                                        <InputStyled  background='transparent' text={phoneNumber[locale]} onChange={e => setPhone(e.target.value)}   width='100%'/>
                                    }
                                    <LoaderContainer>
                                        <SendButton
                                            loading={loading}
                                            click={ modal.type === 'event' ? registerOnEvent : registerOnService}
                                            sendText={send[locale]}
                                        />
                                    </LoaderContainer>
                                </>
                                :
                                <>
                                    <h2 onClick={()=>dispatch(actionClickModal(false))} >
                                        X
                                    </h2>
                                    <h1>
                                        {thanks[locale]}
                                    </h1>
                                    <h3>
                                        {sent[locale]}
                                    </h3>
                                    <StyledButton style={{marginTop:'60px'}} func={closeModal} text={close[locale]}/>
                                </>
                        }
                        {renderCircles()}
                    </form>
        </StyledModal>
    )
}