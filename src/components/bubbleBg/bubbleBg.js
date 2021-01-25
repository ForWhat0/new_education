import animationButton from "./animation";
import {useEffect} from "react";

export const BubbleBg = ()=>{
    useEffect(()=>{
        animationButton()
    },[])
    return(
        <div id="wrapper">

            <div id="parallax-lvl-3">
                <div id="b3-1" className="bubble size2 green">&nbsp;</div>
                <div id="b3-2" className="bubble size2 pink">&nbsp;</div>
                <div id="b3-3" className="bubble size1 green">&nbsp;</div>
                <div id="b3-5" className="bubble size1 purple">&nbsp;</div>
                <div id="b3-6" className="bubble size2 blue">&nbsp;</div>
            </div>

        </div>
    )
}