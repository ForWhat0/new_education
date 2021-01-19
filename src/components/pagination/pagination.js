import Link from "next/link"
import { pagination } from "../../Lsi/lsi"
import Icon from "../icon/icon"
import { NumberOfPage ,Container ,Arrows } from "./paginationStyled"
import {useSelector} from "react-redux";

const {prevPage,nextPage} = pagination

export const Pagination=(
    {
        locale,
        currentPageNumber,
        endPage,
        startPage,
        href,
        loading,
        hasMore,
        hasPrevious
    }
    )=>{

    const nextArrowClick = currentPageNumber === 0 ? currentPageNumber + 2 : currentPageNumber + 1
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const LeftArrow=()=>{
        return (
            <Arrows
                color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}
                opacity={loading || !hasPrevious ? '0.5' : 'unset'}
                right='unset'
                left='0'
            >
                <Icon width='40px' height='30px' alt='prev' src={!visuallyImpairedModeWhiteTheme ? '/WhiteLeftArrow.svg' : '/leftArrow.svg'}/>
                <span>
                    {prevPage[locale]}
                </span>
            </Arrows>
        )
    }

    const RightArrow=()=>{
        return(
            <Arrows
                color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}
                opacity={loading  || !hasMore ? '0.5' : 'unset'}
                right='0'
                left='unset'
            >
                <span>
                    {nextPage[locale]}
                </span>
                <Icon width='40px' height='30px' alt='prev' src={!visuallyImpairedModeWhiteTheme ? '/WhiteRightArrow.svg' : '/rightArrow.svg'}/>
            </Arrows>
        )
    }

    const showArrow = (arrow)=>{
       if (arrow === 'left'){
           if (hasPrevious) {
               return (
                   <Link href={ `/${href}/page/[currentPage]`} as={`/${href}/page/${currentPageNumber-1}` }>
                       <a>
                           <LeftArrow/>
                       </a>
                   </Link>
               )
           }
           else {
               return  <LeftArrow/>
           }
       }
       else {
           if (hasMore) {
               return (
                   <Link href={ `/${href}/page/[currentPage]`} as={`/${href}/page/${nextArrowClick}` }>
                       <a>
                           <RightArrow/>
                       </a>
                   </Link>
               )
           }
           else {
               return  <RightArrow/>
           }
       }
    }

    return(
        <Container>
            {showArrow('left')}
            <ul>
                {
                    [...Array((endPage + 1) - startPage).keys()].map(i =>
                        <Link key={i} href={`/${href}/page/[currentPage]`} as={`/${href}/page/${startPage+i}`}>
                            <a>
                                <NumberOfPage
                                    color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}
                                    current= {
                                    startPage + i === currentPageNumber ||
                                    currentPageNumber === 0 && currentPageNumber === i
                                    }
                                >
                                    {startPage + i}
                                </NumberOfPage>
                            </a>
                        </Link>
                    )}
            </ul>
            {showArrow('right')}
        </Container>
    )
}