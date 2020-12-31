import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  transform: ${({ open }) => open ? 'unset' : 'translateX(100%)'};
  box-shadow: 0px 0px 20px rgba(29, 29, 27, 0.2);
  flex-direction: column;
  position:fixed;
  height: 100vh;
  text-align: left;
     overflow-y: auto;
    background-color: white;
    z-index: 5;
  top: 0;
  right: -5px;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 900px) {
    width: 90%;
  }
   @media (max-width: 500px) {
    width: 100%;
    right:0;
    padding:0;
  }
 

 
  a {
    font-size: 20px;
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
    height: 100%;
    z-index: -1;
    background: rgba(0, 174, 239, 0.08);
    width: 150%;
    top: 10%;
    right: 35%;
    border-radius: 50%;
    position: absolute;
`
export const ALink = styled.a`
 background:${props=>props.activeLink?.background};
  -webkit-background-clip: ${props=>props.activeLink?.text};
  -webkit-text-fill-color:${props=>props.activeLink?.transparent};
`

export const Header = styled.div`
background: url(https://epo.org.ua/wp-content/uploads/2020/11/diia_gradient_03.png);
    padding-left: 15px;
    height: 74px;
    z-index: 6;
 
    position: fixed;
    background-size: cover;
    width: 100%;
    margin-top: unset;
    background-position: center;
    padding-bottom: unset;
    border-bottom: unset;
     @media (max-width: 500px) {
      height: 70px;
   
    }
`