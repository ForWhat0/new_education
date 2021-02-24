import styled from "styled-components";
import { useSelector } from "react-redux";
import Icon from "../icon/icon";
import { finance } from "../../Lsi/lsi";
import { formatBytes } from "../hooks/hooks";

const DownloadFile = styled.ul`
  color: ${(props) => props.color};
  position: relative;
  width: 100%;
  margin: 0;
  padding-left: 20px;
`;
const DownloadFileText = styled.li`
  display: flex;
  align-items: center;
  position: absolute;
  list-style-type: none;
  top: 0;
  bottom: unset;
  margin-top: 15px;
  margin-bottom: unset;
  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
`;
const DownloadFileTextAndArrow = styled.li`
display:flex;
align-items:center;
 position:absolute;
 list-style-type:none;
 top:unset;
 bottom:0;
 margin-top:unset;
 margin-bottom:15px;
  @media screen and (max-width:700px) {
font-size:16px;
  }  
 span{
 margin-left:5px;
 font:size:16px;
 }
`;

const DownloadItem = styled.a`
  display: flex;
  @media screen and (max-width: 700px) {
    margin-bottom: ${(props) => props.mBottom};
  }
`;

const Circle = styled.div`
  border-radius: 28px;
  background: white;
  height: 20px;
  width: 20px;
`;

export const PdfComponent = ({ mBottom, href, text, size, locale }) => {
  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);
  return (
    <DownloadItem mBottom={mBottom} href={href} download target="_blank">
      <Icon src="/pdf.svg" width="50px" height="100px" alt="PDF File" />
      <DownloadFile color={!visuallyImpairedModeWhiteTheme ? "white" : "black"}>
        <DownloadFileText>{text}</DownloadFileText>
        <DownloadFileTextAndArrow>
          <Circle>
            <Icon src="/arrow-right-in-circle.svg" width="20px" height="20px" />
          </Circle>
          <span>
            {finance.download[locale]} ({formatBytes(size)})
          </span>
        </DownloadFileTextAndArrow>
      </DownloadFile>
    </DownloadItem>
  );
};
