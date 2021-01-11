import {useDispatch, useSelector} from "react-redux"
import {Modal} from "./modalStyled"
import {InputStyled} from "../input/input";
import {LoaderContainer} from "../leftComment/leftCommentStyLedComponents";
import React, {useEffect, useState} from "react";
import StyledLoader from "../loader/loader";
import {SendButton} from "../sendButton/sendButton";
import {actionClickModal, ShowAlert} from "../../redux/actions/actions";
import {leftComment, registerOnEventModalLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import {registerOnEventHook, sendMail} from "../hooks/hooks";
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

export const ModalRegisterEvent=()=>{
    const {modal} = useSelector(state=>state.app)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const router = useRouter()
    const locale = router.locale
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [done, setDone] = useState(false)
    const { thanks,title,send,sent,subTitle,close,lastName,name,emptyFields,wrongName } = registerOnEventModalLsi
    useEffect(() => {
        modal ?
            document.documentElement.style.overflow = 'hidden' :
            document.documentElement.style.overflow = 'unset'
    }, [modal])

    const registerOnEvent = async (event) => {
        event.preventDefault()
        if ( fName && lName ){

                sendWordpress()
                await registerOnEventHook( modal.title, new Date(modal.hoursEvents?.hoursEvents), fName, lName )

        }
        else {
            dispatch(ShowAlert(emptyFields[locale], 'error'))
        }
    }
    const content =
        `
        <h1>Реєстрація на захід</h1>
        <ul>
        <li>ім'я: ${fName}</li>
        <li>прізвище: ${lName}</li>
        <li>id: ${modal.databaseId + Math.random()}</li>
        <ul/>
        `
    let [ sendWordpress, {  error, loading }] = useMutation( SEND_COMMENT, {
        variables: {
            input:{
                commentOn: modal.databaseId,
                content:content
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
        <Modal background={visuallyImpairedModeWhiteTheme ? 'white' : '#1D1D1B'} open={modal}>
                    <form>
                        {
                            !done ?
                                <>
                                    <h2 onClick={()=>dispatch(actionClickModal(false))} >
                                        X
                                    </h2>
                                    <h1>
                                        {title[locale]}
                                    </h1>
                                    <h3>
                                        {subTitle[locale]}
                                    </h3>
                                    <InputStyled background='transparent'  text={name[locale]} onChange={e => setFName(e.target.value)}   width='100%'/>
                                    <InputStyled  background='transparent' text={lastName[locale]} onChange={e => setLName(e.target.value)}   width='100%'/>
                                    <LoaderContainer>
                                        <SendButton
                                            loading={loading}
                                            click={registerOnEvent}
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
        </Modal>
    )
}