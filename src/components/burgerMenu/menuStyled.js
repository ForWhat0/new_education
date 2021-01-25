import styled from 'styled-components';

export const StyledMenu = styled.nav`
  height: 100%;
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  overflow-x: hidden;
  box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
   display: ${({ open }) => open ? 'block' : 'none'};
    width: ${({ open }) => open ? '60%' : '0'};
      transition: all 0.3s linear;
    padding:0;
  text-align: left;
    background-color: white;
   @media screen and  (max-width: 500px){
    width: ${({ open }) => open ? '100%' : '0'};
  }
 
  a {
    font-size: 16px;
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
export const Ul = styled.ul`
 list-style-type: none;
 display:flex;
 flex-direction:column;
 z-index: 5;
 align-items:center;
    margin: 150px 0 0 0;
    padding: 30px;
    text-align: center;
 list-style-type:none;
 @media (max-width: 500px) {
    margin: 100px 0 0 0;
      padding:unset;
    }
`
export const Li = styled.li`
    margin-bottom:20px;
`
export const SignIn = styled.div`
    display: flex;
    flex-direction: column;
    align-items-center;
`
export const CircleBackground = styled.div`
    height: 80%;
    z-index: -1;
    background: rgba(0, 174, 239, 0.08);
    width: 150%;
    top: 10%;
    right: 35%;
    border-radius: 50%;
    position: absolute;
`
export const ALink = styled.a`
cursor:pointer;
 background:${props=>props.activeLink?.background};
  -webkit-background-clip: ${props=>props.activeLink?.text};
  -webkit-text-fill-color:${props=>props.activeLink?.transparent};
`
export const HeaderInner = styled.div`
background: url(/diia_gradient.png);
width:100%;
 height: 74px;
    z-index: 6;
    position: fixed;
    background-size: cover;
     margin-top: unset;
    background-position: center;
    padding-bottom: unset;
    border-bottom: unset;
`
export const Header = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
   width:93.6%;
  margin-left:3.2%;
     @media (max-width: 500px) {
      height: 70px; 
    }
`