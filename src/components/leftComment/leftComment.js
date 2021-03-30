import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { InputStyled } from "../input/input";
import { SendButton } from "../sendButton/sendButton";
import SEND_COMMENT from "../../mutations/sendComment";
import StyledLoader from "../loader/loader";
import { useRouter } from "next/router";

import {
  Container,
  ContainerWrapper,
  Flex,
  IconBackground,
  InputsFields,
  Label,
  LoaderContainer,
  SubTitle,
  Text,
  Title,
} from "./leftCommentStyLedComponents";
import { PageFooter } from "../footer/footer";
import { appeal, leftComment } from "../../Lsi/lsi";
import { sendAppeal, sendComment, toBase64 } from "../hooks/hooks";
import { SelectStyled } from "../select/select";

export const StyledLeftComment = ({
  databaseId,
  contacts,
  menu,
  display,
  src,
  align,
}) => {
  const router = useRouter();
  const locale = router.locale;
  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [nameWarning, setNameWarning] = useState(null);
  const [emailWarning, setEmailWaring] = useState(null);
  const [lastNameWarning, setLastNameWarning] = useState(null);
  const [fileWarning, setFileWarning] = useState(null);
  const [reasonWarning, setReasonWarning] = useState(null);

  const handleSendClick = async (event) => {
    event.preventDefault();

    if (!name) {
      return setNameWarning(leftComment.errors.emptyFields[locale]);
    }
    if (!lastName) {
      return setLastNameWarning(leftComment.errors.emptyFields[locale]);
    }
    if (!email) {
      return setEmailWaring(leftComment.errors.emptyFields[locale]);
    }
    if (!reason) {
      return setReasonWarning(leftComment.errors.emptyFields[locale]);
    }
    if (!text) {
      return setFileWarning(leftComment.errors.emptyFields[locale]);
    }
    if (file) {
      if (file.size > 1024 * 1024) {
        setText("");
        setFile("");
        return setFileWarning(leftComment.errors.tooBigFileSize[locale]);
      }
      if (
        !["jpg", "jpeg", "png", "pdf", "document"].some((type) =>
          file.type.includes(type)
        )
      ) {
        setText("");
        setFile("");
        return setFileWarning(leftComment.errors.wrongFileFormat[locale]);
      }
    }

    if (email) {
      const fileBase64 = file
        ? await toBase64(file).then((dataUri) => {
            return dataUri;
          })
        : null;
      await sendWordpress();
      await sendAppeal(name, lastName, reason, email, text, fileBase64);
    } else {
      setEmail("");
      return setEmailWaring(leftComment.errors.wrongEmail[locale]);
    }
  };

  const clearAllFields = () => {
    setName("");
    setLastName("");
    setEmail("");
    setFile("");
    setText("");
    setReason("");
    setNameWarning("");
    setLastNameWarning("");
    setEmailWaring("");
    setFileWarning("");
  };

  const content = `
        <h1>Коментар / Звернення</h1>
        <ul>
        <li>ім'я: ${name}</li>
        <li>прізвище: ${lastName}</li>
        <li>email: ${email} ;</li>
        <li>тип звернення: ${reason}</li>
        <li>текст: ${text}</li>
        <li>id: ${Math.random() + Math.random()}</li>
        <ul/>
        `;
  let [sendWordpress, { data, error, loading }] = useMutation(SEND_COMMENT, {
    variables: {
      input: {
        commentOn: databaseId,
        author: name,
        authorEmail: email,
        content: content,
      },
    },
    onCompleted: () => {
      if (!error) {
        clearAllFields();
      }
    },
    onError: (error) => {
      if (error) {
        clearAllFields();
      }
    },
  });

  const handleChange = (selectedOption) => {
    setReason(selectedOption);
  };
  const options = [];
  appeal.typeOfAppeal.map((type) =>
    options.push({
      value: type[locale],
      label: type[locale],
    })
  );

  const changeFileHandler = (file) => {
    if (file) {
      const File = file.files[0];
      File.path = file.value;
      setFile(File);
    }
  };

  return (
    <Container
      background={!visuallyImpairedModeWhiteTheme ? "#1D1D1B" : "#F2F9FD"}
      src={src}
      display={display}
      align={align}
    >
      <Title>{leftComment.offer[locale]}</Title>
      <ContainerWrapper>
        <Text>
          <IconBackground
            background={
              !visuallyImpairedModeWhiteTheme
                ? "leftCommentWhiteIcon.svg"
                : "back.svg"
            }
          />
          <SubTitle>{leftComment.writeUs[locale]}</SubTitle>
        </Text>
        <InputsFields>
          <Flex>
            <InputStyled
              maxlength="20"
              warning={nameWarning}
              value={name}
              onChange={(e) => setName(e.target.value)}
              text={leftComment.name[locale]}
              width="47.5%"
            />
            <InputStyled
              maxlength="20"
              warning={lastNameWarning}
              value={lastName}
              text={appeal.lastName[locale]}
              onChange={(e) => setLastName(e.target.value)}
              width="47.5%"
            />
          </Flex>
          <InputStyled
            warning={emailWarning}
            value={email}
            maxlength="40"
            text={leftComment.email[locale]}
            onChange={(e) => setEmail(e.target.value)}
            width="100%"
          />
          <Label>{appeal.reason[locale]}</Label>
          <div style={{ marginBottom: "20px" }}>
            <SelectStyled
              value={reason}
              warning={reasonWarning}
              onChange={handleChange}
              options={options}
            />
          </div>
          <InputStyled
            type="file"
            maxlength="100"
            warning={fileWarning}
            value={text}
            text={appeal.text[locale]}
            onChange={(e) => setText(e.target.value)}
            FileOnChange={(e) => changeFileHandler(e.target)}
            FileValue={file && file.path}
            width="100%"
          />
          <LoaderContainer>
            {loading && <StyledLoader />}
            <SendButton
              sentText={leftComment.sent[locale]}
              sendText={leftComment.send[locale]}
              errorText={leftComment.sent[locale]}
              error={error}
              done={data}
              loading={loading}
              click={handleSendClick}
            />
          </LoaderContainer>
        </InputsFields>
      </ContainerWrapper>
      <PageFooter contacts={contacts} menu={menu} />
    </Container>
  );
};
