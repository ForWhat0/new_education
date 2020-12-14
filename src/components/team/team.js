import { Global } from "./teamStyledComponents"
import {TextTeam} from "./textTeam"
import {TeamSwiper} from "./teamSwipper"

export default function Team({posts}) {
    return (
        <Global>
            <TextTeam text={posts.text} title={posts.title}/>
            <TeamSwiper employees={posts.employees}/>
        </Global>
    )
}
