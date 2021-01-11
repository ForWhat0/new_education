import {useMutation} from "@apollo/client"
import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {InputStyled} from "../input/input"
import {SendButton} from "../sendButton/sendButton"
import SEND_COMMENT from "../../mutations/sendComment"
import {ShowAlert} from "../../redux/actions/actions"
import StyledLoader from '../loader/loader'
import { useRouter } from 'next/router'

import {
    Container,
    ContainerWrapper,
    Flex,
    IconBackground,
    InputsFields, LoaderContainer,
    SubTitle,
    Text,
    Title
} from "./leftCommentStyLedComponents"
import {PageFooter} from "../footer/footer";
import {leftComment} from "../../Lsi/lsi";
import {sendComment} from "../hooks/hooks";

export const StyledLeftComment =({databaseId,contacts,menu,display,src,align})=>{

    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const content =
        `
       <h1>Коментар</h1>
        <ul>
        <li>ім'я: ${name} ;</li>
          <li>email: ${email} ;</li>
        <li>телефон: ${phone} ;</li>
          <li>коментар: ${comment};</li>
       <li>id: ${databaseId + Math.random()}</li>
        <ul/>
        `
    let [ send, {  data, error, loading }] = useMutation( SEND_COMMENT, {
        variables: {
            input:{
                commentOn: databaseId,
                author: name,
                authorEmail:email,
                content:content
            }
        },
        onCompleted: () => {
            if ( !error ) {
                setName('')
                setComment('')
                setPhone('')
                setEmail('')
                dispatch(ShowAlert(leftComment.sent[locale],'success'))
            }
        },
        onError: ( error ) => {
            if ( error ) {
                setName('')
                setComment('')
                setPhone('')
                setEmail('')
                dispatch(ShowAlert(leftComment.sent[locale],'success'))
            }
        }
    } )

    const handleSendClick = async() => {
        if (name && phone && email && comment) {
            if (phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/im)) {
                    if (comment.length > 6) {
                        send()
                        await sendComment(name,phone,email,comment)
                    } else {
                        dispatch(ShowAlert(leftComment.errors.commentShort[locale], 'error'))
                    }
                } else {
                    dispatch(ShowAlert(leftComment.errors.wrongEmail[locale], 'error'))
                }
            } else {
                dispatch(ShowAlert(leftComment.errors.wrongPhoneNumber[locale], 'error'))
            }
        } else {
            dispatch(ShowAlert(leftComment.errors.emptyFields[locale], 'error'))
        }
    }

    return (
        <Container background={!visuallyImpairedModeWhiteTheme ? '#1D1D1B' : '#F2F9FD'} src={src} display={display} align={align}>
            <Title>
                {leftComment.offer[locale]}
            </Title>
            <ContainerWrapper>
                <Text>
                   <IconBackground  background={!visuallyImpairedModeWhiteTheme ? 'leftCommentWhiteIcon.svg' : 'back.svg'}/>
                    <SubTitle>
                        {leftComment.writeUs[locale]}
                   </SubTitle>
                </Text>
                <InputsFields>
                    <Flex>
                        <InputStyled value={name} text={leftComment.name[locale]} onChange={e => setName(e.target.value)}   width='47.5%'/>
                        <InputStyled value={phone}  text={leftComment.phoneNumber[locale]} onChange={e => setPhone(e.target.value)}  width='47.5%'/>
                    </Flex>
                    <InputStyled value={email}   maxlength='40' text={leftComment.email[locale]} onChange={e => setEmail(e.target.value)} width='100%'/>
                    <InputStyled value={comment}  maxlength='100' text={leftComment.comment[locale]} onChange={e => setComment(e.target.value)} width='100%'/>
                    <LoaderContainer>
                        {loading &&  <StyledLoader/>}
                        <SendButton
                            sentText={leftComment.sent[locale]}
                            sendText={leftComment.send[locale]}
                            errorText={leftComment.sent[locale]}
                            error={error}
                            done={data}
                            loading={loading}
                            click={handleSendClick}/>
                    </LoaderContainer>
                </InputsFields>
            </ContainerWrapper>
            <PageFooter contacts={contacts} menu={menu}/>
        </Container>
    )
}