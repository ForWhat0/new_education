import { useState } from "react";
import {
  TitleBlueBorder,
  Title,
  ContentBlueBorder,
  Content,
} from "./tree-selector-styled";

export const TreeSelect = ({ children, title, blueBorder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showTitle = () => {
    return blueBorder ? (
      <TitleBlueBorder
        open={isOpen ? "180deg" : "0"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <i className="fa fa-caret-down" />
      </TitleBlueBorder>
    ) : (
      <Title
        pBottom={isOpen ? "unset" : "20px"}
        open={isOpen ? "180deg" : "0"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <i className="fa fa-caret-down" />
      </Title>
    );
  };

  const showContent = () => {
    return blueBorder ? (
      <ContentBlueBorder
        height={isOpen ? "500px" : "0"}
        border={isOpen ? "1px solid" : "unset"}
        pTop={isOpen ? "40px" : "unset"}
        mTop={isOpen ? "20px" : "unset"}
      >
        {children}
      </ContentBlueBorder>
    ) : (
      <Content
        bBottom={isOpen ? "1px solid" : "unset"}
        pBottom={isOpen ? "20px" : "unset"}
        height={isOpen ? "500px" : "0"}
        pTop={isOpen ? "30px" : "unset"}
        mTop={isOpen ? "30px" : "unset"}
      >
        {children}
      </Content>
    );
  };

  return (
    <>
      {showTitle()}
      {showContent()}
    </>
  );
};
