import styled from 'styled-components';
import {device} from "../deviceSizes/deviceSizes";

export const StyledMenu = styled.nav`
  display: flex;
  transform: ${({ open }) => open ? 'unset' : 'translateX(100%)'};
  box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
  flex-direction: column;
  position:fixed;
  height: 100vh;
  text-align: left;
  padding: 30px;
    background-color: white;
    z-index: 5;
  top: 0;
  right: -5px;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 900px) {
    width: 90%;
  }

  a {
    font-size: 24px;
    padding: 10px 0;
    font-weight: normal;
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: 900px) {
      text-align: center;
    }

  }
`
export const SignIn = styled.div`
    display: flex;
    flex-direction: column;
`
export const ALink = styled.a`

`
export const ChangeLanguageContainer = styled.div`
display:flex;
justify-content: center;
align-items: center;
`