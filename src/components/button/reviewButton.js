import styled from "styled-components";
import {ProjectsLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

 const ArrowIconContainer = styled.div`
     background-color: white;
  height: 30px;
  width: 30px;
  border: 1px solid;
  display: flex;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`
const IconText = styled.div`
   margin-left:10px;
   margin-right:40px;
   font-weight:400;
   line-height:15px;  
`
 const ArrowIcon = styled.div`
    background:url(/rightArrow.svg) no-repeat center center / contain;
    width: 20px;
  height: 25px;
  position:absolute;
  transition: all 0.5s linear;
`
 const ArrowContainer = styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  position: relative;
  vertical-align: middle;
  box-sizing: border-box;
  transition: all 0.25s;
  
  &::before,
  &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: ${props=>props.animation ? '2px solid transparent' : 'unset'};
    border-radius: 30px;
  }

  
  &::before {
    top: 0;
    left: 0;
  }

 
  &::after {
    top: 0;
    left: 0;
  }
  
  
  &:hover{
 
  ${ArrowIconContainer}{
     border:  ${props=>props.animation ? '1px solid transparent' : '1px solid'};
      background-color: ${props=>props.animation ? 'transparent' : 'white'};
    } 
    
  ${ArrowIcon}{
    margin-left: ${props=>props.animation ? '200%' : 'unset'};
    } 
    
  &::before,&::after {
  width: 100%;
    height: 100%;
  }
  
  &::before{
  border-top-color: black; 
    border-right-color: black;
    transition:
      width 0.25s ease-out, 
      height 0.25s ease-out 0.25s; 
  }
  
  &::after {
  border-bottom-color: black;
  border-left-color: black;
    transition:
      height 0.25s ease-out,
      width 0.25s ease-out 0.25s;
  }
  
  }

`
export const ReviewButton =()=>{
    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    return (
        <ArrowContainer animation={!visuallyImpairedMode}>
            <ArrowIconContainer >
                <ArrowIcon  />
            </ArrowIconContainer>
            <IconText>
                {ProjectsLsi.review[locale]}
            </IconText>
        </ArrowContainer>
    )
}