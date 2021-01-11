import {useMutation} from "@apollo/client"
import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {InputStyled} from "../input/input"
import {SendButton} from "../sendButton/sendButton"
import SEND_COMMENT from "../../mutations/sendComment"
import {ShowAlert} from "../../redux/actions/actions"
import StyledLoader from '../loader/loader'
import {
    Container,
    ContainerWrapper,
    Flex,
    IconBackgroundZNO,
    InputsFields, LoaderContainer, Select,
    SubTitle,
    Text,
    Title, Label, TextZno
} from "./leftCommentStyLedComponents"
import {PageFooter} from "../footer/footer";
import {useRouter} from "next/router";
import {leftComment, leftCommentZno} from "../../Lsi/lsi";
import {registerZnoHook} from "../hooks/hooks";

export const StyledRegisterZNO =({databaseId,showZNORegister,contacts,menu,display,src,align})=>{
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const router = useRouter()
    const locale = router.locale
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [learn, setLearn] = useState('')
    const content =
        `
        <h1>реєстрація на курси підготовки до ЗНО</h1>
        <ul>
        <li>ім'я: ${name} ;</li>
          <li>email: ${email} ;</li>
        <li>телефон: ${phone} ;</li>
          <li>коментар: ${comment};</li>
          <li>предмет: ${learn};</li>
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
                setLearn('')
                dispatch(ShowAlert(leftComment.sent[locale],'success'))
            }
        },
        onError: ( error ) => {
            if ( error ) {
                setName('')
                setComment('')
                setPhone('')
                setEmail('')
                setLearn('')
                dispatch(ShowAlert(leftComment.sent[locale],'success'))
            }
        }
    } )

    const handleSendClick = async () => {
        if (name && phone && email && comment && learn){
            if ( phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
                if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/im)){
                    if (comment.length > 6 ){
                        send()
                        await registerZnoHook(name,phone,email,comment,learn)
                    }
                    else{
                        dispatch(ShowAlert(leftCommentZno.errors.commentShort[locale], 'error'))
                    }
                }
                else {
                    dispatch(ShowAlert(leftCommentZno.errors.wrongEmail[locale], 'error'))
                }
            }
            else {
                dispatch(ShowAlert(leftCommentZno.errors.wrongPhoneNumber[locale], 'error'))
            }
        }
        else{
            dispatch(ShowAlert(leftCommentZno.errors.emptyFields[locale], 'error'))
        }

    }
    return (
        <Container background={!visuallyImpairedModeWhiteTheme ? '#1D1D1B' : '#F2F9FD'} src={src} display={display} align={align}>
            <Title>
                {showZNORegister.title}
            </Title>
            <ContainerWrapper>
                <TextZno>
                    <IconBackgroundZNO background={!visuallyImpairedModeWhiteTheme ? 'leftCommentZnoWhiteicon.svg' : 'registerZnoIcon.svg'} />
                    <SubTitle>
                        {leftCommentZno.writeUs[locale]}
                    </SubTitle>
                </TextZno>
                <InputsFields>
                    <Flex>
                        <InputStyled value={name} text= {leftCommentZno.name[locale]} onChange={e => setName(e.target.value)}   width='47.5%'/>
                        <InputStyled value={phone}  text= {leftCommentZno.phoneNumber[locale]} onChange={e => setPhone(e.target.value)}  width='47.5%'/>
                    </Flex>
                    <InputStyled value={email}  maxlength='40' text= {leftCommentZno.email[locale]} onChange={e => setEmail(e.target.value)} width='100%'/>
                    <InputStyled value={comment}  maxlength='100' text= {leftCommentZno.comment[locale]} onChange={e => setComment(e.target.value)} width='100%'/>
                    <Label>
                        {leftCommentZno.choose[locale]}
                    </Label>
                    <Select onChange={e => setLearn(e.target.value)}>
                        <option hidden disabled selected value> </option>
                        {showZNORegister.learn?.map(less=>
                        <option key={less.nameLearn} value={less.nameLearn}>{less.nameLearn}</option>
                        )}
                    </Select>
                    <LoaderContainer>
                        {loading &&  <StyledLoader/>}
                        <SendButton
                            error={error}
                            done={data}
                            sentText={leftComment.sent[locale]}
                            sendText={leftComment.send[locale]}
                            errorText={leftComment.sent[locale]}
                            loading={loading}
                            click={handleSendClick}/>
                    </LoaderContainer>
                </InputsFields>
            </ContainerWrapper>
            <PageFooter contacts={contacts} menu={menu}/>
        </Container>
    )
}