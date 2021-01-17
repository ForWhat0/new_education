import {useMutation} from "@apollo/client"
import  {useState} from "react"
import { useSelector} from "react-redux"
import {InputStyled} from "../input/input"
import {SendButton} from "../sendButton/sendButton"
import SEND_COMMENT from "../../mutations/sendComment"
import StyledLoader from '../loader/loader'
import {
    Container,
    ContainerWrapper,
    Flex,
    IconBackgroundZNO,
    InputsFields, LoaderContainer,
    SubTitle,
    Title, Label, TextZno
} from "./leftCommentStyLedComponents"
import {PageFooter} from "../footer/footer";
import {useRouter} from "next/router";
import {leftComment, leftCommentZno} from "../../Lsi/lsi";
import {registerZnoHook} from "../hooks/hooks";
import {SelectStyled} from "../select/select";


export const StyledRegisterZNO =({databaseId,showZNORegister,contacts,menu,display,src,align})=>{
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const router = useRouter()
    const locale = router.locale
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [learn, setLearn] = useState('')
    const [emptyFieldWarning, setEmptyFieldWarning] = useState(null)
    const [phoneWarning, setPhoneWarning] = useState(null)
    const [emailWarning, setEmailWaring] = useState(null)
    const [commentWarning, setCommentWarning] = useState(null)
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
                setEmptyFieldWarning('')
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
                setLearn('')
                setEmptyFieldWarning('')
                setCommentWarning('')
                setPhoneWarning('')
                setEmailWaring('')
            }
        }
    } )

    const handleSendClick = async () => {

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
        if (!learn){
            return setCommentWarning(leftComment.errors.emptyFields[locale])
        }

            if (phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/im)) {
                    if (comment.length > 6) {
                        await send()
                        await registerZnoHook(name, phone, email, comment, learn)
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

    const handleChange = selectedOption => {
        setLearn(selectedOption)
    }
    const options = [];
    showZNORegister.learn?.map(less=>
        options.push({
            value: less.nameLearn,
            label: less.nameLearn
        })
    )
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
                        <InputStyled maxlength='20' warning={emptyFieldWarning}  value={name} text= {leftCommentZno.name[locale]} onChange={e => setName(e.target.value)}   width='47.5%'/>
                        <InputStyled maxlength='20' warning={phoneWarning}   value={phone}  text= {leftCommentZno.phoneNumber[locale]} onChange={e => setPhone(e.target.value)}  width='47.5%'/>
                    </Flex>
                    <InputStyled   warning={emailWarning} value={email}  maxlength='40' text= {leftCommentZno.email[locale]} onChange={e => setEmail(e.target.value)} width='100%'/>
                    <InputStyled warning={commentWarning}   value={comment}  maxlength='100' text= {leftCommentZno.comment[locale]} onChange={e => setComment(e.target.value)} width='100%'/>
                    <Label>
                        {leftCommentZno.choose[locale]}
                    </Label>
                    <SelectStyled
                        value={learn}
                        onChange={handleChange}
                        options={options}
                    />
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