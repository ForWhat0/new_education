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
                        arrow='/leftArrow.svg'
                        onClick={()=>previous()}
                    />
                    <ArrowIcon
                        arrow='/rightArrow.svg'
                        onClick={()=>next()}
                    />
                </Arrows>
            </TextInner>
        </Text>
    )
}