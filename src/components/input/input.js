import styled from "styled-components";
import { device } from "../deviceSizes/deviceSizes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const InputField = styled.div`
  @media screen and ${device.laptop} {
    width: 100%;
  }
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  width: ${(props) => props.width};
`;
const Input = styled.input.attrs((props) => ({
  type: "text",
  onChange: props.onChange,
  maxlength: props.maxlength,
  placeholder: props.placeholder,
}))`
  border: 1px solid ${(props) => props.borderColor};
  box-sizing: border-box;
  border-radius: 9px;
  padding: 10px;
  background: transparent;
  width: 100%;
  color: ${(props) => props.color};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => props.color};
  }
  :-ms-input-placeholder {
    color: ${(props) => props.color};
  }
`;
export const Text = styled.label`
  font-weight: normal;
  text-align: start;
  font-size: 16px;
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const Icon = styled.i`
  position: absolute;
  right: 20px;
  z-index: 1;
  color: red;
  font-size: 20px;
  display: ${(props) => props.display};
`;
const File = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 20px;
`;
const FileInput = styled.input.attrs((props) => ({
  type: "file",
  onChange: props.FileOnChange,
  value: props.FileValue,
}))`
  position: absolute;
  display: ${(props) => props.display};
  width: 20px;
  z-index: 5;
  opacity: 0;
`;

const FileIcon = styled.i`
  z-index: 1;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.color};
  display: ${(props) => props.display};

  ${File}:hover & {
    color: rgb(0, 174, 239);
  }
`;

export const InputStyled = ({
  borderColor,
  warning,
  maxlength,
  text,
  width,
  onChange,
  value,
  FileOnChange,
  FileValue,
  type,
}) => {
  const [warningText, setWarningText] = useState("");

  useEffect(() => {
    setWarningText(warning ? warning : "");
  }, [warning]);

  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);

  return (
    <InputField width={width} onClick={() => setWarningText("")}>
      <Text>{text}</Text>
      <div>
        <InputContainer>
          <Icon
            display={warningText.length ? "block" : "none"}
            className="fa fa-exclamation-triangle"
            aria-hidden="true"
          />
          <Input
            placeholder={warningText}
            color={visuallyImpairedModeWhiteTheme ? "#1D1D1B" : "white"}
            borderColor={
              borderColor
                ? borderColor
                : visuallyImpairedModeWhiteTheme
                ? "#1D1D1B"
                : "white"
            }
            value={value}
            maxLength={maxlength || 20}
            onChange={onChange}
          />
          <File>
            <FileInput
              display={type === "file" ? "block" : "none"}
              FileOnChange={FileOnChange}
              FileValue={FileValue}
            />
            <FileIcon
              display={
                warningText.length ? "none" : type === "file" ? "block" : "none"
              }
              className="fa fa-file"
              color={FileValue ? "rgb(0,174,239)" : "unset"}
              aria-hidden="true"
            />
          </File>
        </InputContainer>
      </div>
    </InputField>
  );
};
