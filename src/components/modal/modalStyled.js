import styled from 'styled-components';
import {device} from "../deviceSizes/deviceSizes";

export const StyledModal = styled.div`
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 10;
    align-items: center;
    box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    display: ${({ open }) => open ? 'flex' : 'none'};
    z-index: 20;
`
export const FormContainer = styled.div`
    position: relative;
    border: 1px solid white;
    border-radius: 28px;
    justify-content: center;
    display: flex;
    z-index: 1;
    background: white;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.2), 0 5px 5px 0 rgba(0,0,0,0.24);  
    background: ${({ background }) => background };
   
  @media screen and ${device.mobileL}{
  width: 100%;
  margin:0;
  }
    
    form {
     @media screen and ${device.mobileL}{
      padding: 30px 15px;
    width: 93.6%;
  }
   padding: 40px 80px;
    width: 80%;
    
    h1{
     @media screen and ${device.mobileL}{
  font-size: 20px;
  }
    margin:20px 0 20px 0;
     text-align:center;
    }
    
    h3{
    @media screen and ${device.mobileL}{
  font-size: 16px;
  }
     margin:0 0 40px 0;
      text-align:center;
    }
    
    h2{
    @media screen and ${device.mobileL}{
     top: 3%;
  }
        margin: 0;
    position: absolute;
    top: 5%;
    right: 7%;
    cursor: pointer;
    }
   
    }
`
export const CloseModalButton = styled.div`
display:flex;
margin-top:60px;
 text-align:center;
justify-content:center;
`
