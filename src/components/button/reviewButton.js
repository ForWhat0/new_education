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
   transition: all 0.5s ease-in-out;
   position:absolute;
   left:0;
`
const IconText = styled.div`
   margin-left:40px;
   margin-right:40px;
   font-weight:400;
   line-height:15px;  
`
 const ArrowIcon = styled.div`
    background:url(/rightArrow.svg) no-repeat center center / contain;
    width: 20px;
  height: 25px;
  position:absolute;

`
 const ArrowContainer = styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
    align-items: center;
  position: relative;
  vertical-align: middle;
  box-sizing: border-box;
   height:30px;
  ${props=>props.animation}{
  
  }
  &:hover{
  ${ArrowIconContainer}{
      background-color:${props=>props.animation ? 'transparent' : 'white' };;
      width:${props=>props.animation ? '99%' : '30px' };
    }
    ${ArrowIcon}{
     right:${props=>props.animation ? '10px' : 'unset' };
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