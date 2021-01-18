import styled from "styled-components";
import {ProjectsLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

 const ArrowIconContainer = styled.div`
     background-color: white;
  height: 28px;
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
   height:30px;
  
  &:hover{
 
  ${ArrowIconContainer}{
     border:  ${props=>props.animation &&  '1px solid'};
      background-color: ${props=>props.animation ? 'transparent' : 'white'};
      width:100%;
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