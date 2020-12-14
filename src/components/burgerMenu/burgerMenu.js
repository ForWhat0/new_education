import { StyledBurger } from './buergerMenuStyled'
import {useDispatch, useSelector} from "react-redux";
import {actionClickBurger} from "../../redux/actions/actions";

const Burger = ({color,dark}) => {
    const dispatch = useDispatch()
    const {menuBurgerIsOpen} = useSelector(state=>state.app)
    return (
        <StyledBurger dark={dark} color={color} open={menuBurgerIsOpen} onClick={()=>dispatch(actionClickBurger())}>

                <div />
                <div />
                <div />

        </StyledBurger>
    )
}

export default Burger;