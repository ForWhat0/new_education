import {useMutation} from "@apollo/client"
import  {useState} from "react"
import {useSelector} from "react-redux"
import {InputStyled} from "../input/input"
import {SendButton} from "../sendButton/sendButton"
import SEND_COMMENT from "../../mutations/sendComment"
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
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [nameWarning, setNameWarning] = useState(null)
    const [phoneWarning, setPhoneWarning] = useState(null)
    const [emailWarning, setEmailWaring] = useState(null)
    const [commentWarning, setCommentWarning] = useState(null)
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
                setNameWarning('')
                setCommentWarning('')
                setPhoneWarning('')
                setEmailWaring('')
            }
        },
        onError: ( error ) => {
            if ( error ) {
                setName('')
                setComment('')
                setPhone('')
                setEmail('')
                setNameWarning('')
                setCommentWarning('')
                setPhoneWarning('')
                setEmailWaring('')
            }
        }
    } )

    const handleSendClick = async() => {

        if ( !name ) {
           return  setNameWarning(leftComment.errors.emptyFields[locale])
        }
        if ( !phone ) {
            return  setPhoneWarning(leftComment.errors.emptyFields[locale])
        }
        if ( !email ) {
            return  setEmailWaring(leftComment.errors.emptyFields[locale])
        }
        if ( !comment ) {
            return setCommentWarning(leftComment.errors.emptyFields[locale])
        }
            if (phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/im)) {
                    if (comment.length > 6) {
                        await send()
                        await sendComment(name,phone,email,comment)
                    } else {
                        setComment('')
                        return  setCommentWarning(leftComment.errors.commentShort[locale])
                    }
                } else {
                    setEmail('')
                    return   setEmailWaring(leftComment.errors.wrongEmail[locale])
                }
            } else {
                setPhone('')
                return  setPhoneWarning(leftComment.errors.wrongPhoneNumber[locale])
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
                        <InputStyled maxlength='20' warning={nameWarning}  value={name} text={leftComment.name[locale]} onChange={e => setName(e.target.value)}   width='47.5%'/>
                        <InputStyled maxlength='20' warning={phoneWarning}  value={phone}  text={leftComment.phoneNumber[locale]} onChange={e => setPhone(e.target.value)}  width='47.5%'/>
                    </Flex>
                    <InputStyled warning={emailWarning}  value={email}   maxlength='40' text={leftComment.email[locale]} onChange={e => setEmail(e.target.value)} width='100%'/>
                    <InputStyled warning={commentWarning}  value={comment}  maxlength='100' text={leftComment.comment[locale]} onChange={e => setComment(e.target.value)} width='100%'/>
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