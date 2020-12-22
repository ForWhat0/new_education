import { Global } from "./teamStyledComponents"
import {TextTeam} from "./textTeam"
import {TeamSwiper} from "./teamSwipper"

export default function Team({posts}) {
    return (
        <Global margin='80px 0 80px 0'>
            <TextTeam text={posts.text} title={posts.title}/>
            <TeamSwiper employees={posts.employees}/>
        </Global>
    )
}
