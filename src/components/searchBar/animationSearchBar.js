import styled from "styled-components";
import { device } from "../deviceSizes/deviceSizes";
import { useSelector } from "react-redux";

const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  transition: width 0.3s ease-in-out;
  border: ${(props) => props.border};
  border-radius: 30px;
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  &:hover {
    width: 200px;
  }
  @media screen and ${device.mobileM} {
    &:hover {
      width: 140px;
    }
  }
`;
const Icon = styled.i`
  position: absolute;
  color: black;
  z-index: 3;
  font-size: 20px;
  @media screen and ${device.laptop} {
    font-size: 25px;
  }
  ${SearchBar}:hover & {
    right: 0;
  }
`;
const Input = styled.input.attrs((props) => ({
  name: props.name,
  onChange: props.func,
  value: props.value,
  placeholder: props.inputPlaceholder,
}))`
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #4f4f4f;
  }
  :-ms-input-placeholder {
    color: #4f4f4f;
  }
  color: black;
  cursor: pointer;
  background-color: ${(props) => props.color};
  padding: 5px 15px;
  font-size: 16px;
  width: 0;
  border: 1px solid #000000;
  transition: width 0.3s ease-in-out;
  z-index: 2;
  border-radius: 28px;
  @media screen and ${device.laptop} {
    padding: 9px 18px;
  }
  ${SearchBar}:hover & {
    width: 200px !important;
    background-color: white;
  }
  @media screen and ${device.mobileM} {
    ${SearchBar}:hover & {
      width: 140px !important;
    }
  }
`;
export const AnimationSearchBarStyled = ({
  background,
  value,
  inputName,
  inputFunc,
  inputPlaceholder,
}) => {
  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);
  const color = !visuallyImpairedModeWhiteTheme
    ? "white"
    : background
    ? background
    : "transparent";
  return (
    <SearchBar>
      <Icon className="fa fa-search" aria-hidden="true" />
      <Input
        color={color}
        autocomplete="off"
        maxLength="20"
        value={value}
        name={inputName}
        func={inputFunc}
        inputPlaceholder={inputPlaceholder}
      />
    </SearchBar>
  );
};
