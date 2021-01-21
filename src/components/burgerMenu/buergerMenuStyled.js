import styled from 'styled-components';
import {device} from "../deviceSizes/deviceSizes";

export const StyledBurger = styled.button`
   @media screen and ${device.laptop}{
      display: flex;
  }
  position:${({ open }) => open ? 'fixed' : 'relative'};
  display:none;
  flex-direction: column;
      padding: 7px!important;
  align-items: center;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left:${({ open }) => open ? 'unset' : '20px'};
  z-index: 10;
   background: ${ props => props.open ? '#000' : props.dark ? '#000' : props.color};
    border-radius: 29px;
    overflow: hidden;
    height: 36px;
    width: 36px;
  &:focus {
    outline: none;
  }

  div {
  margin-top: 3px;
    width: 20px;
    height: 3px;
    background:${ props => props.open ? '#FFFFFF' : props.color === '#FFFFFF' ? '#000' : '#FFFFFF'};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
      right: ${({ open }) => open ? '-3px' : 'unset'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        right: ${({ open }) => open ? '-3px' : 'unset'};
    }
  }
`;