import styled from "styled-components";
import { device } from "../deviceSizes/deviceSizes";

export const TitleBlueBorder = styled.li`
  font-size: 24px;
  list-style-type: none;
  border-left: 5px solid #00aeef;
  padding-left: 19px;
  margin-bottom: 20px;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    font-size: 16px;
  }
  i {
    transform: rotateX(${(props) => props.open});
    color: ${(props) => props.color};
    margin-left: 10px;
    font-size: 17px;
  }
`;
export const ContentBlueBorder = styled.div`
  max-height: ${(props) => props.height};
  transition: max-height 0.15s ease-out;
  overflow: hidden;
  border-top: ${(props) => props.border};
  padding-top: ${(props) => props.pTop};
  margin-bottom: ${(props) => props.pTop};
  margin-top: ${(props) => props.mTop};
  @media screen and (max-width: 700px) {
    padding-top: unset !important;
    margin-bottom: unset !important;
  }
`;

export const Title = styled.span`
  font-size: 16px;
  border-bottom: 1px solid #1d1d1b;
  padding-bottom: ${(props) => props.pBottom};
  display: block;
  font-weight: 500;
  line-height: 27px;
  list-style-type: none;
  margin-bottom: 20px;
  cursor: pointer;

  i {
    -webkit-transform: rotate(${(props) => props.open});
    -moz-transform: rotate(${(props) => props.open});
    -o-transform: rotate(${(props) => props.open});
    -ms-transform: rotate(${(props) => props.open});
    transform: rotate(${(props) => props.open});
    color: ${(props) => props.color};
    margin-left: 10px;
    font-size: 17px;
  }
`;

export const Content = styled.div`
  max-height: ${(props) => props.height};
  transition: max-height 0.15s ease-out;
  border-bottom: ${(props) => props.bBottom};
  padding-bottom: ${(props) => props.pBottom};
  overflow: hidden;
  margin-bottom: ${(props) => props.pTop};
  margin-top: ${(props) => props.mTop};
  @media screen and ${device.mobileL} {
    display: flex;
    flex-direction: column;
  }
`;
