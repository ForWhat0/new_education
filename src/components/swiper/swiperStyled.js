import styled from "styled-components";
import { device } from "../deviceSizes/deviceSizes";

export const PhotoContainer = styled.div`
  position: relative;
  border-radius: 3px;
  margin-bottom: 20px;
  flex: none;
  margin-bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
export const Container = styled.div`
  height: 360px;
  text-align: center;
  position: relative;
  @media screen and ${device.tablet} {
    height: 250px;
  }
`;
export const Photo = styled.img`
  margin-bottom: 20px;
  object-fit: cover;
  box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  border-radius: 30px;
  @media screen and ${device.tablet} {
    top: unset;
    height: ${(props) => props.height};
    margin-bottom: unset;
  }
`;
export const SwiperContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid;
  margin-bottom: 30px;
`;
export const ArrowsMobile = styled.div`
  display: flex;
  padding-top: 30px;
  height: 50px;
  align-items: center;
  @media screen and (max-width: 1290px) {
    display: block;
  }
`;
export const ArrowIconMobile = styled.div`
  position: absolute;
  background-position: center;
  background-size: contain;
  background: url(${(props) => props.arrow}) no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;
