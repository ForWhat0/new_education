import {ArrowIcon, Arrows, CommandText, Text, TextInner} from "./teamStyledComponents"
import {TitleForComponent} from "../titleForComponent/title"
import { next,previous } from './teamSwipper'

export const TextTeam = ({title,text})=>{
    return(
        <Text>
            <TextInner>
                <TitleForComponent text={title}/>
                <CommandText>
                    {text}
                </CommandText>
                <Arrows>
                    <ArrowIcon
                        className="fa fa-long-arrow-left"
                        aria-hidden="true"
                        onClick={()=>previous()}
                    />
                    <ArrowIcon
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                        onClick={()=>next()}
                    />
                </Arrows>
            </TextInner>
        </Text>
    )
}