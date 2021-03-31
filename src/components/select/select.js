import Select, { components } from "react-select";
import { useSelector } from "react-redux";
export const SelectStyled = ({
  isComment,
  value,
  onChange,
  options,
  warning,
}) => {
  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      color: state.selectProps.menuColor,
      padding: 5,
      zIndex: 5,
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width,
      marginTop: "5px",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: `1px solid ${
        isComment && !visuallyImpairedModeWhiteTheme ? "white" : "#1D1D1B"
      }`,
      boxSizing: "border-box",
      borderRadius: "9px",
      display: "flex",
      padding: " 5px 0 5px 5px",
      fontSize: "12px",
    }),
  };

  const DropdownIndicator = (props) => {
    const color =
      !warning || value
        ? isComment && !visuallyImpairedModeWhiteTheme
          ? "white"
          : "black"
        : warning
        ? "red"
        : isComment && !visuallyImpairedModeWhiteTheme
        ? "white"
        : "black";
    const icon =
      !warning || value
        ? "fa fa-caret-down"
        : warning
        ? "fa fa-exclamation-triangle"
        : "fa fa-caret-down";
    return (
      <components.DropdownIndicator {...props}>
        <i
          style={{ color: color, fontSize: "15px", paddingRight: "5px" }}
          className={icon}
        />
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      placeholder={warning}
      value={value}
      onChange={onChange}
      styles={customStyles}
      components={{ DropdownIndicator }}
      width="100%"
      menuColor="black"
      options={options}
    />
  );
};
