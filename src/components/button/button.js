import animationButton from "./animationButton"
import {useSelector} from "react-redux"
import {useEffect} from "react"

export const StyledButton =({text,func})=>{
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    useEffect(()=>{
        !visuallyImpairedMode && animationButton()
    },[visuallyImpairedMode])
    return (
        <>
            {
                !visuallyImpairedMode ?
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="goo">
                            <defs>
                                <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                                   result="goo"/>
                                    <feComposite in="SourceGraphic" in2="goo"/>
                                </filter>
                            </defs>
                        </svg>

                        <span className="button--bubble__container">
  <button onClick={()=>func && func()}  className="button button--bubble">
      {text}
  </button>

  <span className="button--bubble__effect-container">
    <span className="circle top-left"></span>
    <span className="circle top-left"></span>
    <span className="circle top-left"></span>

    <span className="button effect-button"></span>

    <span className="circle bottom-right"></span>
    <span className="circle bottom-right"></span>
    <span className="circle bottom-right"></span>
  </span>
</span>
                    </>
                    :
                    <button onClick={()=>func && func()}  className="btn">
                        {text}
                    </button>
            }
        </>
    )
}