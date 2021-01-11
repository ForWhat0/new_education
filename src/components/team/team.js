import { Global } from "./teamStyledComponents"
import {TextTeam} from "./textTeam"
import {TeamSwiper} from "./teamSwipper"

export default function Team({posts}) {
    return (
        <Global margin='20px 0 20px 0'>
            <TextTeam text={posts.text} title={posts.title}/>
            <TeamSwiper employees={posts.employees}/>
        </Global>
    )
}
