import styled from 'styled-components';

export const Modal = styled.nav`
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
    
    form{
    border-radius: 28px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
      position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    
    h1,h3{
     margin-bottom: 5%;
    }
    
    h2{
    position: absolute;
    top: 3%;
    right: 10%;
    cursor: pointer;
    }
    
 
`
